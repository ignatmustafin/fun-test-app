import { DataSource } from "typeorm";
import { dbConnectionConfig } from "./index";

export default new DataSource(dbConnectionConfig);
