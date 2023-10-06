const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const materials = await prisma.material.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(materials);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const material = await prisma.material.findUnique({
      where: { Id: id },
      include: {
        RecicleCenter: true,
    },
    });
    res.json(material);
  };
