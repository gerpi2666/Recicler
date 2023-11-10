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
      const orden = await prisma.orden.findMany({
        orderBy: {
          Id: 'asc',
        },
        include: {
          User: true,
        },
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
        RecicleCenter: true,
        Materials: true
    },
    });
    res.json(orden);
};