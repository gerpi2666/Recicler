//#region Imports

//#endregion

//#region Requires
const { PrismaClient, Prisma } = require('@prisma/client');
const {ResponseModel}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')
const jwt = require("jsonwebtoken");
//npm install bcrypt
const bcrypt = require("bcrypt");
const { use } = require('../Routes/RoleRoutes');
//#endregion

//#region Intancias
const prisma = new PrismaClient();
const response= new ResponseModel();
//#endregion

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword; // Contraseña hash como string
}

module.exports.get = async (req, res, next) => {
   try {
    const users = await prisma.user.findMany({
      orderBy: {
        Id: 'asc',
      },
      include:{
        Role:true
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

module.exports.getByEmail=async (req,res,next) =>{
  try {
    
    let data= req.body

    const user= await prisma.user.findUnique({
      where:{
        Email: data.Email
      }
    })

    response.StatusCode= user !=null || undefined? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = user !=null || undefined ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=user !=null || undefined? "Informacion no disponible": user;

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
};

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
  const checkPassword=await bcrypt.compare(userReq.password, user.Password);
  if(checkPassword === false){
    response.status(401).send({
      success:false,
      message: "Credenciales no validas"
    })
  }else{
    //Usuario correcto
    //Crear el payload
    const Role= await prisma.role.findUnique({
      where:{
        Id:user.IdRol
      }
    })

    const payload={
      id: user.Id,
      email: user.Email,
      roleId: user.IdRol,
      role: Role.Name
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

module.exports.register=async( req,res,next)=>{
  try {
    
    let data= req.body

    const user =await prisma.user.create({
      data:{
        Name: data.Name,
        Email: data.Email,
        Identification: data.Identification,
        Direccion:data.Direccion,
        Number: data.Number,
        Enabled: true,
        Password: await hashPassword(data.Password),
        Role:{
          connect: {Id: 2},
        }
      }
    })

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

module.exports.create= async (req,res, next)=>{
  try {


    let data= req.body
    const user= await prisma.user.create({
      data:{
        Name: data.Name,
        Email: data.Email,
        Identification: data.Identification,
        Direccion:data.Direccion,
        Number: data.Number,
        Enabled: data.Enabled,
        Password: await hashPassword(data.Password),
        Role:{
          connect: {Id: 3},
        }
      }
    })

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

module.exports.update= async(req, res, next)=>{
  try {

    let id = parseInt(req.params.Id);
    let data= req.body

    const uOld= await prisma.user.findUnique({
      where:{
        Id: id
      },
      include:{
        Role:true
      }
    })

    const user= await prisma.user.update({
      where:{
        Id: id
      },
      data:{
        Name: data.Name,
        Email: data.Email,
        Identification: data.Identification,
        Direccion:data.Direccion,
        Number: data.Number,
        Enabled: data.Enabled,
        Role:{
          
          connect: {Id: 2},
        }
      }
    })

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

module.exports.updatePass=async(req,res,next)=>{
  try {


    let data= req.body

    const currentUser= await prisma.user.findUnique({
      where:{
        Id: data.Id
      }
      
    })

    const checkPassword=await bcrypt.compare(data.Password, currentUser.Password);

    if(checkPassword){
      const user= await prisma.user.update({
        where:{
          Email: data.Email
        },
        data:{
          
          Password: await hashPassword(data.Password),
          
        }
      })

      response.StatusCode= user !=null || undefined? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = user  !=null || undefined? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=user!=null || undefined?'Credenciales cambiadas correctamente':'Eroor'
    }else{
      response.StatusCode=  HttpStatus.NOT_FOUND;
      response.Message =  'Informacion no encontrada';
      response.Data='Credenciales no validas ';
    }
    

   

} catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

} finally {
    res.json(response);
}

};

module.exports.disable=async (req,res,next)=>{
try {

  let id = parseInt(req.params.Id);
    let data= req.body

    const currentUser = await prisma.user.findUnique({
      where: {
        Id: id
      }
    });
    
    const user= await prisma.user.update({
      where:{
        Id:id
      },
      data:{
        Enabled:  !currentUser.Enabled
        
      }
    })

  response.StatusCode= user !=null || undefined? HttpStatus.OK : HttpStatus.NOT_FOUND;
  response.Message = user !=null || undefined? 'Informacion retornada correctamente' : 'Informacion no encontrada';
  response.Data= user !=null || undefined ?`Usuario ${user.Enabled? 'habilitado':'deshabilitado'}: ${user.Identification}  ${user.Name}`:"Usuario no encontrado";

} catch (error) {

  response.StatusCode = HttpStatus.SERVER_ERROR;
  response.Message = `Error del servidor:\n${error.message}`;

} finally {
  res.json(response);
}
};