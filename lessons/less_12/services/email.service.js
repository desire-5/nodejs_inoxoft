const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const templatesInfo = require('../email-templates');

const { config, statusCodesEnum } = require('../configs');
const ApiError = require('../error/ApiError');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_BROADCAST,
        pass: config.EMAIL_BROADCAST_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    context = { ...context, frontendURL: config.FRONTED_URL };

    if (!templateToSend) {
        throw new ApiError(statusCodesEnum.SERVER_ERROR, 'Wrong template name');
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
