const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
        {
                user_id:{
                        type : mongoose.Schema.Types.ObjectId,
                        required : true,
                        ref : "User",
                },
                sub_total:{
                        type : String,
                        required : true,
                        trim : true,
                },
                mobile : {
                        type : String,
                        required : true,
                        trim : true,
                },
                order : {
                        type : String,
                        required : true,
                        trim : true,
                }
        },{
                timestamps : true 
        }
)

const order = mongoose.model("Orders",orderSchema)

module.exports = order