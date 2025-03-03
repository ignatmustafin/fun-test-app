import {Request} from "express";
import config from "../config"

/**
 * Возвращает URL на основании указанного запроса.
 * @param {Object} req
 * @return {string}
 */
export function getUrlForRequest(req: Request) {
  const port = config.app.port;
  return `${req.protocol}://${req.hostname}${
    port === 80 || port === 443 ? "" : `:${port}`
  }/`;
}

/**
 * Возвращает URL файла.
 * @param {Object} req
 * @param {string} fileName
 * @return {string}
 */
export function getFileUrl(req: Request, fileName: string) {
  const { user } = req;
  const url = getUrlForRequest(req);
  return `${url}/images/${user?.id}/${fileName}`;
}

export function castFileUrl(filePath: string) {
  return filePath.replace(/.*\/images\//, "static/images/");
}
