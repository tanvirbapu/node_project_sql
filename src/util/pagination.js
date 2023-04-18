exports.getNextFlag = (size, page, cnt) => {
    let hasNextFlag = null;
    if (cnt != null) {
        if (Number(size) * Number(page) + Number(size) < cnt) {
            hasNextFlag = false;
        } else {
            hasNextFlag = true;
        }
    }
    return hasNextFlag;
}