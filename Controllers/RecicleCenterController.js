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
    const recicleCenter = await prisma.recicleCenter.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });

    response.StatusCode= recicleCenter? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = recicleCenter ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=recicleCenter;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }   
};

module.exports.getById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.Id);
    const recicleCenter = await prisma.recicleCenter.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
        Materials: true
    },
    });

    response.StatusCode= recicleCenter? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = recicleCenter ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=recicleCenter;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }   
};