import login from '../src/lib/validation/user';
import * as fileValidation from '../src/lib/validation/file';

describe('유효성 검사', () => {
  describe('유저 파트', () => {
    test('로그인', () => {
      const userId: string = 'test1';
      const userPw: string = 'test1';

      const result: any = login(userId, userPw);
      expect(result).toBe(undefined);
    });
  });

  describe('파일 파트', () => {
    test('파일 조회', async () => {
      const getFileName: string = 'test';

      const result = await fileValidation.getFile(getFileName);
      expect(result).toBe(undefined);
    });

    test('파일 생성', async () => {
      const createFileName: string = 'test';

      const result = await fileValidation.createFile(createFileName);
      expect(result).toBe(undefined);
    });

    test('파일 저장', async () => {
      const saveFileName: string = 'test';
      const saveFileText: string = 'test';

      const result = await fileValidation.saveFile(saveFileName, saveFileText);
      expect(result).toBe(undefined);
    });
  });
});
