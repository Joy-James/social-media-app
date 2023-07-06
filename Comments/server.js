const express = require('express');

const commentRouter = require('./src/routes/commentRoute');
const createRouter = require('./src/routes/createCommentRoute');

const app = express();

app.use(express.json())


app.use('/', commentRouter)

app.use('/', createRouter)









const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))