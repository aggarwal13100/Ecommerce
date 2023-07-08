const express=require('express');
const { getUserDetails } = require('../controllers/userControllers');
//const {isAuthenticatedUser,authorizeRoles}=require('../middlewares/auth');
const router=express.Router();

router.get("/me",getUserDetails );

module.exports=router;