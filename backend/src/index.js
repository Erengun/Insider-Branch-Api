
const { configDotenv } = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const branchRouter = require('./routes/branchRoutes')
const userRouter = require('./routes/userRoutes')
const errorMiddleware = require('./middleware/errorMiddleware');

configDotenv();

const app = express()
const port = +(process.env.PORT ?? 3000)

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(branchRouter)
// Routers
app.use('/branches', branchRouter);
app.use('/users', userRouter);

// Middlewares
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[SERVER]: Backend is running on ${port}`)
})