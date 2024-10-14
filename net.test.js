const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Film tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("The first happy test", async () => {
    await clickElement(page, "a:nth-child(6)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(4)"
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    const expected = "Получить код бронирования";
    await expect(actual).toContain(expected);
  });

  test("The second happy test", async () => {
    await clickElement(page, "a:nth-child(6)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(page, "div:nth-child(5) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(
      page,
      "body > main:nth-child(2) > section:nth-child(1) > div:nth-child(2) > p:nth-child(8)"
    );
    const expected = "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.";
    await expect(actual).toContain(expected);
  });

  test("The sad test", async () => {
    await clickElement(page, "a:nth-child(6)");
    await clickElement(
       page,
       ".movie-seances__time[href='#'][data-seance-id='217']"
     );
    await clickElement(
      page,
      ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
    );
     expect(
       String(
         await page.$eval("button", (button) => {
           return button.disabled;
         })
       )
     ).toContain("true");
  });

});
