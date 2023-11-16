const multer = require('multer');

const path = require('path');
const fs = require('fs');

const {ResponseModel}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')


const response= new ResponseModel();

const storage = multer.diskStorage({
    destination:'./uploads/images',
    filename: function(req,file,cb){
        //let extension=file.originalname.slice(file.originalname.lastIndexOf('.'))

        const { Name, Id } = req.body;

        if (!Name || !Id) {
            return cb(new Error('Missing parameters in request body'), null);
        }

        const extension = path.extname(file.originalname);

        const filename = `${Id}${Name}${extension}`;
        cb(null,filename);
    }
})

const upload= multer({storage:storage});

module.exports.upload= upload.single('Image')

module.exports.UploadImage= async(req,res,next)=>{
    res.send({data:'file success'})
}


module.exports.getImage = async (req, res, next) => {
    try {
        const { Id, Name,Ext } = req.body;
        const fileName = `${Id}${Name}.${Ext}`;

        const filePath = path.join(__dirname, `../uploads/images/${fileName}`);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                response.StatusCode = HttpStatus.NOT_FOUND;
                response.Message = 'Archivo no encontrado';
                return res.status(HttpStatus.NOT_FOUND).json(response);
            }

            const file = fs.createReadStream(filePath);

            let fileData = Buffer.from('');
            file.on('data', (chunk) => {
                fileData = Buffer.concat([fileData, chunk]);
            });

            file.on('end', () => {
                response.StatusCode = HttpStatus.OK;
                response.Message = 'Archivo encontrado';
                response.Data = fileData.toString('base64'); // Guardar los datos del archivo en formato base64

                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

                res.json(response);
            });
        });
    } catch (error) {
        response.StatusCode = HttpStatus.SERVER_ERROR;
        response.Message = `Error del servidor: ${error.message}`;
        res.status(HttpStatus.SERVER_ERROR).json(response);
    }
 };
