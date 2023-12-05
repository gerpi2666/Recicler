const express = require('express');
const router = express.Router();

const roleController=require('../Controllers/RolController')


router.get('/',roleController.get)

module.exports=router
