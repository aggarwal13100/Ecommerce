const express = require("express");
const router = express.Router();
const {newOrder, getSingleOrder, myOrders} = require("../controllers/orderControllers")

router.post('/order/new' , newOrder);
router.get('/order/:id',getSingleOrder);
router.get('/order/myOrders',myOrders);

// Admin Order Route

module.exports = router ;