const express = require('express');
const { createProduct,getAllProducts,updateProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, deleteProduct,getAdminProducts } = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

//creating product 
router.post('/admin/product/new' ,isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//getting all products
router.get('/products',getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// updating a product
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.get('/product/:id' , getProductDetails);

// Add isAuthenticated in below request
router.put('/review',isAuthenticatedUser, createProductReview); 
router.get('/reviews' ,getProductReviews); 
router.delete('/reviews' , isAuthenticatedUser,deleteReview); 

module.exports = router;