const {
    validationResult
} = require('express-validator');

exports.validationErrorHandler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
        return false;
    }
    return true;
};