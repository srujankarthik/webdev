const express = require('express');
// init app
const app = express();
const colors = require('colors');
const tasks = require('./routes/tasks')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

// config for env file
dotenv.config({path: "./config/.env"})

// connect to database
connectDB();

// middleware
app.use(express.static('./public'))

app.use(express.json()); // for req.body

app.use('/api/v1/tasks', tasks);

// initialise the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {  
    console.log(
    `Server listening on port ${PORT}`.magenta.underline)
});