const express = require('express');
const router = express.Router();

const ordenDetailController=require('../Controllers/OrdenDetailController')


router.get("/:Id",ordenDetailController.getById)

module.exports=router