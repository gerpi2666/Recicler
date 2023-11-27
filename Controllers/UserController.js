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
          Role:true,
          Wallet: true,
          RecicleCenter:true,
          Orden:true,
          Cupon:true
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

module.exports.getUserWithoutCenter=async (req,res,next)=>{
  try {
    const users=await prisma.user.findMany({
      where: {
        IdRol: 3, // Filtrar por el rol 3
        RecicleCenter: { none: {} }, // Usuarios sin centro de acopio asignado
      },
    })

    response.StatusCode= users? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = users ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=users;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.getClients=async (req,res,next)=>{
  try {
    const users = await prisma.user.findMany({
      where:{
        IdRol:2
      },
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
}

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.user.findUnique({
    where: {
      Email: userReq.email,
    },include: {
      Role:true,   
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  console.log ("Contraseña: " ,  user.Password)
  console.log ("Contraseña: " ,  user.Email)
  const checkPassword=await bcrypt.compare(userReq.password, user.Password);
  if(checkPassword === false){
    response.status(401).send({
      success:false,
      message: "Credenciales no validas"
    })
  }else{
    //Usuario correcto
    //Crear el payload
    const payload={
      id: user.Id,
      email: user.Email,
      role: user.Role.Name
    }
    //Crear el token
    const token= jwt.sign(payload,process.env.SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRE
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      token,
        
    })
  }
};


