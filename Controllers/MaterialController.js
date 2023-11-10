//#region Imports
import {ResponseModel} from '../Models/GenericModels';
import {HttpStatus} from '../Models/Enums'
//#endregion

//#region Requires
const { PrismaClient, Prisma } = require('@prisma/client');
//#endregion

//#region Instancias
const prisma = new PrismaClient();
const response= new ResponseModel();
//#endregion

module.exports.get = async (req, res, next) => {
  try {
    const materials = await prisma.material.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });

      response.StatusCode= materials? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = materials ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=materials;

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
    const material = await prisma.material.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
    },
    });
    
    response.StatusCode= material? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = material ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=material;

  } catch (error) {

      response.StatusCode = HttpStatus.SERVER_ERROR;
      response.Message = `Error del servidor:\n${error.message}`;

  } finally {
      res.json(response);
  }   
};
