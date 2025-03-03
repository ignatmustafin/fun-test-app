import { IConfig } from "../interfaces";

const configs: Record<string, IConfig> = {
  dev: require("./config.dev").DevConfig,
  test: require("./config.test").TestConfig,
};

const env = process.env.NODE_ENV || "dev";
const config = configs[env];

export default config;
