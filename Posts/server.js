const express = require('express');

const commentRouter=require('./src/routes/createCommentRoute')
const postRouter = require('./src/routes/postsRoutes');

const likeRouter=require('./src/routes/likeRoutes')
require("dotenv").config();
const app = express();
const session = require('express-session')

const {config}= require('./src/config/config')
const sql =require('mssql')
const cors = require('cors')
const RedisStore=require('connect-redis').default
const {createClient} = require('redis')




app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,

 }))

async function startApp(){
    try {
      const pool= await sql.connect(config)
      console.log("App conected to te database")

      
      
      const redisClient =createClient();
      redisClient.connect()
      console.log('connected to redis');
      const redisStore = new RedisStore({
        client: redisClient,
        prefix:''
    })
    app.use('/', async(req, res, next)=>{
      let cookie = req.headers['cookie']
      let sessionID = cookie?.substring(16, 52) || ""
  
      let session = await redisClient.get(sessionID)
    
      if(session){
          let real_session = JSON.parse(session)
          // console.log(real_session.user);
          let user=real_session
          req.user=user
          req.session = real_session;
          next()
      }else{
          res.status(403).json({
              success:false,
              message: "login to proceed"
          })
      }
    })


app.use( (req, res, next) =>{
  req.pool = pool;
  next()
})

app.use('/', postRouter)
app.use('/', commentRouter)
app.use('/', likeRouter)




app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logout successfully')
})

const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))

   
    } catch (error) {
      console.log("Error connecting to databse")
      console.log(error)
    }}


    startApp()
module.exports={app}