const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'fa-IR',
  });
  await page.goto('file://' + process.cwd() + '/shot-src.html', { waitUntil: 'networkidle', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch (e) {}
  // open every accordion so nothing is cut off, and force reveals
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    document.querySelectorAll('.rv').forEach(e => e.classList.add('in'));
    const s = document.getElementById('sticky');
    if (s) s.remove();
  });
  await page.waitForTimeout(1200);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('page height:', h);
  await page.screenshot({ path: 'landing-full.png', fullPage: true });
  await browser.close();
})();
