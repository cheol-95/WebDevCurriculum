import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('./public'));
app.use('/notepad', (req, res, next) => {
  res.sendFile(path.resolve() + '/public/html/notepad.html');
});
app.use('/', (req, res, next) => {
  res.sendFile(path.resolve() + '/public/html/login.html');
});
const server = https.createServer(
  {
    key: fs.readFileSync('../openssl/localhost.key'),
    cert: fs.readFileSync('../openssl/localhost.crt'),
  },
  app
);
server.listen(PORT, () => {
  console.log(`server on ${PORT} port`);
});
