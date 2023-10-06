const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const recicleCenter = await prisma.recicleCenter.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(recicleCenter);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const recicleCenter = await prisma.recicleCenter.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
        Materials: true
    },
    });
    res.json(recicleCenter);
  };