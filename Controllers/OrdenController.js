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

module.exports.get = async (req, res, next) => {
    try {
      const orden = await prisma.orden.findMany({
        orderBy: {
          Id: 'asc',
        }
      });

      response.StatusCode= orden? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = orden ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=orden;

    } catch (error) {

      response.StatusCode = HttpStatus.SERVER_ERROR;
      response.Message = `Error del servidor:\n${error.message}`;

    } finally {
      res.json(response);
    }   
};

module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const orden = await prisma.orden.findUnique({
      where: { Id: id },
      include: {
        User:true,
        RecicleCenter: true,
        Materials: true,
        OrdenDetail: true
    },
    });
    res.json(orden);
};

module.exports.create=async (req,res,next)=>{

};