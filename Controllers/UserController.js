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
    const users = await prisma.user.findMany({
      orderBy: {
        Id: 'asc',
      }
    });

    response.StatusCode= users? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = users ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=users;

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
      const user = await prisma.user.findUnique({
        where: { Id: id },
        include: {
          User: true,
      },
      });

      response.StatusCode= user? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = user ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=user;

  } catch (error) {

      response.StatusCode = HttpStatus.SERVER_ERROR;
      response.Message = `Error del servidor:\n${error.message}`;

  } finally {
      res.json(response);
  }


};
