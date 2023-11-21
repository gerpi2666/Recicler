import { PrismaClient } from '@prisma/client';

import {Centers} from './Seeds/Center'
import { Roles } from './Seeds/Role'
import {Users} from './Seeds/Users'
import{Materials} from './Seeds/Material'
import {Categorys} from './Seeds/Category'

const prisma = new PrismaClient();

async function seed() {

   await prisma.role.createMany({
    data: Roles
  });

  await prisma.category.createMany({
    data:Categorys
  })
  await prisma.user.createMany({
    data: await Users
  });

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
