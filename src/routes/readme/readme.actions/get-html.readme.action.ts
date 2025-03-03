import fs from "fs";
import path from "path";
import { marked } from "marked";
import { renderPage } from "../readme.service";
import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { EHttpCode } from "../../../enums";

const logger = createLogger(module);

/**
 * GET /
 * Эндпоинт просмотра HTML с описанием тестового задания.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function getHtml(req: Request, res: Response) {
  logger.init("get readme html");
  const file = fs.readFileSync(path.resolve("README.md"), "utf8");
  const pageContent = marked(file.toString());
  res.status(EHttpCode.OK).send(renderPage(pageContent));
  logger.success();
}
