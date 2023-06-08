const mongoose = require("mongoose")
const Users = require("../models/user")
const token = require("../utils/token")
const bcrypt = require("bcrypt")
const order = require("../models/order")


exports.register = async(req,res) => {
        try{
                const user = new Users(req.body)
                const findusers = await Users.findOne({mobile:user.mobile})
                if(findusers){
                        return res.status(409).send({"message":"User already exists with this phone No"})
                }
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password,salt)
                await user.save()
                res.status(201).send({"user":user})
        }
        catch(e){
                console.log("Inside error", e)
                res.send(500).send({"message":"Server Error"})
        }
}

exports.login = async(req,res) => {
        try{
                const {mobile,password} = req.body
                console.log(mobile," ",password)
                const findusers = await Users.findOne({mobile})
                if(!findusers){
                        return res.status(404).send({"message":"No user exists with this mail id"})
                }
                const isMatch = await bcrypt.compare(password,findusers.password)
                if(!isMatch){
                        return res.status(401).send({"message":"Incorrect Password"})
                }
                let gentoken = await token(findusers.id)
                res.send({"token":gentoken, "_id":findusers.id}) 
        }
        catch(e){
                console.log("Inside error", e)
                res.send(500).send({"message":"Server Error"})
        }
}

exports.addOrder = async(req,res) => {
        try{
                const neworder = new order(req.body)
                await neworder.save();
                res.status(200).send({"message":"Orders Created"})
        }
        catch(e){
                console.log("Inside error", e)
                res.send(500).send({"message":"Server Error"}) 
        }
}

exports.viewOrder = async(req,res) => {
        try{
                let orders = await order.find({user_id:req.user.id})
                res.status(200).send({"Orders":orders})
        }
        catch(e){
                console.log("Inside error", e)
                res.send(500).send({"message":"Server Error"}) 
        } 
}