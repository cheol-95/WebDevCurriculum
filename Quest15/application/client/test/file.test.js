describe('파일 API', () => {
  const dialogHandler = async (dialog) => {
    const message = dialog.message();
    message === '파일 이름을 입력하세요'
      ? await dialog.accept(newFileName)
      : message === '저장할 파일 이름을 입력하세요'
      ? await dialog.accept(changeFileName)
      : await dialog.accept();
  };

  beforeAll(async () => {
    await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    if ('Login' !== (await page.title())) {
      await page.evaluate(() => localStorage.clear());
      await page.goto(LoginURL, { waitUntil: 'domcontentloaded' });
    }

    await login(page);
    page.on('dialog', dialogHandler);
  });

  afterAll(() => page.removeListener('dialog', dialogHandler));

  test('파일 생성', async () => {
    await page.click('#newFile');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const newFileInExplorer = await page.$eval('#file_' + newFileName, (ele) => ele.textContent);
    expect(newFileInExplorer.toString().trim()).toBe(newFileName);
  });

  test('파일 저장', async () => {
    const saveFileInExplorer = await page.$('#file_' + newFileName);
    await saveFileInExplorer.click({ button: 'right' });
    await page.type('#editBox', saveText);
    await page.click('#저장');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const editBox = await page.$eval('#editBox', (ele) => ele.textContent);
    expect(editBox).toBe(saveText);
  });

  test('다른 이름으로 파일 저장', async () => {
    const newFileInExplorer = await page.$('#file_' + newFileName);
    await newFileInExplorer.click({
      button: 'right',
    });
    await page.click('#다른이름으로저장');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const changeFileInExplorer = await page.$eval(
      '#file_' + changeFileName,
      (ele) => ele.textContent
    );
    expect(changeFileInExplorer.toString().trim()).toBe(changeFileName);
  });

  test('파일 삭제', async () => {
    const deleteFileInExplorer = await page.$('#file_' + changeFileName);
    await deleteFileInExplorer.click({
      button: 'right',
    });
    await page.click('#삭제');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const emptyFile = await page.$('#file_' + changeFileName);
    expect(emptyFile).toBe(null);
  });
});
