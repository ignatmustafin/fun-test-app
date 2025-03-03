/* eslint-disable max-classes-per-file */
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtConfig } from "./jwt.service.config";
import { IJwtPayload, IJwtUserPayload } from "../../interfaces";

/**
 * JWT token base class
 */
class JwtToken<T = string | JwtPayload> {
  #data: T;

  constructor(data: T) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }
}

/**
 * API JWT encoded and signed token
 */
export class EncodedAndSignedToken extends JwtToken<string> {
  /**
   * Generates an encoded value for the specified data.
   * When determining the value, signature and coding occurs.
   * @param {JwtConfig} config
   * @param {IJwtUserPayload} payload
   */
  constructor(config: JwtConfig, payload: JwtPayload) {
    super(jwt.sign(payload, config.secretKey, config.signOptions));
  }
}

/**
 * API decoded and verified JWT token
 */
export class DecodedAndVerifiedToken extends JwtToken {
  /**
   * Generates a decoded value for the specified data.
   * When determining the value, verification and decoding occurs.
   * @param {JwtConfig} config
   * @param {String|EncodedAndSignedToken} token
   */
  constructor(config: JwtConfig, token: string | EncodedAndSignedToken) {
    super(
      jwt.verify(
        token instanceof EncodedAndSignedToken ? token.data : token,
        config.secretKey,
        config.verifyOptions
      ) as JwtPayload
    );
  }

  /**
   * Returns the `payload` value of the JWT token
   * @return {JwtPayload}
   */
  get payload() {
    return typeof this.data !== "string" ? this.data : {};
  }
}
