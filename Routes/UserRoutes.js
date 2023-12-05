const express = require('express');
const router = express.Router();

const userController=require('../Controllers/UserController')

router.get('/',userController.get)
router.post('/',userController.create)
router.put('/:Id',userController.update)

router.put('/pass',userController.updatePass)


router.get('/email',userController.getByEmail)
router.get('/center', userController.getUserWithoutCenter)
router.get('/client',userController.getClients)

router.put('/disabled/:Id',userController.disable)
router.post('/register',userController.register)
router.post("/login", userController.login);

router.get("/:Id",userController.getById)

module.exports=router