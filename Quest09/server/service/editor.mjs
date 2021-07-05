import { promises as fsp, existsSync } from 'fs';
import config from '../config/config.mjs';

const { FILEPATH } = config;

const isExist = (fileName) => {
  if (existsSync(makeFilePath(fileName))) {
    throw { code: 'EXISTS' };
  }
};

const makeFilePath = (fileName) => {
  return FILEPATH + fileName + '.txt';
};

export const getFileList = async () => {
  const fileList = await fsp.readdir(FILEPATH);
  return fileList.map((fileName) => {
    return fileName.split('.')[0];
  });
};

export const getFile = async (fileName) => {
  const data = await fsp.readFile(makeFilePath(fileName));
  return data.toString();
};

export const createFile = async (fileName) => {
  isExist(fileName);
  await fsp.writeFile(makeFilePath(fileName), '');
};

export const saveFile = async (fileName, data) => {
  await fsp.writeFile(makeFilePath(fileName), data);
};

export const renameFile = async (oldFileName, newFileName) => {
  const oldFile = makeFilePath(oldFileName);
  const newFile = makeFilePath(newFileName);
  await fsp.rename(oldFile, newFile); // DB의 파일명만 변경할 예정
};

export const deleteFile = async (deleteFileName) => {
  await fsp.unlink(makeFilePath(deleteFileName));
};
