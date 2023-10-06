const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (req, res, next) => {
    const wallets = await prisma.wallet.findMany({
      orderBy: {
        Id: 'asc',
      },
      include: {
        User: true,
      },
    });
    res.json(ordenes);
  };

  module.exports.getById = async (req, res, next) => {
    let id = parseInt(req.params.Id);
    const wallet = await prisma.wallet.findUnique({
      where: { Id: id },
      include: {
        User: true,
        Role: true,
        RecicleCenter:true
    },
    });
    res.json(wallet);
  };
 