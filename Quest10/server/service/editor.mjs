import { promises as fsp, existsSync } from 'fs';
import config from '../config/config.mjs';

const { FILEPATH } = config;

const filePath = (fileName) => {
  if (['/', '.'].some((x) => fileName.includes(x))) {
    throw Error;
  }
  return FILEPATH + fileName + '.txt';
};

const isExist = (fileName) => {
  return existsSync(filePath(fileName));
};

export const getFileList = async () => {
  const fileList = await fsp.readdir(FILEPATH);
  return fileList.map((fileName) => {
    return fileName.split('.')[0];
  });
};

export const getFile = async (fileName) => {
  const data = await fsp.readFile(filePath(fileName));
  return data.toString();
};

export const createFile = async (fileName) => {
  if (isExist(fileName) === true) {
    throw { code: 'EXISTS' };
  }

  await fsp.writeFile(filePath(fileName), '');
};

export const saveFile = async (fileName, data) => {
  if (isExist(fileName) === false) {
    throw { code: 'ENOENT' };
  }

  await fsp.writeFile(filePath(fileName), data);
};

export const renameFile = async (oldFileName, newFileName) => {
  if (isExist(newFileName) === true) {
    throw { code: 'EXISTS' };
  }

  const oldFile = filePath(oldFileName);
  const newFile = filePath(newFileName);

  await fsp.rename(oldFile, newFile); // DB의 파일명만 변경할 예정
};

export const deleteFile = async (deleteFileName) => {
  await fsp.unlink(filePath(deleteFileName));
};
