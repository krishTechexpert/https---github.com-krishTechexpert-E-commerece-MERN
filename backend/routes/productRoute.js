const express = require('express')
const router = express.Router();
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductdetails,
    createProductReview,getProductReviews,deleteReview
} = require('../controllers/productController')
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


router.route('/products').get(getAllProducts)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'),createProduct)
router.route('/admin/product/:id')
.put(isAuthenticatedUser, authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct) // shortend

router.route('/products:/id').get(getProductdetails)

router.route('/product/review').put(isAuthenticatedUser,createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReview)



module.exports=router;