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

//#region Gets

module.exports.get = async (req, res, next) => {
  try {
    const orden = await prisma.orden.findMany({
      orderBy: {
        Id: 'asc',
      }
    });

    response.StatusCode = orden ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = orden ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = orden;

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
    const orden = await prisma.orden.findUnique({
      where: {
        Id: id
      },
      include: {
        RecicleCenter: true,
        User: true,
        OrdenDetail: {
          include: {
            Material: true,
          },
        },
      },

    });

    response.StatusCode = orden ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = orden ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = orden;

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
};

module.exports.getByCenter = async (req, res, next) => {
  try {
    let center = parseInt(req.params.Id);
    const centerp = await prisma.recicleCenter.findMany({
      where: {
        UserAdmin: center
      }
    })

    const ordenes = await prisma.orden.findMany({
      where: {
        IdCenter: centerp.Id,
      },
      include: {
        User: true,
        RecicleCenter: true,
        OrdenDetail: {
          include: {
            Material: true,
          },
        },
      }
    });

    response.StatusCode = ordenes != null || undefined ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = ordenes != null || undefined ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = ordenes != null || undefined ? ordenes : 'Sin datos';

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.getByUser = async (req, res, next) => {
  try {
    let user = parseInt(req.params.Id);
    const ordenes = await prisma.orden.findMany({
      where: {
        IdUser: user,
      },
      include: {
        User: true,
        RecicleCenter: true,
        OrdenDetail: {
          include: {
            Material: true,
          },
        },
      }
    });

    response.StatusCode = ordenes != null || undefined ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = ordenes != null || undefined ? 'Informacion retornada correctamente' : 'Informacion no encontrada';
    response.Data = ordenes != null || undefined ? ordenes : 'Sin datos';

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

//#endregion

module.exports.create = async (req, res, next) => {
  try {
    let orderReq = req.body;

    // crea la orden
    const orden = await prisma.orden.create({
      data: {
        IdUser: orderReq.IdUser,
        IdCenter: orderReq.IdCenter,
        Date: orderReq.Date,
        Total: orderReq.Total,

      }
    })

    const createDetailsPromises = orderReq.OrdenDetail.map(async element => {
      return prisma.ordenDetail.create({
        data: {
          OrdenId: orden.Id,
          MaterialId: element.MaterialId,
          Cantidad: element.Cantidad,
          Subtotal: element.Subtotal
        }
      });
    });

    await Promise.all(createDetailsPromises);


    //actualiza el wallert
    const wallet = await prisma.wallet.findUnique({
      where: {
        IdUser: orderReq.IdUser
      },
      include: {

        User: true,

      },
    })

    const walletUp = await prisma.wallet.update({
      where: {
        IdUser: orderReq.IdUser
      },
      data: {
        RecivedCoins: wallet.RecivedCoins + orden.Total,
        AvaibleCoins: wallet.AvaibleCoins + orden.Total

      }

    })


    response.StatusCode = orden && walletUp ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = orden && walletUp ? 'Material creado' : 'Material no creado';
    response.Data = {
      Orden: orden,
      wallet: walletUp
    };

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}

module.exports.report = async (req, res, next) => {
  try {
    let id = 1

    const fechaActual = new Date();
    const fechaInicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0, 23, 59, 59, 999);


    const cantidad = await prisma.orden.count({
      where: {
        IdCenter: id,
        Date: {
          gte: fechaInicioMes,
          lte: fechaFinMes,
        },
      },
    });

    const coins = await prisma.orden.aggregate({
      where: {
        IdCenter: id,

      },
      _sum: {
        Total: true,
      },
    });

    const materials = await prisma.ordenDetail.groupBy({
      by: ['MaterialId'],
      _count: {
        _all: true,
      },
      where: {
        Orden: {
          IdCenter: id,
          
        },
      },
    });

    const user = await prisma.orden.groupBy({
      by: ['IdUser'],
      _count: {
        _all: true,
      },
      where: {
        IdCenter: id,
        Date: {
          gte: fechaInicioMes,
          lte: fechaFinMes,
        },
      },
      orderBy: {
        _count: {
          desc: true,
        },
      },
      take: 1,
      select: {
        IdUser: true,
        _count: true,
      },
    });

    response.StatusCode = cantidad ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    response.Message = cantidad ? 'Material creado' : 'Material no creado';
    response.Data = {
      Count: cantidad,
      Coins: coins,
      Materials: materials,
      User: user
    };

  } catch (error) {

    response.StatusCode = HttpStatus.SERVER_ERROR;
    response.Message = `Error del servidor:\n${error.message}`;

  } finally {
    res.json(response);
  }
}