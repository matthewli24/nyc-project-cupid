import { Browser, BrowserContext, chromium, Page } from 'playwright';

describe('Launch Browser', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test('Open City Clerk Website Marriage Ceremony', async () => {
    await page.goto('https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony');
    expect(await page.title()).toBe('Marriage Ceremony');
  })

  test('Cycle Through Locations', async () => {
    // Go to https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony
    await page.goto('https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony');
    // Click [placeholder="Select Office Location"]
    await page.click('[placeholder="Select Office Location"]');
    // Click span:has-text("Manhattan Office")
    await page.click('span:has-text("Manhattan Office")');
    // Click [placeholder="Select Office Location"]
    await page.click('[placeholder="Select Office Location"]');
    // Click span:has-text("Brooklyn Office")
    await page.click('span:has-text("Brooklyn Office")');
    // Click [placeholder="Select Office Location"]
    await page.click('[placeholder="Select Office Location"]');
    // Click lightning-base-combobox-item[role="option"]:has-text("Queens Office")
    await page.click('lightning-base-combobox-item[role="option"]:has-text("Queens Office")');
  })
})
