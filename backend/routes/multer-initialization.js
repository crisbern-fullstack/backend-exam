const multer = require("multer")

//Multer Initialization
//Multer File Filter
const fileFilter = (req, file, callback) => {
    const mime_type = file.mimetype

    if(mime_type === "image/jpeg" || mime_type === "image/png"){
        return callback(null, true)
    }
    else{
        return callback(new Error("Invalid file format. Please upload an image with .jpeg or .png extension"))
    }
}

//needs fixing
//study express error handler
const uploadMiddleware = (req, res, next) => {
    //multer storage
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, "./storage/app/public")
        },
        filename: (req, file, cb) => {
            const file_name = file.originalname
            cb(null, file_name)
        }
    })

    //initialize multer
    const upload = multer({
        storage : storage,
        limits : {
            fileSize : 6291456
        },
        fileFilter : fileFilter
    }).single("company-logo")

    //error handling
    upload(req, res, (error) => {
        if(error instanceof multer.MulterError){
            const err = new Error("Multer Error")
            next(err)
            return res.status(400).json({error : error.message})
        }else if(error){
            const err = new Error("Error Unknown")
            next(err)
            return res.status(400).json({error : error.message})
        }
        next()
    })
}

module.exports = {uploadMiddleware}