const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", {timeout:60000}, async function (string) {
  return await this.page.goto("http://qamid.tmweb.ru/client/index.php");
});

When("user choose date {string}", { timeout: 60000 }, async function (string) {
  return await clickElement(this.page, "a:nth-child(6)");
});

 When("user choose time {string}", { timeout: 60000 }, async function (string) {
   return await clickElement(
     this.page,
     ".movie-seances__time[href='#'][data-seance-id='217']"
   );
 });

When("user choose plase {string}", { timeout: 60000 }, async function (string) {
  return await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(4)"
  );
});

When(
  "user choose plase another {string}",
  { timeout: 60000 },
  async function (string) {
    return await clickElement(this.page, "div:nth-child(5) span:nth-child(5)");
  }
);

When(
  "user click by {string} button",
  { timeout: 60000 },
  async function (string) {
    return await clickElement(this.page, ".acceptin-button");
  }
);

When(
  "user choose plase {string} untouchable",
  { timeout: 60000 },
  async function (string) {
    return await clickElement(
      this.page,
      ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
    );
  }
);

Then("user see {string}", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  const expected = await string;
  expect(actual).contain(expected);
});

Then("user see another {string}", async function (string) {
  const actual = await getText(
    this.page,
    "body > main:nth-child(2) > section:nth-child(1) > div:nth-child(2) > p:nth-child(8)"
  );
  const expected = await string;
  expect(actual).contain(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});

