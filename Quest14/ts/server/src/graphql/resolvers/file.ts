import { File } from '../../dao';
import { DaoError } from '../../error/error/dao';
import * as validation from '../../lib/validation/file';

export default {
  Query: {
    files: async (parent: any, args: any, { user }: { user: any }) => {
      try {
        const rows = await File.findAll({
          attributes: ['name', 'text'],
          where: {
            owner_id: user.id,
          },
        });
        return rows.map((row: any) => row.dataValues);
      } catch (err) {
        throw DaoError(err);
      }
    },
    file: async (parent: any, args: any, { user }: { user: any }) => {
      const { fileName } = args;
      await validation.getFile(fileName);

      try {
        const file = await File.findOne({
          attributes: ['name', 'text'],
          where: {
            owner_id: user.id,
            name: fileName,
          },
        });
        return file;
      } catch (err) {
        throw DaoError(err);
      }
    },
  },

  Mutation: {
    createFile: async (parent: any, args: any, { user }: { user: any }) => {
      const { fileName } = args;
      await validation.createFile(fileName);

      try {
        const rows = await File.create({
          owner_id: user.id,
          name: fileName,
          text: '',
        });
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },

    saveFile: async (parent: any, args: any, { user }: { user: any }) => {
      const { fileName, text } = args;
      await validation.saveFile(fileName, text);

      try {
        const rows = await File.update(
          {
            text: text,
          },
          {
            where: {
              owner_id: user.id,
              name: fileName,
            },
          }
        );
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },
    saveAsFile: async (parent: any, args: any, { user }: { user: any }) => {
      const { oldFileName, newFileName, text } = args;
      await validation.saveAsFile(oldFileName, newFileName, text);

      try {
        const rows = await File.update(
          {
            name: newFileName,
            text,
          },
          {
            where: {
              owner_id: user.id,
              name: oldFileName,
            },
          }
        );
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },
    deleteFile: async (parent: any, args: any, { user }: { user: any }) => {
      const { fileName } = args;
      await validation.deleteFile(fileName);

      try {
        const rows = await File.destroy({
          where: {
            owner_id: user.id,
            name: fileName,
          },
        });
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },
  },
};
