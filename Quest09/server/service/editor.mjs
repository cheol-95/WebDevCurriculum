import fs from 'fs/promises';

const FILEPATH = './public/';

const makeFilePath = (fileName) => {
  return FILEPATH + fileName + '.txt';
};

export const getFileList = async () => {
  const fileList = await fs.readdir(FILEPATH);
  return fileList.map((fileName) => {
    return fileName.split('.')[0];
  });
};

export const getFile = async (fileName) => {
  const data = await fs.readFile(makeFilePath(fileName));
  return data.toString();
};

export const upsertFile = async (fileName, data) => {
  await fs.writeFile(makeFilePath(fileName), data);
};

export const renameFile = async (oldFileName, newFileName) => {
  // DB값 수정 부
  const oldFile = makeFilePath(oldFileName);
  const newFile = makeFilePath(newFileName);
  await fs.rename(oldFile, newFile);
};

export const deleteFile = async (deleteFileName) => {
  await fs.unlink(makeFilePath(deleteFileName));
};
