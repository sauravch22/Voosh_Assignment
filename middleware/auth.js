const jwt = require('jsonwebtoken')
require('dotenv').config()
const user = require("../models/user")
const Token = require("../utils/token")
const mongoose = require('mongoose') 

module.exports = async function(req,res,next) {
    try{
        console.log('Inside auth')
        const token = req.header('x-auth-token')
        if(!token){
            return res.status(401).send({"message":"No token, Authorization denied"})
        }
        const decodetoken = jwt.verify(token,process.env.JWT_SECRET)
        console.log("decodeToken", decodetoken)
        let userResp = await user.findById(decodetoken.user.id)
        if(!userResp){
            return res.status(404).send({message:"UnAuthorized"})
        }
        console.log("userResp", userResp)
        req.user = decodetoken.user;
        req.token = await Token(req.user.id)
        next()
    }catch(e){
        console.log("Inside error token",e)
        res.status(401).send({"message":"Your session has expired, Please login again"})
    }
};