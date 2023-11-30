const express = require('express');
const router = express.Router();

const cuponController=require('../Controllers/CuponController')

router.get('/',cuponController.get)
router.post('/',cuponController.create)
router.post('/change',cuponController.change)
router.get("/:Id",cuponController.getById)
router.get('/category/:Id', cuponController.getByCategory)
router.get('/user/:Id', cuponController.getByuser)
module.exports=router