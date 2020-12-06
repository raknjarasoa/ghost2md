# ghost2md

> **ghost2md** is a small node script to retrieve **content** from your [Ghost](https://github.com/TryGhost/Ghost) headless CMS.

## Requirements

- Node 10 or higher
- Ghost content API

## Usage

1. Install plugin as dev dependency

```bash
npm i -D ghost2md # or yarn add -D ghost2md
```

2. Set own .env variable. Eg:
```bash
# .env
GHOST_API_URL=https://demo.ghost.io
GHOST_CONTENT_API_KEY=22444f78447824223cefc48062
```

2. Setup Scully config file named scully< projectName>.config.ts

```bash
npx ghost2md
```
## Powered by [TSDX](https://tsdx.io/)

### Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).