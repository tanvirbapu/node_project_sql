const express = require('express');
const {
    isKeyPresent,
    isString
} = require('../../util/validators/request-validator');

const router = express.Router();

const userController = require('../../controllers/userController');

router.get('/get-connection', userController.getConnection);

router.post('/sign-up', [
    isString('firstName'),
    isString('lastName'),
    isKeyPresent('emailId'),
    isKeyPresent('password'),
    isKeyPresent('userType')
], userController.signUp);

router.post('/login', [
    isKeyPresent('emailId'),
    isKeyPresent('password')
], userController.login);

router.post('/get-otp', [
    isKeyPresent('emailId')
], userController.getOtp);

router.post('/verify-otp', [
    isKeyPresent('emailId'),
    isKeyPresent('otp')
], userController.verifyOtp);

router.post('/update-password', [
    isKeyPresent('id'),
    isKeyPresent('password')
], userController.updatePassword);

router.post('/logout', [
    isKeyPresent('id')
], userController.logout);

//get users
router.post('/get-users', userController.getUsers);

//get user details
router.post('/get-user-details', userController.getUserDetails);

//delete use using userId
router.post('/delete-user', userController.deleteUser);

module.exports = router;