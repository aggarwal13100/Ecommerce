const express = require("express");
const router = express.Router();
const {newOrder, getSingleOrder, myOrders} = require("../controllers/orderControllers")

router.post('/order/new' , newOrder);
router.get('/order/:id',getSingleOrder);
router.get('/order/myOrders',myOrders);

// Admin Order Route
router.get('/admin/orders',isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router ;