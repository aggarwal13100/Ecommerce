const express = require('express');
const { createProduct,getAllProducts,updateProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, deleteProduct } = require('../controllers/productControllers');
const { createUser } = require('../controllers/userControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.post("/createUser",createUser);







//creating product 
router.post('/product/new' ,isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//getting all products
router.get('/products',getAllProducts);

// updating a product
router.put('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get('/product/:id' , getProductDetails);






// Add isAuthenticated in below request
router.put('/review' , createProductReview); 
router.get('/review' , getProductReviews); 
router.delete('/review' , deleteReview); 

module.exports = router;