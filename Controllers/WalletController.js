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

module.exports.getByUser= async (req,res,next)=>{
  try {
    let Id=  parseInt(req.params.Id);
    const wallet = await prisma.wallet.findUnique({
      where: { IdUser: Id },
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
}

module.exports.tranasaction= async(req,res)=>{
  try {
    const {IdWallet,TrsactionType,Price}= req.body

    const wallet= prisma.wallet.findUnique({
      where:{
        Id: IdWallet
      }
    })

    // TrsactionType = 1 debito, TrsactionType = 2 credito
    if(TrsactionType==1){
      const walletChanged1 = await prisma.wallet.update({
        where:{
          IdUser:IdUser
        },
        data:{
          AvaibleCoins: wallet.AvaibleCoins-Price,
          ChangesCoins: wallet.ChangesCoins+Price
        }
      })
      response.StatusCode= walletChanged1? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = walletChanged1 ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=walletChanged1;
    }else{
      const walletChanged = await prisma.wallet.update({
        where:{
          IdUser:IdUser
        },
        data:{
          AvaibleCoins: wallet.AvaibleCoins+Price,
          RecivedCoins: wallet.ChangesCoins+Price
        }
      })
      response.StatusCode= walletChanged? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = walletChanged ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=walletChanged;
    }


   

} catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

} finally {
res.json(response);
}
}
 