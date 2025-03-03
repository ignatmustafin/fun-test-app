import { createLogger } from "../services";
import { DataSource, DataSourceOptions } from "typeorm";
import { dbConnectionConfig } from "../DB/postgres";
import { randomUUID } from "crypto";
const logger = createLogger(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class PostgresDatabase {
  #id = randomUUID();
  #databaseConfig;
  #connection?: DataSource;

  constructor(config: DataSourceOptions) {
    this.#databaseConfig = config;
  }

  /**
   * Открывает соединение с БД.
   * @return {void}
   */
  async connect() {
    try {
      // todo: метод установки соединения с БД
      this.#connection = new DataSource(this.#databaseConfig);
      await this.#connection.initialize();

      logger.info(`Connected to ${this.#id}`);
    } catch (error: any) {
      logger.error(`Unable to connect to ${this.#id}: ${error.message}`);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        // todo: метод закрытия соединения с БД
        await this.#connection.destroy();
        logger.info(`Disconnected from ${this.#id}`);
      } catch (error: any) {
        logger.error(`Unable to disconnect from ${this.#id}: ${error.message}`);
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }
}

export const postgresDb = new PostgresDatabase(dbConnectionConfig);
