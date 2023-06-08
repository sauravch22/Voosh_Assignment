const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
        try{
                console.log(process.env.MONGO_URI)
                const connect = await mongoose.connect(process.env.MONGO_URI)
                console.log("DataBase Connected: ", connect.connection.host, connect.connection.name)
        }
        catch(err){
                console.log(err)
                process.exit(1)
        }
}

module.exports = connectDB
