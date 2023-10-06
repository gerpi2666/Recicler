const express = require('express');
const router = express.Router();

const cuponController=require('../Controllers/CuponController')

router.get('/',cuponController.get)
router.get("/:Id",cuponController.getById)

module.exports=router