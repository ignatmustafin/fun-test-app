import { SignOptions, VerifyOptions } from "jsonwebtoken";

export interface IJwtConfig {
  secretKey: string;
  sign: SignOptions;
  verify: VerifyOptions;
}

export interface IJwtPayload {
  pld: IJwtUserPayload;
  sub: IJwtUserPayload["id"];
}

export interface IJwtUserPayload {
  id: string;
  username?: string;
}
