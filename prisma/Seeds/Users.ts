import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = async (password:any) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword; // Contraseña hash como string
};

const createUsers = async () =>{
  return[
    {
      IdWallet:1,
      Email: "admin@prueba.com",
      Name: "Gerald Picado",
      Number: "86911434",
      Direccion: "400m este de chelips",
      Identification: "117870605",
      IdRol: 1,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:2,
      Email: "admin2@prueba.com",
      Name: "Lauren Ortiz",
      Number: "71881697",
      Direccion: "100m norte del banco ",
      Identification: "503260024",
      IdRol: 1,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:3,
      Email: "cliente@prueba.com",
      Name: "Lucía García",
      Number: "87651234",
      Direccion: "300m este del parque central",
      Identification: "102345678",
      IdRol: 2,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:4,
      Email: "cliente1@prueba.com",
      Name: "Mateo Rodríguez",
      Number: "86712345",
      Direccion: "150m norte del hospital",
      Identification: "124305678",
      IdRol: 2,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:5,
      Email: "cliente2@prueba.com",
      Name: "Valentina López",
      Number: "78651234",
      Direccion: "80m sur de la escuela primaria",
      Identification: "130245678",
      IdRol: 2,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:6,
      Email: "cliente3@prueba.com",
      Name: "Santiago Martínez",
      Number: "86745123",
      Direccion: "50m sur de la estación de policía",
      Identification: "142305678",
      IdRol: 2,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:7,
      Email: "cliente4@prueba.com",
      Name: "Camila Pérez",
      Number: "87612345",
      Direccion: "250m oeste del centro comercial",
      Identification: "156207834",
      IdRol: 2,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:8,
      Email: "centerAdmin1@prueba.com",
      Name: "Sebastián Gómez",
      Number: "76543128",
      Direccion: "70m este del restaurante",
      Identification: "170982345",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:9,
      Email: "centerAdmin2@prueba.com",
      Name: "Isabella Hernández",
      Number: "87651243",
      Direccion: "120m norte de la biblioteca",
      Identification: "201345678",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:10,
      Email: "centerAdmin3@prueba.com",
      Name: "Diego Sánchez",
      Number: "76581234",
      Direccion: "200m oeste del supermercado",
      Identification: "213045678",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:11,
      Email: "centerAdmin4@prueba.com",
      Name: "Sofía González",
      Number: "68712345",
      Direccion: "180m sur del gimnasio",
      Identification: "230145678",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:12,
      Email: "centerAdmin5@prueba.com",
      Name: "Nicolás Ramírez",
      Number: "87651238",
      Direccion: "90m este del cine",
      Identification: "241035678",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:13,
      Email: "centerAdmin6@prueba.com",
      Name: "Emma Díaz",
      Number: "78651243",
      Direccion: "40m oeste de la plaza principal",
      Identification: "270918345",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    },
    {
      IdWallet:14,
      Email: "centerAdmin7@prueba.com",
      Name: "Alejandro Castro",
      Number: "86751234",
      Direccion: "60m norte del teatro",
      Identification: "703245618",
      IdRol: 3,
      Password: await hashPassword("123456"), // Reemplaza con una contraseña hash real
    }
  ];
}

export const Users=createUsers()