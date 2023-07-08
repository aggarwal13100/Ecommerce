const express = require('express');
const { createProduct,getAllProducts,updateProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, deleteProduct } = require('../controllers/productControllers');
const { createUser } = require('../controllers/userControllers');

const router = express.Router();

router.post("/createUser",createUser);







//creating product 
router.post('/product/new' , createProduct);

//getting all products
router.get('/products',getAllProducts);

// updating a product
router.put('/product/:id',updateProduct).delete('/product/:id',deleteProduct).get('/product/:id' , getProductDetails);






// Add isAuthenticated in below request
router.put('/review' , createProductReview); 
router.get('/review' , getProductReviews); 
router.delete('/review' , deleteReview); 

module.exports = router;