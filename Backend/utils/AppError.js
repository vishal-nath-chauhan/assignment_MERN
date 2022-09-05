class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;

export const ErrorWrapper = (fn) => {
	return (req, res, next) => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
};
