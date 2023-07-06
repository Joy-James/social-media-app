const express = require('express');
const createRouter=require('./src/routes/createPostsRoutes')
// const postRouter = require('./src/routes/postsRoutes');

const app = express();

app.use(express.json())


// app.use('/', postRouter)

app.use('/', createRouter)







const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))