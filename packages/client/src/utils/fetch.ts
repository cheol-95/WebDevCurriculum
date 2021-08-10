const dummy = {
  graphqlUrl: 'https://cheol.site:8000/graphql',
  loginUrl: 'https://fh618mlkc9.execute-api.ap-northeast-2.amazonaws.com/kcweb-auth-stage/auth',
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

export const loginFetch = async (method: string, body: Object): Promise<any> => {
  const res = await window.fetch(dummy.loginUrl, {
    method,
    body: JSON.stringify(body),
  });

  return res.json();
};
