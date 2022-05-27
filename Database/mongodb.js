const mongoose = require("mongoose");
require("dotenv").config();

class mongo {
    constructor(){
        this.CreateDatabaseConnection();
    }
    CreateDatabaseConnection(){
        mongoose.connect(process.env.MONGO_URL);
        
        mongoose.connection.once("open",()=>{
            console.log("MongoDB Connected");
        })

        mongoose.connection.on("error",()=>{
            console.log("Error Occured in Connection");
        })
    }
}

module.exports = mongo;