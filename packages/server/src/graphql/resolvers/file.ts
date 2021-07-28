import { File } from '../../dao';
import DaoError from '../../error/error/dao';
import * as validation from '../../lib/validation/file';

interface FileArgs {
  fileName: string;
  text: string;
  oldFileName: string;
  newFileName: string;
}

interface UserContext {
  id: number;
}

export default {
  Query: {
    files: async (
      parent: any,
      args: FileArgs,
      { user }: { user: UserContext },
    ): Promise<string[]> => {
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
    file: async (parent: any, args: FileArgs, { user }: { user: UserContext }): Promise<any> => {
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
    createFile: async (
      parent: any,
      args: FileArgs,
      { user }: { user: UserContext },
    ): Promise<boolean> => {
      const { fileName } = args;
      await validation.createFile(fileName);

      try {
        await File.create({
          owner_id: user.id,
          name: fileName,
          text: '',
        });
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },

    saveFile: async (
      parent: any,
      args: FileArgs,
      { user }: { user: UserContext },
    ): Promise<boolean> => {
      const { fileName, text } = args;
      await validation.saveFile(fileName, text);

      try {
        await File.update(
          {
            text,
          },
          {
            where: {
              owner_id: user.id,
              name: fileName,
            },
          },
        );
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },
    saveAsFile: async (
      parent: any,
      args: FileArgs,
      { user }: { user: UserContext },
    ): Promise<boolean> => {
      const { oldFileName, newFileName, text } = args;
      await validation.saveAsFile(oldFileName, newFileName, text);

      try {
        await File.update(
          {
            name: newFileName,
            text,
          },
          {
            where: {
              owner_id: user.id,
              name: oldFileName,
            },
          },
        );
        return true;
      } catch (err) {
        throw DaoError(err);
      }
    },
    deleteFile: async (
      parent: any,
      args: FileArgs,
      { user }: { user: UserContext },
    ): Promise<boolean> => {
      const { fileName } = args;
      await validation.deleteFile(fileName);

      try {
        await File.destroy({
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
