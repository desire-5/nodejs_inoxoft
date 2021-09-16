class ApiError extends Error {
    constructor(status, message = '', customCode, data = '') {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }

    // static badRequest(message) {
    //     return new ApiError(404, message)
    // }

    // static internal(message) {
    //     return new ApiError(500, message)
    // }
}

module.exports = ApiError;
