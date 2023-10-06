const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const cupon = await prisma.cupon.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(cupon);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const cupon = await prisma.cupon.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
        Materials: true
    },
    });
    res.json(cupon);
  };