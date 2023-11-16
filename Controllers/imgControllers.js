const multer = require('multer');
const path = require('path');
const {ResponseModel}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')

module.exports.UploadImage= async(req,res,next)=>{
    const storage = multer.diskStorage({
        destination:'./uploads/images',
        filename: function(req,file,cb){
            let extension=file.originalname.slice(file.originalname.lastIndexOf('.'))
            cb(null, `${name}-${id}${extension}`);
        }
    })

    const upload= multer({storage:storage}).single('file');

    return upload.path;
}

