const dummy = {
  graphqlUrl: 'https://localhost:8000/graphql/',
};

export const customFetch = async (method, query, headers = {}) => {
  const res = await fetch(dummy.graphqlUrl, {
    method,
    credential: 'includes',
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('jwt'),
      'Content-type': 'application/json; charset=UTF-8',
      ...headers,
    },
    ...(query && { body: JSON.stringify(query) }),
  });

  return await res.json();
};
