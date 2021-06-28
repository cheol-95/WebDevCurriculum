import { writeFile, readFile } from 'fs';

export const CustomWriteFile = (imagePath, file) => {
  return new Promise((resolve, reject) => {
    writeFile(imagePath, file, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

export const CustomReadFile = (imagePath) => {
  return new Promise((resolve, reject) => {
    readFile(imagePath, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
