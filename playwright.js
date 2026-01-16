const {
	chromium,
} = require('playwright');

const {
	writeFile,
} = require('node:fs/promises');

const {
	pathToFileURL,
} = require('node:url');

(async () => {
	/*
	await chromium.connect('ws://playwright:3000/')
	*/
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.coverage.startJSCoverage();
	await page.goto(`http://tests:80/`)
	await page.click('#qunit-userAgent')
	await new Promise((yup) => {
		page.on('console', (e) => {
			if ('Finished running tests' === e.text()) {
				yup()
			}
		})
	});
	const coverage = await page.coverage.stopJSCoverage();
	await writeFile(
		'./coverage/playwright/tmp/playwright.json',
		JSON.stringify(
			{
				result: coverage
					.filter((
						maybe,
					) => maybe.url.startsWith('http://tests/benchmark.js?'))
					.map((e) => {
						e.url = pathToFileURL(__dirname + '/benchmark.js')

						return e;
					}),
			},
			null,
			'\t'
		)
	)
	await browser.close();
	process.exit(0)
})();
