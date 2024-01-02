const mongoose = require('mongoose')

const dbconnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    
    .then(()=> console.log("DB connection is successful"))
    .catch((error)=>{
        console.log("issue in connection");
        console.error(error.message)
        process.exit(1)

    });
}
module.exports = dbconnect;

