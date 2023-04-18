const {
    createUser,
    getUserWithEmailId,
    updatePassword,
    getUserWithId,
    updateIsLoggedIn,
    getUsersWithUserType,
    deleteUser
} = require("../data/data-access/users-data-access");
const {
    errorWithMessage,
    successMessage
} = require("../util/response");
const {
    validationErrorHandler
} = require("../util/validators/express-validator");
const bcrypt = require('bcryptjs');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const jwt = require('jsonwebtoken');

async function sendToken(userData) {
    const token = jwt.sign({
            emailId: userData.emailId
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES
        });
    userData.dataValues.token = token;
    return userData;
}


exports.getConnection = async (req, res, next) => {
    return successMessage(res);
}

exports.signUp = async (req, res, next) => {


    if (!validationErrorHandler(req, res))
        return next();

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        userType: req.body.userType,
        password: hashedPassword
    }


    const userData = await getUserWithEmailId(userObj.emailId);
    if (userData === -1) return errorWithMessage('Error ocurred while getting user data with email', res);
    if (userData === null) {
        const data = await createUser(userObj);
        if (data === -1) return errorWithMessage('Error ocurred while creating user data', res);
        else if (data == null) errorWithMessage('Cannot create user', res);
        else {
            const userToken = await sendToken(data);
            const resp = {
                userId: data.userId,
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId,
                createdAt: data.createdAt,
                token: userToken.dataValues.token,
                updatedAt: data.updatedAt
            }
            await updateIsLoggedIn(data.userId, 1);
            return successMessage(res, resp);
        }
    } else
        return errorWithMessage('EmailId already exists', res);
}

exports.login = async (req, res, next) => {

    if (!validationErrorHandler(req, res))
        return next();

    const userObj = {
        emailId: req.body.emailId,
        password: req.body.password
    }

    const userData = await getUserWithEmailId(userObj.emailId);
    if (userData === -1) return errorWithMessage('Error ocurred while getting user data with email', res);
    if (userData != null) {
        if (bcrypt.compareSync(userObj.password, userData.password)) {
            await updateIsLoggedIn(userData.userId, 1);
            const userToken = await sendToken(userData);
            const resp = {
                userId: userData.userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                emailId: userData.emailId,
                token: userToken.dataValues.token,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt
            }
            return successMessage(res, resp);
        } else return errorWithMessage('Incorrect emailId or password', res);
    } else return errorWithMessage('Incorrect emailId or password', res);
}

exports.getOtp = async (req, res, next) => {
    const emailId = req.body.emailId;
    const userData = await getUserWithEmailId(emailId);
    if (userData === -1) return errorWithMessage('Error ocurred while getting user data with email', res);
    if (userData) {
        const resp = {
            emailId: emailId,
            otp: 1234
        }
        cache.set(emailId, 1234);
        return successMessage(res, resp);
    } else return errorWithMessage('Cannot get user data with email', res);
}

exports.verifyOtp = async (req, res, next) => {
    const emailId = req.body.emailId;
    const otp = req.body.otp;

    try {
        if (cache.has(emailId)) {
            const userData = await getUserWithEmailId(emailId);
            if (userData === -1) return errorWithMessage('Error ocurred while getting user data', res);
            else if (otp == cache.get(emailId)) {
                const resp = {
                    userId: userData.userId,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    emailId: userData.emailId,
                    createdAt: userData.createdAt,
                    updatedAt: userData.updatedAt,
                    isLoggedIn: userData.isLoggedIn
                }
                return successMessage(res, resp);

            } else return errorWithMessage('Cannot get user with email', res);

        } else return errorWithMessage('Error occurred while getting otp from cache', res);
    } catch (err) {
        console.error('Error occurred while verifying otp :: ' + err);
        return errorWithMessage('Error occurred while verifying otp from cache', res);
    }
}

exports.updatePassword = async (req, res, next) => {
    if (!validationErrorHandler(req, res))
        return next();

    const userId = req.body.userId;
    const password = req.body.password;

    const userData = await getUserWithId(userId);
    if (userData === -1) return errorWithMessage('Error ocurred while getting user data with userId', res);
    if (userData != null) {
        const data = await updatePassword(userId, password);
        if (data === -1) return errorWithMessage('Error ocurred while updating password', res);
        else if (data != null) return successMessage(res);
        else return errorWithMessage('Error ocurred while updating password', res);
    } else return errorWithMessage('User not found with userId', res);
}

exports.logout = async (req, res, next) => {
    if (!validationErrorHandler(req, res))
        return next();

    const userId = req.body.userId;
    const userData = await getUserWithId(userId);

    if (userData === -1) return errorWithMessage('Error ocurred while getting user data with userId', res);
    else if (userData) {
        await updateIsLoggedIn(id, 0);
        return successMessage(res);
    } else return errorWithMessage('Cannot update isLoggedIn', res);
}

exports.getUsers = async (req, res, next) => {
    const userType = req.body.userType;
    const data = await getUsersWithUserType(userType);
    if (data === -1) return errorWithMessage('Error ocurred while getting all users', res);
    if (data) return successMessage(res, data);
}

exports.getUserDetails = async (req, res, next) => {
    const userId = req.body.userId;
    const data = await getUserWithId(userId);
    if (data === -1) return errorWithMessage('Error ocurred while getting user with Id', res);
    if (data) return successMessage(res, data);
    else return errorWithMessage('Cannot get user with userId', res);
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.body.userId;
    const userData = await getUserWithId(userId);
    if (userData === -1) return errorWithMessage('Error ocurred while getting user with Id', res);
    if (userData) {
        const data = await deleteUser(userId);
        if (data === -1) return errorWithMessage('Error ocurred while deleting user', res);
        else return successMessage(res);
    } else return errorWithMessage('Cannot get user with userId', res);
}