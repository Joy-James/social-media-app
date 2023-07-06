const express = require('express')

require("dotenv").config();
const app = express();
const session = require('express-session')
const { v4 } = require('uuid')
const router = require('./src/routes/usersRoutes');
const userRouter = require('./src/routes/regestrationRoute');
const { user } = require('./src/config/config');
app.use(express.json())

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
// app.get("/login/:UserProfileID/:pass", (req,res) =>{
//     const{UserProfileID, pass} =req.params;
//     console.log(UserProfileID,pass);
//     if(UserProfileID && pass){
//         req.session.authorized = true;
//         req.session.user=UserProfileID
//     }
//     res.json(req.session)
// })
app.use('/', router)
app.use('/post', userRouter)
console.log(v4())


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logout successfully')
})

const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))