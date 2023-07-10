const express = require("express");
const router = express.Router();
const {newOrder, getSingleOrder, myOrders} = require("../controllers/orderControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post('/order/new' , isAuthenticatedUser , newOrder);
router.get('/order/:id',isAuthenticatedUser , authorizeRoles("Admin") , getSingleOrder);
router.get('/orders/me', isAuthenticatedUser,myOrders);

// Admin Order Route

module.exports = router ;