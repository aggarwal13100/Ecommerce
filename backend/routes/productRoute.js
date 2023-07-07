const express = require('express');
const { getAllProducts, getProductDetails, createProductReview, deleteReview, getProductReviews } = require('../controllers/productControllers');
const { createUser } = require('../controllers/userControllers');

const router = express.Router();

router.post("/createUser",createUser);
router.get('/product/:id' , getProductDetails);


// Add isAuthenticated in below request
router.put('/review' , createProductReview); 
router.get('/review' , getProductReviews); 
router.delete('/review' , deleteReview); 

module.exports = router;