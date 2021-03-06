# Closure Library Structs

[![Coverage Status](https://coveralls.io/repos/github/diegonvs/structs/badge.svg?branch=master)](https://coveralls.io/github/diegonvs/structs?branch=master)
![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/diegonvs/structs)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/diegonvs/structs)
![Synk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/diegonvs/structs)

The main idea of this repo is implement in modern Typescript Google's structs(goog.structs) Closure Library module(https://github.com/google/closure-library/tree/master/closure/goog/structs).

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

This project is completely based on Google's Closure Library project(https://github.com/google/closure-library).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
