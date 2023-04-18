exports.errorWithMessage = (msg, res) => {
    return res.status(400).json({
        message: msg,
        status: false
    });
}

exports.successMessage = (res, data, hasNextFlag) => {
    return res.json({
        message: 'Success',
        data: data,
        status: true,
        isLast: hasNextFlag
    });
}

// exports.errorSuccess = (message, res, data) => {
//     return res.status(200).json({
//         message: message,
//         status: res.statusCode,
//         data: data
//     })
// }