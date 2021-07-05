import express from 'express';
import path from 'path';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('./public'));
app.use('/', (req, res, next) => {
  res.sendFile(path.resolve() + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`server on ${PORT} port`);
});
