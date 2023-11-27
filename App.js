const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();
const bodyParser = require('body-parser');


const userRoute=require('./Routes/UserRoutes')
const materialRoute=require('./Routes/MaterialRoutes')
const ordenRoute=require('./Routes/OrdenRoutes')
const recicleRoute= require('./Routes/RecicleCenterRoute')
const walletRoute=require('./Routes/WalletRoutes')
const cupoRoute=require('./Routes/CuponRoutes')
const imageRoute=require('./Routes/ImageRoutes')
const detailRoute=require('./Routes/DetailRoutes')
const categoryRoute=require('./Routes/CategoryRoutes')
const port=process.env.PORT || 3000;

dotEnv.config();


app.use(cors());

app.use(logger("dev"))

app.use(bodyParser.json({ limit: '505mb' })); // Ajusta el límite según tus necesidades
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

//routes
app.use('/user/',userRoute)
app.use('/material/',materialRoute)
app.use('/orden/',ordenRoute)
app.use('/center/',recicleRoute)
app.use('/wallet/',walletRoute)
app.use('/cupon/',cupoRoute)
app.use('/img/', imageRoute)
app.use('/ordenDetail/',detailRoute)
app.use('/category/',categoryRoute)

//Server
app.listen(port,()=>{
    console.log(`SERVER ARRIBA ON${port}`)
})