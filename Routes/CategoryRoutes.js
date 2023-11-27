const express = require('express');
const router = express.Router();

const categoryController=require('../Controllers/CategoryController')

router.get('/',categoryController.get)

module.exports=router
