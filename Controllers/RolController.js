//#region Imports

//#endregion

//#region Requires
const { PrismaClient, Prisma } = require('@prisma/client');
const {ResponseModel}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')
const jwt = require("jsonwebtoken");
//npm install bcrypt
const bcrypt = require("bcrypt");
//#endregion

//#region Intancias
const prisma = new PrismaClient();
const response= new ResponseModel();
//#endregion

module.exports.get = async (req, res, next) => {
    try {
     const users = await prisma.role.findMany({
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
 