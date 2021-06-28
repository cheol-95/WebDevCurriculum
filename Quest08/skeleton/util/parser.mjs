const queryParser = (query) => {
  if (query) {
    return query.split('&').reduce((acc, cur) => {
      const [k, v] = cur.split('=');
      acc[k] = v;
      return acc;
    }, {});
  }
};

const bodyParser = (req) => {
  const data = [];

  req.on('data', (chunk) => {
    data.push(chunk);
  });

  req.on('end', () => {
    if (req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(data);
    } else if (req.headers['content-type'] === 'image/jpeg') {
      req.body = Buffer.concat(data);
    }
  });
};

export const requestParser = (req) => {
  bodyParser(req);
  const [pathName, queryString] = req.url.split('?');
  const query = queryParser(queryString);

  req.path = {
    origin: req.url,
    parseUrl: pathName,
  };

  req.query = query;
  return;
};
