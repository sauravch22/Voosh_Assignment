const express = require("express")
const connectDB = require("./Config/connectionDB")
const router = express.Router()
const dotenv = express("dotenv")
const app = express()

connectDB()

app.use(express.json())
app.use("/api/v1/users",require("./routes/users"))

const PORT = process.env.PORT || 8080
app.listen(PORT,() => console.log(`Server started on port ${PORT}`))