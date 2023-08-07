const express = require("express");
const router = express.Router();
const {newOrder, getSingleOrder,getAllOrders,updateOrder, myOrders,deleteOrder} = require("../controllers/orderControllers")
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new' ,isAuthenticatedUser, newOrder);
router.get('/order/:id',isAuthenticatedUser,getSingleOrder);
router.get('/orders/me',isAuthenticatedUser,myOrders);

// Admin Order Route
router.get('/admin/orders',isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router ;