const express = require('express');
const { createProduct,getAllProducts,updateProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, deleteProduct } = require('../controllers/productControllers');
const { createUser } = require('../controllers/userControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.post("/createUser",createUser);







//creating product 
router.post('/admin/product/new' ,isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//getting all products
router.get('/products',getAllProducts);

// updating a product
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.get('/product/:id' , getProductDetails);






// Add isAuthenticated in below request
router.put('/review' , createProductReview); 
router.get('/review' , getProductReviews); 
router.delete('/review' , deleteReview); 

module.exports = router;