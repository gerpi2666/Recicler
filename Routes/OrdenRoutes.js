const express = require('express');
const router = express.Router();

const ordenController=require('../Controllers/OrdenController')

router.get('/',ordenController.get)
router.get("/:Id",ordenController.getById)

module.exports=router