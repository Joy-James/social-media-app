const express =require('express')
require("dotenv").config();
const app=express();

app.use(express.json())


app.get('/', (req, res)=>{
    res.send("welcome to my social media app")
})




const port = process.env.PORT;
app.listen(port,()=>console.log(`server on port:${port}`))