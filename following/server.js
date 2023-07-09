const express = require('express')

require("dotenv").config();
const app = express();
const session = require('express-session')
const { v4 } = require('uuid')
const {config}= require('./src/config/config')
const sql =require('mssql')

const createRouter = require('./src/routes/followRoutes')
app.use(express.json())




async function startApp(){
    try {
      const pool= await sql.connect(config)
      console.log("App conected to te database")

      const oneDay = 60 * 60 * 1000 * 24

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    genid: () => v4(),
    resave: true,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: oneDay,
        secure: false
    }
}))

app.use( (req, res, next) =>{
  req.pool = pool;
  next()
})

app.use('/', createRouter)
console.log(v4())




const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))

   
    } catch (error) {
      console.log("Error connecting to databse")
      console.log(error)
    }}


    startApp()
module.exports={app}