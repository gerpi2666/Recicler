import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {

  const saltRounds = 10;

  
  // Crear un usuario de ejemplo
  const user = await prisma.user.create({
    data: {
      Email: 'admin@prueba.com',
      Name: 'Gerald Picado',
      Number: '86911434',
      Direccion: '400m este de chelips',
      Identification: '117870605',
      IdRol: 1,
      Password: await bcrypt.hash('123456', saltRounds), // Reemplaza con una contraseña hash real
    },
  });

  // Crear un rol de ejemplo
  const role = await prisma.role.create({
    data: {
      Name: 'Ejemplo de Rol',
    },
  });

  // Crear un centro de reciclaje de ejemplo
  const recicleCenter = await prisma.recicleCenter.create({
    data: {
      Name: 'Pulperia San Agustin',
      Provincia: 'Alajuela',
      Canton: 'Alajuela',
      Distrito: 'Guacima ',
      Numero: '24387319',
      Email: 'sg@example.com',
      Schecudale: '07:00am - 3:00pm',
      Enabled: true,
      User: {
        connect: {
          Id: user.Id, // Reemplaza con el ID del usuario correspondiente
        },
      },
    },
  });

  // Crear un material de ejemplo
  const material = await prisma.material.create({
    data: {
      Name: 'Cobre',
      Description: 'Material conductor fundible',
      Image: null, // Reemplaza con datos de imagen si es necesario
      Color: 'Cafe',
      Unit: 'kg',
      Price: 10.99,
    },
  });

  // Crear una billetera (wallet) de ejemplo
  const wallet = await prisma.wallet.create({
    data: {
      IdUser: user.Id,
      Token: null, // Reemplaza con datos de token si es necesario
      AvaibleCoins: 100.0,
      ChangesCoins: 50.0,
      RecivedCoins: 25.0,
    },
  });

  // Crear un cupón de ejemplo
  const cupon = await prisma.cupon.create({
    data: {
      IdUser: user.Id,
      Description: '3 noches en barcelo',
      Image: null, // Reemplaza con datos de imagen si es necesario
      ValiteDate: new Date('2023-12-31'),
      Price: 5.0,
      Estado: true,
    },
  });

  // Crear una categoría de ejemplo
  const category = await prisma.category.create({
    data: {
      Name: 'Categoría de Ejemplo',
    },
  });

  // Crear una orden de ejemplo
  const orden = await prisma.orden.create({
    data: {
      IdUser: user.Id,
      IdCenter: recicleCenter.Id,
      Date: new Date(),
      Total: 0
    },
  });

  // Crear un detalle de orden de ejemplo
  const ordenDetail = await prisma.ordenDetail.create({
    data: {
      OrdenId: orden.Id,
      MaterialId: material.Id,
      Cantidad: 2,
      Subtotal:0,
    },
  });

  console.log('Seeds creados exitosamente.');
}

// Ejecutar la función de seed
seed()
  .catch((error) => {
    console.error('Error al crear seeds:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
