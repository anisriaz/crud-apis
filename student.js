const express = require("express")
const router = express.Router()

const Database = require("nedb")
const students = new Database({filename: 'database/std.db', autoload: true })

router.post( '/', async (req, res) =>{

try{
  await students.find({}).exec( (err,data) => {

    if(err) {
      return res.status(500).json( { message: "Error in the DB"})
    }
    res.send (data)
  })
}
catch {
  res.status(500).json( { message: "Error in this API"})
}

})

router.get('/:idVariable', async (req, res) => {

  try {
    await students.findOne( {_id: req.params.idVariable}, (err, data) => {
     if(err) {
      return res.status(400).json({message: "error in the DB"})
       }
        if (data!= null) {
         res.send(200).send(data)
          }
           else {
            res.status(400).json ( {message: "student this id dose not exsist"}) 
          
           }
    })
  }
   catch{
    res.status(500).json ( {message: "Error in this api"})

}

});

router.get('/city/:cityVar', async(req, res) =>{
 try{
  await students.find({city: req.params.cityVar}, (err,data)=>{
    if(err){
      return res.status(500).json( { message: "Error in the DB"});
  }
  
  if( (data!=null) && (data.length>0) ){
      res.status(200).send(data)
  }
  else{   
      res.status(400).json( { message: "No Student from this city"});
  }
  })
}
 catch{
  res.status(500).json( { message: "Error in this API"});
} 
})
router.get('/averageCalulator', async (req, res)=>{
var x = 0;
  try {
await students.find ({}, function (err,docs){
  docs.map ((value) => {
    x += value.score
  })
  res.status(500).json({ "the calculated average is " :  x / docs.length });

})
}
catch (err){
  req.status(500).send ("an err occured ;" + err)
}
})

router.post ('/', async (req,res) =>{
  try{
await students.insert (res.body);
res.status(200).json ({message : "added successfully"})
}
catch {
  res.send(500).json ({ message : "err in this api"})
}
})
router.patch ('/ : idVariable' , async(req,res)=>{
try{
await students.update({_id: req.params.idVariable}, req.body, {upsert: false}, (err, isdataupdate) => {
if (err){ return req.status(500).jason ({message: "err in db"})}
if (isdataupdate){
  res.status(200).json ({message : "student name: " + req.body.name + "update successfully"})
}
else {
  res.status(500).json ({message : "student with this id does not excist"})
}
})
}
catch{
  res.status(500).json ({message: "err in this api"})
}
})
router.delete('/:  idVariable' , async(req,res)=> {
try{

  await students.remove({_id: req.params.idVariable}, (err, isDataDeleted)=>{
if (err){return req.status(500).jason ({message : "err in this db"})}
if (isDataDeleted){
res.status(200).jason({message: "studebt deleted successfully"})
}
else {
  res.status(200).json({message: "student delet successfully"})
}
})
}
catch{
res.status(500).json ({message: "err in this api"})

}
})
router.delete('/', async(req,res)=>{
try{
 await students.remove({}, {multi:true}, (err, isDataDeleted)=> {
if (err){return req.status(500).json({message : "err in this db"})}
if (isDataDeleted){
res.students(200).json({message: "student deleted successfully"})
}
else {
  res.status(400).json( { message: "No Student Data in the DB"})
}
 })
}
catch{
  res.status(500).json( { message: "Error in this API"})
}

})
module.exports = router;
