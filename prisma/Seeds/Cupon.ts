const qrcode = require('qrcode');

let Cupon = [
  {
    Name: "CCM Cinemas",
    Qr: "",
    Description: "CCM CINEMAS 2D cualquier pelicula",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDate: new Date("2023-12-31"), // Fecha de validez del cupón
    Price: 10.0, // Precio del cupón
    Estado: false, // Estado del cupón
    CategoryId: 3, // ID de la categoría relacionada
  },
  {
    Name: "Parque de diversiones",
    Qr: "",
    Description: "Pase especial",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDateFinish: new Date("2024-01-30"),
    Price: 20.0,
    Estado: false,
    CategoryId: 3,
  },
  {
    Name: "Vida Aventura",
    Qr: "",
    Description: "Tour de canopy",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDateFinish: new Date("2024-08-26"),
    Price: 200.0,
    Estado: false,
    CategoryId: 2,
  },
  {
    Name: "Destinos",
    Qr: "",
    Description: "Pase del dia Hilton Belen",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDateFinish: new Date("2024-02-21"),
    Price: 250.0,
    Estado: false,
    CategoryId: 2,
  },
  {
    Name: "Medismart",
    Qr: "",
    Description: "Examen Hemograma",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDateFinish: new Date("2024-06-30"),
    Price: 20.0,
    Estado: false,
    CategoryId: 1,
  },
  {
    Name: "Asembis",
    Qr: "",
    Description: "Examen de la vista",
    ValidateDateBegin: new Date("2023-04-24") ,
    ValiteDateFinish: new Date("2024-03-11"),
    Price: 40.0,
    Estado: false,
    CategoryId: 1,
  },
  // ... Otros cupones
];

const generateQRBase64 = async (text:any) => {
  try {
    const qrCodeDataURL = await qrcode.toDataURL(text);
    return qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    return "";
  }
};

// Generar y asignar códigos QR en base64 a cada objeto en el array Cupon
Cupon.forEach(async (cupon) => {
  const qrBase64 = await generateQRBase64(JSON.stringify(cupon));
  cupon.Qr = qrBase64;
});

export const Cupones=Cupon;