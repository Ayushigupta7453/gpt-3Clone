const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const dbconnect = require('./config/db')
const authroutes = require('./routes/authroutes')
const errorHandler = require("./middlewares/errormiddleware");

dotenv.config()
dbconnect();
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler);


const PORT = process.env.PORT || 4000

//API routes
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/openai", require("./routes/openairoutes"));

//listen
app.listen(PORT,()=>{
    console.log(`server is running at 4000`)
});



