const express = require('express');
const router = express.Router();

const materialController=require('../Controllers/MaterialController')

router.get('/',materialController.get)
router.get("/:Id",materialController.getById)

module.exports=router