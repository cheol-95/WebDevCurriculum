describe('로그인 페이지', () => {
  beforeAll(async () => {
    await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    if ('Login' !== (await page.title())) {
      await page.evaluate(() => localStorage.clear());
      await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    }
  });

  test('타이틀 === Login', async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const title = await page.title();
    expect(title).toBe('Login');
  });

  test('로그인 성공 후 페이지 이동 확인', async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await login(page);
    const title = await page.title();
    expect(title).toBe('Notepad');
  });

  // test('비밀번호 불일치 Alert Message', async () => {
  //   await page.on('dialog', async (dialog) => {
  //     const message = dialog.message();
  //     expect(message).toBe('비밀번호가 틀립니다');
  //     await dialog.dismiss();
  //   });

  //   await page.type('#id', 'test1');
  //   await page.type('#pw', 'qwer');
  //   await page.click('.submit');
  // });
});
