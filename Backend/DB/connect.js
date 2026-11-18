const mongoose = require("mongoose")


const Connection = async(req,res)=>{
    try{

        await mongoose.connect("")
        console.log(`MongoDB Connected Successfully...`)
    }
    catch(err){
        res.status(500).json({
            message:`MongoDB DataBase Error: ${err.message}`
        })
    }
}

module.exports = {Connection}