import { EErrorCode, EHttpCode } from "../enums";

export class ApiError extends Error {
  public http_code: EHttpCode;
  public error_code: EErrorCode;

  constructor(message?: string) {
    super();
    this.http_code = EHttpCode.INTERNAL_ERROR;
    this.error_code = EErrorCode.INTERNAL_ERROR;
    this.message = message || "Internal unexpected server error";
  }
}

export class BadRequest extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.BAD_REQUEST;
    this.error_code = EErrorCode.BAD_REQUEST;
    this.message = message || "Malformed request syntax";
  }
}

export class Unauthorized extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.UNAUTHORIZED;
    this.error_code = EErrorCode.UNAUTHORIZED;
    this.message = message || "Unauthorized request";
  }
}

export class Forbidden extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.FORBIDDEN;
    this.error_code = EErrorCode.FORBIDDEN;
    this.message = message || "Not enough permission to access this resource";
  }
}

export class NotFound extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.NOT_FOUND;
    this.error_code = EErrorCode.NOT_FOUND;
    this.message =
      message || "The requested entity is unavailable or doesn't exist";
  }
}

export class UnprocessableEntity extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.UNPROCESSABLE_ENTITY;
    this.error_code = EErrorCode.UNPROCESSABLE_ENTITY;
    this.message = message || "Illegal request params values";
  }
}

export class TooManyRequests extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.TOO_MANY_REQUESTS;
    this.error_code = EErrorCode.TOO_MANY_REQUESTS;
    this.message = message || "Too many requests to access this resource";
  }
}

export class InternalError extends ApiError {
  constructor(message?: string) {
    super(message);
    this.http_code = EHttpCode.INTERNAL_ERROR;
    this.error_code = EErrorCode.INTERNAL_ERROR;
    this.message = message || "Internal unexpected server error";
  }
}
