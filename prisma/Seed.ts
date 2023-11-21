import { PrismaClient } from '@prisma/client';

import {Centers} from './Seeds/Center'
import { Roles } from './Seeds/Role'
import {Users} from './Seeds/Users'
import{Materials} from './Seeds/Material'
import {Categorys} from './Seeds/Category'
import {Wallets} from './Seeds/Wallet'

const prisma = new PrismaClient();

async function seed() {

   await prisma.role.createMany({
    data: Roles
  });

  await prisma.category.createMany({
    data:Categorys
  })


 /*  await prisma.user.createMany({
    data: await Users
  }); */

  const users= await Users
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
        Password: user.Password, // Asumiendo que la contraseña ya está encriptada
      },
    });
  
    // Crea la cartera (Wallet) asociada al usuario recién creado
    
  }
  


 /*  for (const wallet of Wallets) {
    if(wallet){
      await prisma.wallet.create({
        data: {
          IdUser: wallet.IdUser,
          AvaibleCoins: wallet.AvaibleCoins,
          ChangesCoins: wallet.ChangesCoins,
          RecivedCoins: wallet.RecivedCoins,
          User: {
            connect: { Id: wallet.IdUser } // Establecer la relación con el usuario por su Id
          }
        }
      });
    }
    
  } */
  
   await prisma.recicleCenter.createMany({
    data: Centers
  });


  
  // Crear un material de ejemplo
  await prisma.material.createMany({
    data: Materials

  }); 



  console.log('Seeds creados exitosamente.');
}

// Ejecutar la función de seed
seed()
.then(async()=>{
  await prisma.$disconnect();
})
.catch(async e=>{
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})
