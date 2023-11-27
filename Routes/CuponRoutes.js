const express = require('express');
const router = express.Router();

const cuponController=require('../Controllers/CuponController')

router.get('/',cuponController.get)
router.get("/:Id",cuponController.getById)
router.get('/category/:Id', cuponController.getByCategory)
router.post('/',cuponController.change)
module.exports=router