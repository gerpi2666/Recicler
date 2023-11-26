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
    const wallets = await prisma.wallet.findMany({
    orderBy: {
      Id: 'asc',
    }
  });

      response.StatusCode= wallets? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = wallets ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=wallets;
  
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
        const wallet = await prisma.wallet.findUnique({
        where: { Id: id },
          include: {
            User: true,
            
          },
      });
    
        response.StatusCode= wallet? HttpStatus.OK : HttpStatus.NOT_FOUND;
        response.Message = wallet ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
        response.Data=wallet;

    } catch (error) {

        response.StatusCode = HttpStatus.SERVER_ERROR;
        response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
};
 