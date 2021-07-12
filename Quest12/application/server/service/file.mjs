import fileDao from '../dao/file.mjs';

export const getFileList = async (userId) => {
  const rows = await fileDao.getFileList(userId);
  return rows.map((row) => row.dataValues.name);
};

export const getFile = async (userId, fileName) => {
  const row = await fileDao.getFile(userId, fileName);
  return row.dataValues.text;
};

export const createFile = async (userId, fileName) => {
  return await fileDao.createFile(userId, fileName);
};

export const saveFile = async (userId, fileName, data) => {
  return await fileDao.saveFile(userId, fileName, data);
};

export const renameFile = async (userId, oldFileName, newFileName, data) => {
  return await fileDao.renameFile(userId, oldFileName, newFileName, data);
};

export const deleteFile = async (userId, deleteFileName) => {
  return await fileDao.deleteFile(userId, deleteFileName);
};
