import * as editService from '../service/editor.mjs';

export const getFileList = async (req, res) => {
  const fileList = await editService.getFileList();
  return res.status(200).json({
    fileList,
  });
};

export const getFile = async (req, res) => {
  const { fileName } = req.params;
  const data = await editService.getFile(fileName);

  return res.status(200).json({
    fileName,
    data,
  });
};

export const createFile = async (req, res) => {
  const { newFileName } = req.body;

  await editService.createFile(newFileName, '');
  return res.status(201).end();
};

export const saveFile = async (req, res) => {
  const { fileName } = req.params;
  const { data } = req.body;

  await editService.saveFile(fileName, data);
  return res.status(200).end();
};

export const saveAsFile = async (req, res) => {
  const { fileName: oldFileName } = req.params;
  const { newFileName, data } = req.body;

  await editService.renameFile(oldFileName, newFileName);
  await editService.saveFile(newFileName, data);

  return res.status(200).end();
};

export const deleteFile = async (req, res) => {
  const { fileName: deleteFileName } = req.params;

  await editService.deleteFile(deleteFileName);
  return res.status(200).end();
};
