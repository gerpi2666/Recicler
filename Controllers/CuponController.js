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
  const cupon = await prisma.cupon.findMany({
    orderBy: {
      Id: 'asc',
    }
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