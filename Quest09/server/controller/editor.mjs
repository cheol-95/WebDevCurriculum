import * as editService from '../service/editor.mjs';
// 유효성검사 등

export const getFileList = async (req, res) => {
  const fileList = await editService.getFileList();

  const result = {
    fileList,
  };
  return res.status(200).json(result);
};

export const getFile = async (req, res) => {
  const { fileName } = req.params;

  const data = await editService.getFile(fileName);

  const result = {
    fileName,
    data,
  };
  return res.status(200).json(result);
};

export const createFile = async (req, res) => {
  // 존재하는 파일인지 확인
  const { newFileName } = req.body;

  await editService.upsertFile(newFileName, '');
  return res.status(201).end();
};

export const updateFile = async (req, res) => {
  const { fileName } = req.params;
  const { data } = req.body;

  await editService.upsertFile(fileName, data);

  return res.status(200).end();
};

export const saveAsFile = async (req, res) => {
  // 존재하는 파일인지 확인
  const { fileName: oldFileName } = req.params;
  const { newFileName, data } = req.body;

  await editService.renameFile(oldFileName, newFileName);
  await editService.upsertFile(newFileName, data);

  return res.status(201).end();
};

export const deleteFile = async (req, res) => {
  const { fileName: deleteFileName } = req.params;
  await editService.deleteFile(deleteFileName);

  return res.status(200).end();
};
