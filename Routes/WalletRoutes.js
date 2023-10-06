const express = require('express');
const router = express.Router();

const walletController=require('../Controllers/WalletController')

router.get('/',walletController.get)
router.get("/:Id",walletController.getById)

module.exports=router