const mongoose = require("mongoose")
const { mongodbAtlasURL } = require("../secret")
const logger = require("../controllers/loggerController")


const connectDatabase = async (options)=> {
    try {
        await mongoose.connect(mongodbAtlasURL,{})
        logger.log("info","DB connected successfully")

        mongoose.connection.on("error",()=> {
            logger.log("error","database connection error",error)
        })
    } catch (error) {
        logger.log("error","could not  connection DB",error.toString()) 
    }
}

module.exports = connectDatabase;