class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;

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
