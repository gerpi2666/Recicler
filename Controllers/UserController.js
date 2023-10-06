const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const users = await prisma.user.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(users);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const user = await prisma.user.findUnique({
      where: { Id: id },
      include: {
        User: true,
    },
    });
    res.json(user);
  };
