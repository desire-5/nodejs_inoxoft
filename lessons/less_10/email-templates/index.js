const { FORGOT_PASS, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welocme on board'
    },
    [FORGOT_PASS]: {
        templateName: 'forgotPass',
        subject: 'You can create new pass'
    }
};
