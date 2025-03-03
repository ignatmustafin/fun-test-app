import { FileEntity } from "../../DB/postgres/entities/file.entity";
import { CompanyEntity } from "../../DB/postgres/entities/company.entity";

/**
 * Обрабатывает данные компании и возвращает результат.
 * @param {Object} item
 * @param {string} photoUrl
 * @return {Object}
 */
export function parseOne(item: CompanyEntity, photoUrl: string) {
  return {
    ...item,
    photos: item.photos.map((photo: FileEntity) => ({
      ...photo,
      name: `${photoUrl}static/${photo.name}`,
      thumbpath: `${photoUrl}static/${photo.thumbpath}`,
    })),
  };
}
