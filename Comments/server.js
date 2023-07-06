const express = require('express');

const commentRouter = require('./src/routes/commentRoute');

const app = express();

app.use(express.json())


app.use('/', commentRouter)









const port = process.env.PORT;
app.listen(port, () => console.log(`server on port:${port}`))