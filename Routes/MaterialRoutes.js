const express = require('express');
const router = express.Router();

const materialController=require('../Controllers/MaterialController')

router.get('/',materialController.get)
router.post('/',materialController.create);

router.get("/:Id",materialController.getById)

//#region Post

//#endregion
router.put('/:Id',materialController.update)


module.exports=router