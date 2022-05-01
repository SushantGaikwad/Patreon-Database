const http = require("http");
const app = require("./Routes/app");
const PORT = process.env.PORT || 9999;
const mongoConnection = require("./Database/mongodb");

http.createServer(app).listen(PORT,()=>{
    new mongoConnection();
    console.log(`Server is Running Successfully on PORT : ${PORT}`)
})