import {
  writeFile,
} from 'node:fs/promises'

import {
  execSync,
} from 'node:child_process'

import pkg from './package.json' with {type: 'json'}

await writeFile(
  `${import.meta.dirname}/version.json`,
  JSON.stringify(
    {
      version: `${pkg.name}${
        (
          'version' in pkg
          && 'string' === typeof pkg.version
        )
          ? `@${pkg.version}`
          : `#${execSync('git rev-parse --short HEAD').toString().trim()}`
      }`,
    },
    null,
    '\t',
  ),
)
