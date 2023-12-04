//#region Imports

//#endregion

//#region Requires
const {
  PrismaClient,
  Prisma
} = require('@prisma/client');
const {
  ResponseModel
} = require('../Models/GenericModels');
const {
  HttpStatus
} = require('../Models/Enums')
//#endregion

//#region Intancias
const prisma = new PrismaClient();
const response = new ResponseModel();
//#endregion

const qrcode = require("qrcode");





module.exports.get = async (req, res, next) => {
  try {
    const cupon = await prisma.cupon.findMany({
      orderBy: {
        Id: 'asc',
      }
    });

    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = cupon;

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
      where: {
        Id: id
      },
      include: {
        User: true,
      },
      include: {
        Category: true
      }
    });

    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = cupon;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
};

module.exports.getByuser = async (req, res) => {
  try {
    let userId = parseInt(req.params.Id);

    const cupon = await prisma.cupon.findMany({
      where: {
        IdUser: userId
      },
      include: {
        Category: true
      }
    })

    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = cupon;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.getByCategory = async (req, res, next) => {
  try {
    let category = parseInt(req.params.Id);

    const cupon = await prisma.cupon.findMany({
      where: {
        Category: {
          some: {
            Id: category
          }
        }
      },

    });
    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = cupon;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.change = async (req, res, next) => {
  try {
    const {
      IdCupon,
      IdUser,
      Price,
      IdWallet
    } = req.body


    const cupon = await prisma.cupon.update({
      where: {
        Id: IdCupon
      },
      data: {
        Estado: true,
        User: {
          connect: {
            Id: IdUser
          },
        }

      }
    })

    //busca el wallet a actualizar
    const wallet = await prisma.wallet.findUnique({
      where: {
        Id: IdWallet
      }
    })

    console.log('WALLET', wallet)
    //actualiza los campos del wallet de la transaccion

    const walletChanged = await prisma.wallet.update({
      where: {
        Id: IdWallet
      },
      data: {
        AvaibleCoins: wallet.AvaibleCoins - Price,
        ChangesCoins: wallet.ChangesCoins + Price
      }
    })

    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = {
      Cupon: cupon,
      Wallet: walletChanged
    };

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
};

module.exports.create = async (req, res, next) => {
  try {

    let data = req.body
    const generateQRBase64 = async (text) => {
      try {
        const qrCodeDataURL = await qrcode.toDataURL(text);
        return qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      } catch (error) {
        console.error("Error al generar el código QR:", error);
        return "";
      }
    };

    let qr = await generateQRBase64(JSON.stringify(data));

    const cupon = await prisma.cupon.create({
      data: {
        Name: data.Name,
        Description: data.Description,
        Price: data.Price,
        ValidateDateBegin: data.ValidateDateBegin,
        ValidateDateFinish: data.ValidateDateFinish,
        Estado: false,
        Qr: {
          Qr: `data:image/png;base64,${qr}`
        },
        Category: {
          connect: {
            Id: data.Categoria
          }, // Conexión con la categoría mediante su ID
        },

      }
    })
    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Cupon creado' : 'Cupon no creado';
    response.Data = cupon;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.update = async (req, res, next) => {
  try {

    let data = req.body;
    let id = parseInt(req.params.Id);
    const cupon = await prisma.cupon.update({
      where:{
        Id: id
      },
      data: {
        Name: data.Name,
        Description: data.Description,
        Price: data.Price,
        ValidateDateBegin: data.ValidateDateBegin,
        ValidateDateFinish: data.ValidateDateFinish,
        Estado: false,
        Category: {
          connect: {
            Id: data.Categoria
          }, // Conexión con la categoría mediante su ID
        },

      }
    })


    response.StatusCode = cupon ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cupon ? 'Cupon creado' : 'Cupon no creado';
    response.Data = cupon;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}