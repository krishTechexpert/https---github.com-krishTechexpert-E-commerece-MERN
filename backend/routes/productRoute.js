const express = require('express')
const router = express.Router();
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductdetails} = require('../controllers/productController')
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'),createProduct)
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateProduct).get(getProductdetails).delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct) // shortend

module.exports=router;