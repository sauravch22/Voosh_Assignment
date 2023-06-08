const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
        {
                name:{
                        type : String,
                        required : true,
                        trim : true,
                },
                mobile:{
                        type : String,
                        required : true,
                        trim : true,
                },
                password : {
                        type : String,
                        required : true,
                        trim : true,
                }
        },{
                timestamps : true 
        }
)

const user = mongoose.model("User",userSchema)

module.exports = user