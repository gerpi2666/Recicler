export const Orden = [
  {
    IdUser: 4, // ID del usuario que realiza la orden
    IdCenter: 1, // ID del centro de reciclaje asociado a la orden
    Date: new Date(), // Fecha actual (puedes proporcionar la fecha deseada)
    Total: 50.25, // Total de la orden
    OrdenDetail: {
      // Detalles de la orden (puede ser un array si hay múltiples detalles)
      create: [
        {
          MaterialId: 1,
          Cantidad: 3,
          Subtotal: 15.75,
        },
        {
          MaterialId: 3,
          Cantidad: 4,
          Subtotal: 60,
        },
        {
          MaterialId: 5,
          Cantidad: 2,
          Subtotal: 25,
        },
      ],
    },
  },
  {
    IdUser: 5, // ID del usuario que realiza la orden
    IdCenter: 1, // ID del centro de reciclaje asociado a la orden
    Date: new Date(), // Fecha actual (puedes proporcionar la fecha deseada)
    Total: 50.25, // Total de la orden
    OrdenDetail: {
      // Detalles de la orden (puede ser un array si hay múltiples detalles)
      create: [
        {
          MaterialId: 6,
          Cantidad: 3,
          Subtotal: 41,
        },
        {
          MaterialId: 8,
          Cantidad: 1,
          Subtotal: 10,
        },
      ],
    },
  },
];
