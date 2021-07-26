const dummy = {
  graphqlUrl: 'https://kcweb.ml:8000/graphql',
};

export const customFetch = async (method: string, query: Object, headers = {}): Promise<any> => {
  const res = await window.fetch(dummy.graphqlUrl, {
    method,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('jwt')}`,
      'Content-type': 'application/json; charset=UTF-8',
      ...headers,
    },
    ...(query && { body: JSON.stringify(query) }),
  });

  return res.json();
};
