const userNormalizator = (userToNormalize) => {
    const filedToRemove = [
        'password',
        '__v'
    ];

    filedToRemove.forEach((filed) => {
        delete userToNormalize[filed];
    });
    return userToNormalize;
};

module.exports = {
    userNormalizator
};
