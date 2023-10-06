const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const orden = await prisma.orden.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(orden);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const orden = await prisma.orden.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
        Materials: true
    },
    });
    res.json(orden);
  };