const {
  chromium,
  firefox,
  webkit,
} = require('playwright');

let browsers = {
  chromium: [
    'Chromium',
    chromium,
  ],
  firefox: [
    'Firefox',
    firefox,
  ],
  webkit: [
    'WebKit',
    webkit,
  ]
};

const specified_browser = (process.argv.find((maybe) => maybe.startsWith('--browser=')) || '').split('=')[1] || undefined;

if (specified_browser && specified_browser in browsers) {
  browsers = {
    [specified_browser]: browsers[specified_browser],
  };
}

const {
  writeFile,
  readFile,
} = require('node:fs/promises');

const {
  pathToFileURL,
} = require('node:url');

  const baseUrl = process.argv.find((maybe) => maybe.startsWith('http://')) || 'http://tests:80'

  if (
    baseUrl !== 'http://tests:80'
    && baseUrl !== 'http://localhost:8003'
  ) {
    throw new Error(`Unsupported URL specified: ${baseUrl}`)
  }

/**
 * @param {import('playwright').Browser} browser
 */
async function maybeWithCoverage(browser) {
  const page = await browser.newPage();

  const hasCoverage = browser === browsers?.chromium;

  let coverage;

  if (hasCoverage) {
    await page.coverage.startJSCoverage();
  }

  for (const [label, url] of [
    ['with require', baseUrl],
    ['without require', `${baseUrl}?norequire=true`],
  ]) {
    console.log(`Running ${label}`);

    await page.goto(url)

    await page.click('#qunit-userAgent')
    await new Promise((yup) => {
      page.on('console', (e) => {
        if ('Finished running tests' === e.text()) {
          yup()
        }
      })
    });
  }

  if (hasCoverage) {
    coverage = await page.coverage.stopJSCoverage();
  }

  console.log('closing page');

  await page.close();

  return coverage;
}

(async () => {
  const versions = [];
  for (const [label, [name, type]] of Object.entries(browsers)) {
    const browser = await type.launch();
    const version = `${name} (${browser.version()})`;
    versions.push(version);
    console.log(`Running tests in ${version}`);
    const start = performance.now();
    const coverage = await maybeWithCoverage(browser);
    console.log(`Tests in ${version} took ${performance.now() - start}`);

    if (coverage) {
      await writeFile(
        `./coverage/playwright/tmp/playwright-${label}.json`,
        JSON.stringify(
          {
            result: coverage
              .filter((
                maybe,
              ) => maybe.url.startsWith(`${baseUrl.replace(/:80$/, '')}/benchmark.js?`))
              .map((e) => {
                e.url = pathToFileURL(__dirname + '/benchmark.js')

                return e;
              }),
          },
          null,
          '\t'
        )
      )
    }
    console.log('closing');
    await browser.close();
  }

  const readme = (await readFile(`${__dirname}/README.md`)).toString();
  const Makefile = (await readFile(`${__dirname}/Makefile`)).toString();

  const versions_from_Makefile = (
    /VERSIONS =((?: \d+)+)/.exec(Makefile) || ['', '']
  )[1]
    .trim()
    .split(' ')
    .map((e) => parseInt(e, 10))
    .sort();

  const nodeVersions = versions_from_Makefile.length < 1 ? [] : (
    versions_from_Makefile
      .reduce(
        (was, is) => {
          const [, end] = was[was.length - 1];

          if (is === end + 1) {
            was[was.length - 1][1] = is;
          } else if (is > end) {
            was.push([is, is]);
          }

          return was;
        },
        [
          [
            versions_from_Makefile[0],
            versions_from_Makefile[0],
          ],
        ],
      )
      .map(([start, end]) => start === end ? start : `${start}-${end}`)
      .join(', ')
  );

  const version_info = `Tested in ${
    versions.join(', ')
  }, Node (${
    nodeVersions
  })`;

  await writeFile(
    `${__dirname}/README.md`,
    readme.replace(
      /<!-- #region Tested In -->\n(Tested in.+)\n<!-- #endregion Tested In -->/,
      `
          <!-- #region Tested In -->
          Tested in ${version_info}
          <!-- #endregion Tested In -->
        `.replace(/^\s+/gm, '').trim()
    )
  );

  process.exit(0)
})();
