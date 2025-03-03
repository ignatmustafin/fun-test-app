import {
  EncodedAndSignedToken,
  DecodedAndVerifiedToken,
} from "./jwt.service.token";
import { JwtConfig } from "./jwt.service.config";
import { IJwtConfig, IJwtUserPayload } from "../../interfaces";
import { createLogger } from "../logger.service";
import { JwtPayload } from "jsonwebtoken";

const logger = createLogger(module);

/**
 * API JWT service
 */
export class JwtService {
  #config;

  constructor(config: IJwtConfig) {
    this.#config = new JwtConfig(config);
  }

  /**
   * Returns an encoded API JWT token object
   * @param {IJwtUserPayload} user
   * @return {EncodedAndSignedToken}
   */
  encode(user: JwtPayload) {
    logger.info(`Encode API JWT token for user: ${user.id}`);
    const token = new EncodedAndSignedToken(this.#config, {
      pld: user,
      sub: user.id,
    });
    logger.success();
    return token;
  }

  /**
   * Returns a decoded API JWT token object
   * @param {String|EncodedAndSignedToken} authToken
   * @return {DecodedAndVerifiedToken}
   */
  decode(authToken: string | EncodedAndSignedToken) {
    logger.info("Decode API JWT token");
    const token = new DecodedAndVerifiedToken(this.#config, authToken);
    logger.success();
    return token;
  }
}
