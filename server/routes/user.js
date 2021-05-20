const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.adduserpage);
router.post('/adduser', userController.createuser);
router.get('/edituser/:id', userController.edituserpage);
router.post('/edituser/:id', userController.edituser);
router.get('/deleteuser/:id', userController.deleteuser);
router.get('/viewuser/:id', userController.viewuser);


module.exports = router;