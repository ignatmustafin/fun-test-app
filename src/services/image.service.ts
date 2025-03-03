/* eslint-disable security/detect-non-literal-fs-filename */
import fs from "fs";
import jimp from "jimp";
import config from "../config";
import path from "path";

/**
 * Переименовывает файл изображения.
 * @param {string} sourceFilePath
 * @param {string} targetFilePath
 * @return {Promise<void>}
 * @private
 */
async function renameImage(sourceFilePath: string, targetFilePath: string) {
  return new Promise<void>((resolve, reject) => {
    fs.rename(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

/**
 * Изменяет размеры изображения и сохраняет полученный результат.
 * @param {string} sourceFilePath
 * @param {string} targetFilePath
 * @return {Promise<void>}
 * @private
 */
async function resizeImage(sourceFilePath: string, targetFilePath: string) {
  const image = await jimp.read(sourceFilePath);
  image.resize(jimp.AUTO, 180);
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  image.crop(
    (w - config.images.thumbSize) / 2,
    (h - config.images.thumbSize) / 2,
    config.images.thumbSize,
    config.images.thumbSize
  );
  await image.writeAsync(targetFilePath);
}

/**
 * Удаляет файл изображения.
 * @param {string} filePath
 * @return {Promise<void>}
 */
async function removeImage(filePath: string) {
  const originalPath = path.join(config.images.imagesDir, path.relative("static/images", filePath));

  return new Promise<void>((resolve, reject) => {
    fs.unlink(originalPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export const imageService = { renameImage, resizeImage, removeImage };
