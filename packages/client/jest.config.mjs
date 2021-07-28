export default {
  preset: 'jest-puppeteer',
  globals: {
    LoginURL: 'https://localhost:3000/',
    NotepadURL: 'https://localhost:3000/notepad',

    newFileName: 'newFileForTestCase',
    changeFileName: 'changeFileForTestCase',
    saveText: '이거슨 새로운 문자열이여',

    login: async (page) => {
      await page.type('#id', 'test1');
      await page.type('#pw', 'test1');
      await page.click('.submit');
      await page.waitForNavigation();
    },
  },
  // testMatch: ['test/*.test.js'],
  verbose: true,
};
