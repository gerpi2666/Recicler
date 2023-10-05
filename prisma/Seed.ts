import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Crear un usuario de ejemplo
  const user = await prisma.user.create({
    data: {
      Email: 'usuario@example.com',
      Name: 'Usuario Ejemplo',
      Number: '123456789',
      Password: 'hashedpassword', // Reemplaza con una contraseña hash real
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
      Name: 'Centro de Reciclaje Ejemplo',
      Provincia: 'Provincia Ejemplo',
      Canton: 'Canton Ejemplo',
      Distrito: 'Distrito Ejemplo',
      Numero: '123',
      Email: 'centro@example.com',
      Schecudale: 'Horario de Ejemplo',
      UserAdmin: user.Id,
    },
  });

  // Crear un material de ejemplo
  const material = await prisma.material.create({
    data: {
      Name: 'Material de Ejemplo',
      Description: 'Descripción de Material Ejemplo',
      Image: null, // Reemplaza con datos de imagen si es necesario
      Color: 'Color Ejemplo',
      Unit: 'Unidad Ejemplo',
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
      Description: 'Cupón de Ejemplo',
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
    },
  });

  // Crear un detalle de orden de ejemplo
  const ordenDetail = await prisma.ordenDetail.create({
    data: {
      OrdenId: orden.Id,
      MaterialId: material.Id,
      Cantidad: 2,
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
