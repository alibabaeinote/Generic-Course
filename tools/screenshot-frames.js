const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1440,height:1000}, deviceScaleFactor:2, colorScheme:'light', locale:'fa-IR' });
  await p.goto('file://' + process.cwd() + '/shot-src.html', { waitUntil:'networkidle', timeout:60000 });
  try { await p.evaluate(() => document.fonts.ready); } catch(e){}
  await p.waitForTimeout(1800);
  await p.screenshot({ path:'premium-hero.png' });          // hero as loaded
  await p.evaluate(() => window.scrollTo(0, document.querySelector('#s-honest').offsetTop + 80));
  await p.waitForTimeout(1400);
  await p.screenshot({ path:'premium-moment.png' });
  await p.evaluate(() => window.scrollTo(0, document.querySelector('#s-practice').offsetTop + 200));
  await p.waitForTimeout(1400);
  await p.screenshot({ path:'premium-practice.png' });
  await b.close();
})();
