//#region Imports

//#endregion

//#region Requires
const { PrismaClient, Prisma } = require('@prisma/client');
const {ResponseModel}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')
//#endregion

//#region Intancias
const prisma = new PrismaClient();
const response= new ResponseModel();
//#endregion

module.exports.getById = async (req, res, next) => {
    try {
     let id = parseInt(req.params.Id);
     const ordenDetail = await prisma.ordenDetail.findMany({
       where: { 
        OrdenId: id 
      },
       include: {
        Material : true,   
     }

     });
 
     response.StatusCode= ordenDetail? HttpStatus.OK : HttpStatus.NOT_FOUND;
     response.Message = ordenDetail ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
     response.Data=ordenDetail;
 
   } catch (error) {
 
     response.StatusCode = HttpStatus.SERVER_ERROR;
     response.Message = `Error del servidor:\n${error.message}`;
 
   } finally {
     res.json(response);
   }   
 };