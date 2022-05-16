const mongoose = require("mongoose");

class mongo {
    constructor(){
        this.CreateDatabaseConnection();
    }
    // mongodb+srv://PatreonDatabase:VJrSqiPqFWm6NfZn@cluster0.v4cjq.mongodb.net/Patreon_Database?retryWrites=true&w=majority
    CreateDatabaseConnection(){
        mongoose.connect(`mongodb+srv://PatreonDatabase:EC6LM5BjcWoIRg8w@patreondb.vfhzr.mongodb.net/Patreon_Database?retryWrites=true&w=majority`);
        
        mongoose.connection.once("open",()=>{
            console.log("MongoDB Connected");
        })

        mongoose.connection.on("error",()=>{
            console.log("Error Occured in Connection");
        })
    }
}

module.exports = mongo;