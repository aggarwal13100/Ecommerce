const mongoose = require('mongoose');
require('dotenv').config({path : '/backend/config/config.env'});

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true ,
    }).then((data)=> {
        console.log("Database connection establish successfully");
        console.log(`Connect with server : ${data.connection.host}`)
    })
    // error is handled in server.js 
    // using unhandled promise rejection
}