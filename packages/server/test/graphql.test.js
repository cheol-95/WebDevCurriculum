const request = require('supertest');
const { default: app } = require('../dist/app');

describe('graphql-query', () => {
  const dummy = {
    user: {
      jwt: '',
      id: 'test1',
      pw: 'test1',
    },

    file: {
      fileName: 'testFileName',
      changeFileName: 'change',
      text: 'testCaseText',
    },
  };

  const sendRequest = async (body, jwt = null) => {
    const response = await request(app)
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `bearer ${jwt}`)
      .send(body);

    return response.body.data;
  };

  beforeAll(async () => {
    const loginQuery = {
      query: `
        mutation {
          login(userId: "${dummy.user.id}", userPw: "${dummy.user.pw}")
        }
      `,
    };

    const data = await sendRequest(loginQuery);
    const jwt = data.login;
    dummy.user.jwt = jwt;
  });

  test('파일목록 조회', async () => {
    const query = {
      query: `
        query {
          files {
            name
          }
        }
      `,
    };

    const data = await sendRequest(query, dummy.user.jwt);
    const files = data.files;
    expect(typeof files).toBe('object');
  });

  test('파일 생성', async () => {
    const query = {
      query: `
        mutation {
          createFile(fileName: "${dummy.file.fileName}")
        }
      `,
    };

    const data = await sendRequest(query, dummy.user.jwt);
    expect(data.createFile).toBe(true);
  });

  test('파일 저장', async () => {
    const query = {
      query: `
        mutation {
          saveFile(
            fileName: "${dummy.file.fileName}",
            text: "${dummy.file.text}"
          )
        }
      `,
    };

    const data = await sendRequest(query, dummy.user.jwt);
    expect(data.saveFile).toBe(true);
  });

  test('다른 이름으로 저장', async () => {
    const query1 = {
      query: `
        mutation {
          saveAsFile(
            oldFileName: "${dummy.file.fileName}",
            newFileName: "${dummy.file.changeFileName}",
            text: "${dummy.file.text}"
          )
        }
      `,
    };

    const data1 = await sendRequest(query1, dummy.user.jwt);
    expect(data1.saveAsFile).toBe(true);

    const query2 = {
      query: `
        mutation {
          saveAsFile(
            oldFileName: "${dummy.file.changeFileName}",
            newFileName: "${dummy.file.fileName}",
            text: "${dummy.file.text}"
          )
        }
      `,
    };

    const data2 = await sendRequest(query2, dummy.user.jwt);
    expect(data2.saveAsFile).toBe(true);
  });

  test('파일 조회', async () => {
    const query = {
      query: `
        query {
          file(fileName: "${dummy.file.fileName}"){
            name,
            text
          }
        }
      `,
    };

    const data = await sendRequest(query, dummy.user.jwt);
    const file = data.file;
    expect(file).toEqual({
      name: dummy.file.fileName,
      text: dummy.file.text,
    });
  });

  test('파일 제거', async () => {
    const query = {
      query: `
      mutation {
        deleteFile(fileName: "${dummy.file.fileName}")
      }
      `,
    };

    const data = await sendRequest(query, dummy.user.jwt);
    expect(data.deleteFile).toBe(true);
  });
});
