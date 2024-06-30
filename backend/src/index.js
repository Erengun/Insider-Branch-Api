
const { configDotenv } = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const branchRouter = require('./routes/branchRoutes')
const userRouter = require('./routes/userRoutes')
const errorMiddleware = require('./middleware/errorMiddleware');
const helmet = require('helmet');

configDotenv();

const app = express()
/**
* Checks if the PORT is defined in the .env file
* If not defined, it defaults to 3000
*/
const port = +(process.env.PORT ?? 3000)

/**
* Middlewares 
* Helmet to secure the app by setting various HTTP headers
* CORS to enable Cross-Origin Resource Sharing
* Express JSON to parse JSON bodies
* Body Parser to parse URL-encoded bodies
*/
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/branches', branchRouter);
app.use('/users', userRouter);

// Error Middleware to handle async errors
app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`[SERVER]: Backend is running on ${port}`)
})