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
  const cupon = await prisma.cupon.findMany({
    orderBy: {
      Id: 'asc',
    },
    include: {
      User: true,
    },
  });

  response.StatusCode= cupon? HttpStatus.OK : HttpStatus.NOT_FOUND;
  response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
  response.Data=cupon;

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
  const cupon = await prisma.cupon.findUnique({
    where: { Id: id },
    include: {
      RecicleCenter: true,
      Materials: true
  },
  });

    response.StatusCode= cupon? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=cupon;

 } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

 } finally {
    res.json(response);
 }   
};