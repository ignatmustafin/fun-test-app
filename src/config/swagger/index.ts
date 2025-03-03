import { version, description } from "../../../package.json";
import config from "../index";
import {
  apiError,
  badRequest,
  forbidden,
  notFound,
  internalError,
  tooManyRequests,
  unauthorized,
  unprocessableEntity,
} from "./common-errors";

import { usersAuthDoc } from "../../routes/users";
import { readmeDoc } from "../../routes/readme";

const servers = [
  {
    url: `${config.app.url}/${config.app.prefix}`,
    description: `${process.env.NODE_ENV} server`,
  },
];

const securitySchemes = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
};

const requestBodies = {};

const responses = {
  commonErrors: {
    apiError,
    badRequest,
    forbidden,
    notFound,
    internalError,
    tooManyRequests,
    unauthorized,
    unprocessableEntity,
  },
};

const tags = [
  {
    name: "Readme",
    description: "Readme management",
  },
  {
    name: "Users",
    description: "Users management",
  },
];

const security = [{ bearerAuth: [] }];

export const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Test API js backend",
    version,
    description,
  },
  components: {
    securitySchemes,
    requestBodies,
    responses,
  },
  security,
  tags,
  servers,
  paths: {
    ...readmeDoc,
    ...usersAuthDoc,
  },
};
