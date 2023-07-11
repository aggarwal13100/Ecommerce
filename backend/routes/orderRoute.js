const express = require("express");
const router = express.Router();
const {newOrder, getSingleOrder,getAllOrders,updateOrder, myOrders,deleteOrder} = require("../controllers/orderControllers")
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new' , newOrder);
router.get('/order/:id',getSingleOrder);
router.get('/order/me',myOrders);

// Admin Order Route
router.get('/admin/orders',isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router ;