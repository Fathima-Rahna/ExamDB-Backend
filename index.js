
//Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

//create an Express applications
const pfServer  = express()

//use cors in express server
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)


const PORT = 3003 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`project fair startted at port:${PORT}`);
})


//http://localhost:3003/

pfServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>Project fair server started and waiting for client request </h1>`)
})





