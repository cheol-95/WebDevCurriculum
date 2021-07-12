import * as fileService from '../service/file.mjs';

export const getFileList = async (req, res) => {
  const { id: userId } = req.user;

  const fileList = await fileService.getFileList(userId);
  return res.status(200).json({
    fileList,
  });
};

export const getFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileName } = req.params;

  const data = await fileService.getFile(userId, fileName);
  return res.status(200).json({
    fileName,
    data,
  });
};

export const createFile = async (req, res) => {
  const { id: userId } = req.user;
  const { newFileName } = req.body;

  await fileService.createFile(userId, newFileName);
  return res.status(201).end();
};

export const saveFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileName } = req.params;
  const { data } = req.body;

  await fileService.saveFile(userId, fileName, data);
  return res.status(200).end();
};

export const saveAsFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileName: oldFileName } = req.params;
  const { newFileName, data } = req.body;

  await fileService.renameFile(userId, oldFileName, newFileName, data);
  return res.status(200).end();
};

export const deleteFile = async (req, res) => {
  const { id: userId } = req.user;
  const { fileName: deleteFileName } = req.params;

  await fileService.deleteFile(userId, deleteFileName);
  return res.status(200).end();
};
