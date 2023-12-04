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
        console.log('BODY REQ',req.body)
        const { Name,Cupon} = req.body;


        if (!Name) {
            return cb(new Error('Missing parameters in request body'), null);
        }
        console.log('File pre Post',file)
        const extension = path.extname(file.originalname);
        console.log('VALOR cupon', Cupon)
        if(Cupon){
            const filename = `${Name}${extension}`;
            cb(null,filename);
        }else{
            const filename = `${Name}${extension}`;
            cb(null,filename);
        }
        
    }
})

const upload= multer({storage:storage});

module.exports.upload= upload.single('Image')

module.exports.UploadImage= async(req,res,next)=>{
    try {
        // Verificar si se generó algún error durante la carga del archivo
        if (req.fileValidationError) {
          throw new Error(req.fileValidationError);
        }
    
        // Verificar si el archivo no se encontró en la solicitud
        if (!req.file) {
          throw new Error('No file uploaded');
        }
    
        // Si todo está bien, enviar una respuesta exitosa
        res.status(200).send({ data: 'file success' });
      } catch (error) {
        // Manejar errores y enviar una respuesta adecuada
        res.status(500).send({ error: error.message });
      }
}


module.exports.getImage = async (req, res, next) => {
    try {
       // const { Name,Ext } = req.body;
       const { fileName } = req.params;

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
