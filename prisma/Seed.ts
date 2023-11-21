import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const {Roles} = require('./Seeds/Role')
const {Users} = require('./Seeds/Users')
const {Centers}= require('./Seeds/Center')
const {Materials} = require('./Seeds/Material')

const prisma = new PrismaClient();

async function seed() {

  const role = await prisma.role.create({
    data: Roles
  });

  const user = await prisma.user.create({
    data: Users
  });

  const recicleCenter = await prisma.recicleCenter.create({
    data: Centers
  });

  // Crear un material de ejemplo
  const material = await prisma.material.create({
    data: Materials
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
