describe('로그인 페이지', () => {
  beforeAll(async () => {
    await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    if ('Login' !== (await page.title())) {
      await page.evaluate(() => localStorage.clear());
      await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    }
  });

  test('타이틀 === Login', async () => {
    await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    await new Promise((resolve) => setTimeout(resolve, 400));
    const title = await page.title();
    expect(title).toBe('Login');
  });

  test('로그인 성공 후 페이지 이동 확인', async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await login(page);
    const title = await page.title();
    expect(title).toBe('Notepad');
  });
});
