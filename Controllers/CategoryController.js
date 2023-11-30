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

module.exports.get= async (req,res, next)=>{
    try {
        
        const categorys = await prisma.category.findMany({
            orderBy: {
              Id: 'asc',
            },
            
          });


        response.StatusCode= categorys? HttpStatus.OK : HttpStatus.NOT_FOUND;
        response.Message = categorys ? 'Material creado' : 'Material no creado';
        response.Data=categorys;
    
    } catch (error) {
    
        response.StatusCode = HttpStatus.SERVER_ERROR;
        response.Message = `Error del servidor:\n${error.message}`;
    
    } finally {
        res.json(response);
    }   
}