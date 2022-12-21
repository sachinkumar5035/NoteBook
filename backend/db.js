const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook" // inotebook db will be used in this application

// function which connnects to database 
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;