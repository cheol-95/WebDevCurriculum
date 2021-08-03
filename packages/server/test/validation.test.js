const { default: login } = require('../dist/lib/validation/user');
const fileValidation = require('../dist/lib/validation/file');

describe('유효성 검사', () => {
  describe('유저 파트', () => {
    test('로그인', () => {
      const userId = 'test1';
      const userPw = 'test1';

      const result = login(userId, userPw);
      expect(result).toBe(undefined);
    });
  });

  describe('파일 파트', () => {
    test('파일 조회', async () => {
      const getFileName = 'test';

      const result = await fileValidation.getFile(getFileName);
      expect(result).toBe(undefined);
    });

    test('파일 생성', async () => {
      const createFileName = 'test';

      const result = await fileValidation.createFile(createFileName);
      expect(result).toBe(undefined);
    });

    test('파일 저장', async () => {
      const saveFileName = 'test';
      const saveFileText = 'test';

      const result = await fileValidation.saveFile(saveFileName, saveFileText);
      expect(result).toBe(undefined);
    });
  });
});
