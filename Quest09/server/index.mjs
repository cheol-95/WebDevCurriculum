import express from 'express';
import { router } from './router/index.mjs';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('./public'));
app.use('/', router);

app.listen(port, () => {
  console.log(`server on ${port} port`);
});
