const users = require('../models/users');

exports.createUser = (userObj) => {
    return users.create({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            emailId: userObj.emailId,
            userType: userObj.userType,
            password: userObj.password
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in createUser : ' + err);
            return -1;
        });
}

exports.getUserWithEmailId = (emailId) => {
    return users.findOne({
            where: {
                emailId: emailId
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in getUserWithEmailId : ' + err);
            return -1;
        })
}

exports.getUserWithId = (userId) => {
    return users.findOne({
            where: {
                userId: userId
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in getUserWithId : ' + err);
            return -1;
        })
}

exports.updatePassword = (userId, password) => {
    return users.update({
            password: password
        }, {
            where: {
                userId: userId
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in updatePassword : ' + err);
            return -1;
        })
}

exports.updateIsLoggedIn = (userId, isLoggedIn) => {
    return users.update({
            isLoggedIn: isLoggedIn
        }, {
            where: {
                userId: userId
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in updateIsLoggedIn : ' + err);
            return -1;
        })
}

exports.getUsersWithUserType = (userType) => {
    return users.findAll({
            where: {
                userType: userType
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('Error ocurred in getUsersWithUserType : ' + err);
            return -1;
        })
}

exports.deleteUser = (userId) => {
    return users.destroy({
            where: {
                userId: userId
            }
        })
        .then(data => {
            return data
        })
        .catch(err => {
            console.error('Error ocurred in deleteUser : ' + err);
            return -1;
        })
}