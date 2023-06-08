const jwt = require('jsonwebtoken')


module.exports = async(userId) => {
        try{
                console.log("Inside Token")
                console.log("userId",userId)

                const payload = {
                        user: {
                                id :userId
                        }
                }

                let token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:3600})
                return token
        }
        catch(e){
                console.log("Inside Token error ",e)
                throw new Error("Error")
        }
}