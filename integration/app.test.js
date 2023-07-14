describe("App", () => {
  it("input testing", async () => {
    // APIs from jest-puppeteer
    // eslint-disable-next-line no-undef
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=todolist-input--input-example&viewMode=story"
    );

    // eslint-disable-next-line no-undef
    await page.waitForTimeout(2000);

    // eslint-disable-next-line no-undef
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
  it("completed task testing", async () => {
    // APIs from jest-puppeteer
    // eslint-disable-next-line no-undef
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=todolist-task--completed-task-example&viewMode=story"
    );

    // eslint-disable-next-line no-undef
    await page.waitForTimeout(3000);

    // eslint-disable-next-line no-undef
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
  it("active task testing", async () => {
    // APIs from jest-puppeteer
    // eslint-disable-next-line no-undef
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=todolist-task--active-task-example&viewMode=story"
    );

    // eslint-disable-next-line no-undef
    await page.waitForTimeout(3000);

    // eslint-disable-next-line no-undef
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
  it("buttons testing", async () => {
    // APIs from jest-puppeteer
    // eslint-disable-next-line no-undef
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=todolist-buttons--buttons-example&viewMode=story"
    );

    // eslint-disable-next-line no-undef
    await page.waitForTimeout(3000);

    // eslint-disable-next-line no-undef
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
