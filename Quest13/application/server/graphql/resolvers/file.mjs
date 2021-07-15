import Dao from '../../dao/index.mjs';
import { DaoError } from '../../error/error/dao.mjs';

import * as validation from '../../lib/validation/file.mjs';

const { File: fileDao } = Dao;

export default {
  Query: {
    files: async (parent, args, { user }) => {
      try {
        const rows = await fileDao.findAll({
          attributes: ['name'],
          where: {
            owner: user.id,
          },
        });
        return rows.map((row) => row.dataValues.name);
      } catch (err) {
        throw new DaoError(err);
      }
    },
    file: async (parent, { fileName }, { user }) => {
      await validation.getFile(fileName);

      try {
        const file = await fileDao.findOne({
          attribute: ['name', 'text'], // 왜 전체 어트리뷰트가 리턴되는지 확인해보기?
          where: {
            owner: user.id,
            name: fileName,
          },
        });
        return file;
      } catch (err) {
        throw new DaoError(err);
      }
    },
  },

  Mutation: {
    createFile: async (parent, { fileName }, { user }) => {
      await validation.createFile(fileName);

      try {
        const rows = await fileDao.create({
          owner: user.id,
          name: fileName,
          text: '',
        });
        return true;
      } catch (err) {
        throw new DaoError(err);
      }
    },

    saveFile: async (parent, { fileName, text }, { user }) => {
      await validation.saveFile(fileName, text);

      try {
        const rows = await fileDao.update(
          {
            text: text,
          },
          {
            where: {
              owner: user.id,
              name: fileName,
            },
          }
        );
        return true;
      } catch (err) {
        throw new DaoError(err);
      }
    },
    saveAsFile: async (parent, { oldFileName, newFileName, text }, { user }) => {
      await validation.saveAsFile(oldFileName, newFileName, text);

      try {
        const rows = await fileDao.update(
          {
            name: newFileName,
            text,
          },
          {
            where: {
              owner: user.id,
              name: oldFileName,
            },
          }
        );
        return true;
      } catch (err) {
        throw new DaoError(err);
      }
    },
    deleteFile: async (parent, { fileName }, { user }) => {
      await validation.deleteFile(fileName);

      try {
        const rows = await fileDao.destroy({
          where: {
            owner: user.id,
            name: fileName,
          },
        });
        return true;
      } catch (err) {
        throw new DaoError(err);
      }
    },
  },
};
