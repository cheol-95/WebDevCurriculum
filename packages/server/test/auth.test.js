const { default: User } = require('../dist/dao/user');
const { jwtVerify, getAccessToken, getDigest } = require('../dist/lib/auth');

describe('권한 테스트', () => {
  const dummy = {
    user: {
      id: 1,
      jwt: '',
      userId: 'test1',
      userPw: 'test1',
    },
  };

  test('jwt 생성', async () => {
    const jwt = await getAccessToken(dummy.user.id);
    dummy.user.jwt = jwt;
    expect(typeof jwt).toBe('string');
  });

  test('jwt 검증', async () => {
    const dummyHeaders = {
      headers: {
        authorization: `bearer ${dummy.user.jwt}`,
      },
    };

    const decoded = await jwtVerify(dummyHeaders);
    expect(decoded.id).toBe(dummy.user.id);
  });

  test('digest 검증', async () => {
    const row = await User.findOne({
      attributes: ['id', 'salt', 'password'],
      where: {
        id: dummy.user.id,
      },
    });

    const { salt, password } = row.dataValues;
    const { digest } = await getDigest(dummy.user.userPw, salt);
    expect(digest).toBe(password);
  });
});
