const {
    body
} = require('express-validator');

exports.isString = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!');

}

exports.isFileName = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                if (String(value).split('.').length > 2)
                    return false;
                else
                    return true;
            })
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                if (String(value).split('.').length > 2)
                    return false;
                else
                    return true;
            })
            .withMessage(key + ' has invalid value!');
}

exports.isBoolean = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                if (value == 'true' || value == 'false')
                    return true;
                else
                    return false;
            })
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                if (value == 'true' || value == 'false')
                    return true;
                else
                    return false;
            })
            .withMessage(key + ' has invalid value!');
}

exports.isInteger = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .isInt()
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .isInt()
            .withMessage(key + ' has invalid value!');
}

exports.isFloat = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .isFloat()
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .isFloat()
            .withMessage(key + ' has invalid value!');
}

exports.isPositiveInteger = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                return !isNaN(value) && parseInt(value) > 0;
            })
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .custom(value => {
                return !isNaN(value) && parseInt(value) > 0;
            })
            .withMessage(key + ' has invalid value!');
}

exports.isEmail = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .isEmail()
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .isEmail()
            .withMessage(key + ' has invalid value!');
}

exports.isPhoneNum = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .isMobilePhone()
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .isMobilePhone()
            .withMessage(key + ' has invalid value!');
}

exports.isDataURI = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .isURL()
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .isURL()
            .withMessage(key + ' has invalid value!');
}

exports.isDate = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .isDate({
                format: 'YYYY-MM-DD',
                strictMode: true
            })
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' has invalid value!');
}

exports.isDateTime = (key, optional = false) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .bail()
            .matches('^([0-9]{4})-([0-1][0-9])-([0-3][0-9]) ([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$')
            .withMessage(key + ' has invalid value!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .bail()
            .matches('^([0-9]{4})-([0-1][0-9])-([0-3][0-9]) ([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$')
            .withMessage(key + ' has invalid value!');
}

exports.isKeyPresent = (key) => {
    return body(key)
        .trim()
        .notEmpty()
        .withMessage(key + ' required!');
}

exports.isArray = (key, optional = false, fields = [], min = null, max = null) => {
    if (optional)
        return body(key)
            .trim()
            .notEmpty()
            .optional({
                nullable: true,
                checkFalsy: false
            })
            .withMessage(key + ' required!')
            .bail()
            .custom(arr => {
                try {
                    arr = JSON.parse(arr.replace(/\n/g, '\\n'));
                    if (!arr.length || arr.length == 0)
                        return false;
                    if (min && arr.length < min)
                        return false;
                    if (max && arr.length > max)
                        return false;

                    if (fields.length > 0) {
                        for (const e of arr) {
                            for (const field of fields) {
                                if (!e.hasOwnProperty(field))
                                    return false;
                            }
                        }
                    }
                    return true;
                } catch (error) {
                    return false;
                }
            })
            .withMessage((fields.length == 0) ?
                key + ' required as array!' :
                'Data missing in the ' + key + ' array!');
    else
        return body(key)
            .trim()
            .notEmpty()
            .withMessage(key + ' required!')
            .bail()
            .custom(arr => {
                try {
                    arr = JSON.parse(arr.replace(/\n/g, '\\n'));

                    if (!arr.length || arr.length == 0)
                        return false;
                    if (min && arr.length < min)
                        return false;
                    if (max && arr.length > max)
                        return false;

                    if (fields.length > 0) {
                        for (const e of arr) {
                            for (const field of fields) {
                                if (!e.hasOwnProperty(field))
                                    return false;
                            }
                        }
                    }

                    return true;
                } catch (error) {
                    return false;
                }
            })
            .withMessage((fields.length == 0) ?
                key + ' required as array!' :
                'Data missing in the ' + key + ' array!');

};