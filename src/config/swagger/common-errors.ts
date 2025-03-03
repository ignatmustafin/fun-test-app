import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  UnprocessableEntity,
  TooManyRequests,
  InternalError,
} from "../../constants";

export const apiError = {
  type: "object",
  properties: {
    code: {
      type: "string",
    },
    error: {
      type: "string",
    },
  },
};

export const badRequest = {
  description: "Request provided with malformed syntax",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        illegalBearer: {
          value: {
            code: new BadRequest().error_code,
            message: new BadRequest().message,
          },
          summary: "Malformed request syntax",
        },
      },
    },
  },
};

export const unprocessableEntity = {
  description: "Request provides params with illegal values",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        default: {
          value: {
            code: new UnprocessableEntity().error_code,
            message: new UnprocessableEntity().message,
          },
          summary: "Illegal request params values",
        },
      },
    },
  },
};

export const tooManyRequests = {
  description: "Too many requests",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        illegalBearer: {
          value: {
            code: new TooManyRequests().error_code,
            message: new TooManyRequests().message,
          },
          summary: "Too many requests in a given amount of time",
        },
      },
    },
  },
};

export const unauthorized = {
  description: "Verification code incorrect",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        default: {
          value: {
            code: new Unauthorized().error_code,
            message: new Unauthorized().message,
          },
          summary: "Wrong verification code passed, user not authenticated",
        },
      },
    },
  },
};

export const notFound = {
  description: "Not found error",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        default: {
          value: {
            code: new NotFound().error_code,
            message: new NotFound().message,
          },
          summary:
            "Phone number not found, further verification impossible. Need to get verification code first",
        },
      },
    },
  },
};

export const forbidden = {
  description: "Access forbidden error",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        default: {
          value: {
            code: new Forbidden().error_code,
            message: new Forbidden().message,
          },
          summary: "Access to recource forbidden",
        },
      },
    },
  },
};

export const internalError = {
  description: "Internal server error",
  content: {
    "application/json": {
      schema: apiError,
      examples: {
        default: {
          value: {
            code: new InternalError().error_code,
            message: new InternalError().message,
          },
          summary: "Unexpected internal server error",
        },
      },
    },
  },
};