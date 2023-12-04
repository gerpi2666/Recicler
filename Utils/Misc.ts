const qrcode = require("qrcode");

const generateQRBase64 = async (text: any): Promise<string> => {
  try {
    const qrCodeDataURL = await qrcode.toDataURL(text);
    return qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    return "";
  }
};

module.exports.generateQRBase64 = generateQRBase64;
