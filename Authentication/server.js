const express = require('express')

require("dotenv").config();
const app = express();
const session = require('express-session')
const { v4 } = require('uuid')
const {config}= require('./src/config/config')
const sql =require('mssql')
const router = require('./src/routes/usersRoutes');
const userRouter = require('./src/routes/regestrationRoute');
const createfollowRouter=require('./src/routes/followRoutes')
const cors= require('cors')
const RedisStore= require('connect-redis').default
const {createClient} = require('redis')
// const authRouter = require('./routes/auth');

app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


async function startApp(){
    try {
      const pool= await sql.connect(config)
      console.log("App conected to te database")

      const oneDay = 60 * 60 * 1000 * 24

      const redisClient =createClient();
      redisClient.connect()
      console.log('connected to redis');

      const redisStore = new RedisStore({
          client: redisClient,
          prefix:''
      })

app.use(session({
    store:redisStore,
    secret: process.env.SECRET,
    saveUninitialized: false,
    genid: () => v4(),
    resave: false,
    rolling: true,
    unset:'destroy',
    cookie: {
        httpOnly: true,
        maxAge: oneDay,
        secure: false,
        domain:'localhost'
    }
}))

app.use( (req, res, next) =>{
  req.pool = pool;
  next()
})
app.use('/', router)


app.use('/user', userRouter)
app.use('/', createfollowRouter)


app.get('/logout', (req, res) => {
  console.log(session)
req.session.destroy();
res.send('logout successfully')
})

app.use("*", (req, res, next)=>{
  const error =  new Error("Route not found");
  next({
      status:404,
      message: error.message
  })
})

app.use((error, req, res, next )=>{
  res.status(error.status).json(error.message)
})






// app.use('/auth', authRouter);
const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))

   
    } catch (error) {
      console.log("Error connecting to databse")
      console.log(error)
    }}


    startApp()
module.exports={app}