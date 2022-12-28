const express = require ("express");
const app = express();

const port = 4300

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended : true }))

const students = require("./student")
app.use("/api/v1/students", students)

app.listen(port, () => {console.log("server is running in port" + port)

})
