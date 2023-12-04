import { PrismaClient } from "@prisma/client";

import { Centers } from "./Seeds/Center";
import { Roles } from "./Seeds/Role";
import { Users } from "./Seeds/Users";
import { Materials } from "./Seeds/Material";
import { Categorys } from "./Seeds/Category";
import { Cupones } from "./Seeds/Cupon";

const prisma = new PrismaClient();

async function seed() {
  await prisma.role.createMany({
    data: Roles,
  });

  await prisma.category.createMany({
    data: Categorys,
  });

  for (const cuponData of Cupones) {
    await prisma.cupon.create({
      data: {
        Name: cuponData.Name,
        Qr: { Qr: `data:image/png;base64,${cuponData.Qr}` },
        Description: cuponData.Description,
        ValidateDateBegin: cuponData.ValidateDateBegin,
        ValidateDateFinish: cuponData.ValidateDateFinish,
        Price: cuponData.Price,
        Estado: cuponData.Estado,
        Category: { connect: { Id: cuponData.CategoryId } },
        // Omite el campo User si no deseas asignar un usuario al crear el cupón
      },
    });
  } 

  const users = await Users;
  for (const user of users) {
    // Crea el usuario en la base de datos
    await prisma.wallet.create({
      data: {
        IdUser: user.IdWallet, // Usa el ID del usuario recién creado
        AvaibleCoins: 0.0,
        ChangesCoins: 0.0,
        RecivedCoins: 0.0,
      },
    });

    const createdUser = await prisma.user.create({
      data: {
        Identification: user.Identification,
        Email: user.Email,
        IdRol: user.IdRol,
        IdWallet: user.IdWallet,
        Name: user.Name,
        Number: user.Number,
        Direccion: user.Direccion,
        Enabled: user.Enabled,
        Password: user.Password, // Asumiendo que la contraseña ya está encriptada
      },
    });
  }

  await prisma.material.createMany({
    data: Materials,
  });


  await prisma.recicleCenter.create({
    data: {
      Name: "Hermita Guayabo",
      Provincia: "Guanacaste",
      Canton: "Bagaces",
      Distrito: "Mogote",
      Numero: "26731105",
      Email: "hermita@miravalles.net",
      Schecudale: "Lunes a viernes 8am a 12pm",
      UserAdmin: 11,
      Enabled: true,
      Materials:{
        connect: [{Id:1},{Id:4}]
      }
    },
  });

  await prisma.recicleCenter.create({
    data: {
      Name: "Rancho Español",
      Provincia: "Alajuela",
      Canton: "Alajuela",
      Distrito: "Guacima",
      Numero: "24380071",
      Email: "crisol@guacimacountryinn.net",
      Schecudale: "Lunes  3pm a 12am",
      UserAdmin: 9,
      Enabled: true,
      Materials:{
        connect: [{Id:5},{Id:3}]
      }
    },
  });

   await prisma.recicleCenter.create({
    data: {
      Name: "Tipico Copey",
    Provincia: "Heredia",
    Canton: "Santa Barbara",
    Distrito: "San Pedro",
    Numero: "22557489",
    Email: "copey@sanpedro.net",
    Schecudale: "Lunes a vierner 24/7",
    UserAdmin: 10,
    Enabled: true,
    },
  });
 

  


  
  // Crear un material de ejemplo

  console.log("Seeds creados exitosamente.");
}

// Ejecutar la función de seed
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
