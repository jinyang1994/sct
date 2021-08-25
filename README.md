<h1 align="center">Smart Contract Toolkit</h1>

<div align="center">

Help you better learn, develop and debug Smart Contract.

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url] [![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/sct?style=flat-square
[npm-url]: http://npmjs.org/package/sct
[download-image]: https://img.shields.io/npm/dm/sct?style=flat-square
[download-url]: https://npmjs.org/package/sct
[david-image]: https://img.shields.io/david/jinyang1994/sct?style=flat-square
[david-url]: https://david-dm.org/jinyang1994/sct
[david-dev-image]: https://img.shields.io/david/dev/jinyang1994/sct?style=flat-square
[david-dev-url]: https://david-dm.org/jinyang1994/sct?type=dev
[license-image]: https://img.shields.io/npm/l/sct?style=flat-square
[license-url]: https://en.wikipedia.org/wiki/MIT_License

</div>

## ✨ Features

- ⚙️ Support CLI to quickly view output
- 📦 Support import library to your project
- 🛡️ Support Typescript

## 📦 Install

Using npm:

```bash
$ npm install sct -g # If you use CLI feautre
$ npm install sct --save
```

Or, using yarn:

```bash
$ yarn global add sct
$ yarn add sct
```

## 🔨 Usage

### ⚙️ Using CLI

```
$ sct convert

? What do you want to run? stringToBytes
? Provide a data for function Welcome to use sct
? Do you need extra args? No
Convert function "stringToBytes" output:
0x57656c636f6d6520746f2075736520736374
```

Or, run specify function

```
$ sct convert -r stringToBytes

? Provide a data for function Welcome to use sct
? Do you need extra args? No
Convert function "stringToBytes" output:
0x57656c636f6d6520746f2075736520736374
```

See more, please you use `sct -h`

### 📦 Using library

```javascript
import { convert } from 'sct'
// es5
// const { convert } = require('sct')

convert.stringToBytes('Welcome to use sct') // 0x57656c636f6d6520746f2075736520736374
```

Or, import on demand

```javascript
import { stringToBytes } from 'sct/lib/convert'
// es5
// const { stringToBytes } = require('sct/lib/convert')

stringToBytes('Welcome to use sct') // 0x57656c636f6d6520746f2075736520736374
```

## 📖 Documentation

The full documentation is a available in [here](./docs.md).

## ✂️ Development

### Folders

```
├── bin           # CLI code
├── src           # source code
├── test          # test code
├── docs.md       # documentation in markdown
└── package.json
```

### Local development

`Fork` and `git clone`

```base
$ npm install
$ npm run dev
$ npm link
$ sct convert # Or other
```

Then check output

### Test Case and Lint

#### Lint source code

```
$ npm run lint
```

#### Run test case

```
$ npm test
```

## 📢 About the version number

Because package name `sct` was transferred to me by NPM team, there was already version `2.0.0` before, **and the previous version has nothing to do with this open source project**, so the package version started from `3.0.0`.
