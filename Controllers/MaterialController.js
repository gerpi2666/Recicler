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
    const materials = await prisma.material.findMany({
      orderBy: {
        Id: 'asc',
      },
      
    });


      console.log(materials)
      response.StatusCode= materials? HttpStatus.OK : HttpStatus.NOT_FOUND;
      response.Message = materials ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
      response.Data=materials;

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
    const material = await prisma.material.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
    },
    });
    
    response.StatusCode= material? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = material ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data=material;

  } catch (error) {

      response.StatusCode = HttpStatus.SERVER_ERROR;
      response.Message = `Error del servidor:\n${error.message}`;

  } finally {
      res.json(response);
  }   
};

module.exports.create= async (req,res,next)=>{
  try {
    let requestMaterial= req.body;
    const material= await prisma.material.create({
      data:{
        Name : requestMaterial.Name,
        Description: requestMaterial.Description,
        Image: requestMaterial.Image,
        Color: requestMaterial.Color,
        Unit: requestMaterial.Unit,
        Price: requestMaterial.Price,
        RecicleCenter:{
          connect: requestMaterial.Center.map(c => ({ Id: c.Id }))// Usar un objeto para conectar
        }
      }
    })
    response.StatusCode= requestMaterial? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = requestMaterial ? 'Material creado' : 'Material no creado';
    response.Data=material;

} catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

} finally {
    res.json(response);
}   
};

module.exports.update = async (req, res, next) => {
  try {
    let material = req.body;
    let idMaterial = parseInt(req.params.Id);

    const olM = await prisma.material.findUnique({
      where: { Id: idMaterial },
      include: {
        RecicleCenter: {
          select: {
            Id: true,
          },
        },
      },
    });

    const updatedMaterial = await prisma.material.update({
      where: {
        Id: idMaterial,
      },
      data: {
        Name: material.Name,
        Description: material.Description,
       // Image: material.Image,
        Color: material.Color,
        Unit: material.Unit,
        Price: material.Price,
        RecicleCenter: {
          disconnect: olM.RecicleCenter,
          connect: material.Center.map(c => ({ Id: c.Id })),
        },
      },
    });

    response.StatusCode = updatedMaterial ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = updatedMaterial ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = updatedMaterial;
  } catch (error) {
    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;
  } finally {
    res.json(response);
  }
};


