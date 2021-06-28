import { CustomWriteFile, CustomReadFile } from '../util/asyncFile.mjs';

const imagePath = './static/image/tmp.jpg';

export const picUpload = (req, res) => {
  req.on('end', async () => {
    try {
      await CustomWriteFile(imagePath, req.body);
      res.writeHead(200);
    } catch (err) {
      console.log('err: ', err);
      res.writeHead(500);
    } finally {
      res.end();
    }
  });
};

export const picShow = async (req, res) => {
  try {
    const file = await CustomReadFile(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.write(file);
  } catch (err) {
    console.log('err: ', err);
    res.writeHead(500);
  } finally {
    res.end();
  }
};

export const picDownload = async (req, res) => {
  try {
    const file = await CustomReadFile(imagePath);
    res.writeHead(200, { 'Content-Disposition': 'attachment; filename=tmp.jpg' });
    res.write(file);
  } catch (err) {
    console.log('err: ', err);
    res.writeHead(500);
  } finally {
    res.end();
  }
};
