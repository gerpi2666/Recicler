//#region Imports

//#endregion

//#region Requires
const { PrismaClient, Prisma } = require('@prisma/client');
const {ResponseModel,Direccion}=require('../Models/GenericModels');
const {HttpStatus}= require('../Models/Enums')
//#endregion

//#region Intancias
const prisma = new PrismaClient();
const response= new ResponseModel();

//#endregion

module.exports.get = async (req, res, next) => {
  try {
    const recicleCenter = await prisma.recicleCenter.findMany({
      orderBy: {
        Id: 'asc',
      }
    });

    response.StatusCode= recicleCenter? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = recicleCenter ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=recicleCenter;

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
    const recicleCenter = await prisma.recicleCenter.findUnique({
      where: { Id: id },
      include: {
        User:true,
        Materials: true
      },
    });

    response.StatusCode= recicleCenter? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = recicleCenter ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=recicleCenter;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }   
};

module.exports.create= async (req,res,next)=>{
  try {
    let center= req.body;
    const Center= await prisma.recicleCenter.create({
      data:{
        Name : center.Name,
        Provincia : center.Provincia,
        Canton : center.Canton,
        Distrito : center.Distrito,
        Numero : center.Numero,
        Email : center.Email,
        Schecudale : center.Schecudale,
        Enabled : center.Enabled,
        User: {
          connect: { Id: center.UserAdmin },
        },

        // Conectar los materiales al nuevo centro de reciclaje
        Materials: {
          connect: center.Materials.map((material) => ({ Id: material.Id })),
        },
      }
    })
    console.log('Centro insertado',Center)
    response.StatusCode= Center? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = Center ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=Center;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }   
};

module.exports.update= async(req,res,next)=>{
  try {
    
    let center = req.body;
    let idCenter = parseInt(req.params.Id);


    const olC= await prisma.recicleCenter.findUnique({
      where:{ Id: idCenter},
      include: {
        User:true,
        Materials: true
      },
    })
    console.log('Postam',center)
    console.log('Materiales viejos',olC.Materials)

    const Center= await prisma.recicleCenter.update({
      where:{Id: idCenter},
      data:{
        Name :center.Name ,
        Provincia :center.Provincia ,
        Canton :center.Canton ,
        Distrito :center.Distrito ,
        Numero :center.Numero ,
        Email :center.Email ,
        Schecudale: center.Schecudale ,
        Enabled :center.Enabled ,
        Materials:{
          disconnect: olC.Materials.map((material) => ({ Id: parseInt(material.Id) })),
          connect: center.Materials.map((material) => ({ Id: parseInt(material.Id) }))
        },
        User:{
          // Disconnect old user
          connect: { Id: center.UserAdmin }
        },
        

      },
    })

    response.StatusCode= Center? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = Center ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=center;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }   
};

