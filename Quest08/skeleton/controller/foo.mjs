export const fooGet = (req, res) => {
  if (req.query && req.query.bar) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`Hello, ${req.query.bar}`);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write(`Bad Request`);
  }
  res.end();
};

export const fooPost = (req, res) => {
  req.on('end', () => {
    if (req.body && req.body.bar) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Hello, ${req.body.bar}`);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(`Bad Request`);
    }
    res.end();
  });
};
