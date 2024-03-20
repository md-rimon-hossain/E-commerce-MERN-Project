const fs = require("fs").promises

const deleteImage = async (userImagePath)=> {
    
    // fs.access(userImagePath)
    // .then(()=> fs.unlink(userImagePath))
    // .then(()=> console.log("user image was deleted"))
    // .catch((err)=> console.log("user image does not exist"))

    try {
        await fs.access(userImagePath)
        await fs.unlink(userImagePath)
    } catch (error) {
        throw error
    }
}

module.exports = {
    deleteImage
}