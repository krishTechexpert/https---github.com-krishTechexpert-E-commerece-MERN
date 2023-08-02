const express = require('express');
const router=express.Router()
const {registerUser,loginUser,forgotPassword,resetPassword,userProfile,updatePassword,updateUserProfile,getAllUser,getSingleUserDetails,updateUserRole,deleteUserByAdmin,logout} = require('../controllers/userController')
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:resetToken').put(resetPassword)

router.route('/profile').get(isAuthenticatedUser,userProfile)

router.route('/password/update').put(isAuthenticatedUser,updatePassword)

router.route('/profile/update').put(isAuthenticatedUser,updateUserProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)

router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetails)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserByAdmin)

router.route('/logout').get(logout)



module.exports=router;