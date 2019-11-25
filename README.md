# native-querystring

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

Node’s querystring module implemented using the built-in [`URLSeachParams`
API][mdn].

**:warning: Differences with original `querystring` module**

-   Space and its percent-encoded value (`%20`) is replaced with plus-sign `+`
-   Fourth argument for `parse` and `stringify` is not supported

If you want to use Node’s `url` module based on the URL API, consider using
[native-url][native-url] module.

## Install

```sh
npm install native-querystring --save
```

## Usage

```js
import * as qs from 'querystring';

qs.parse('becky=1&jackson=brody&jackson=winnie'); // { becky: '1', jackson: ['brody', 'winnie'] }
qs.stringify({ becky: 1, gracie: ['rex', 'milo'], shadow: '' }); // becky=1&gracie=rex&gracie=milo&shadow=
```

If you want to alias `querystring` module to this module, refer to
[Webpack][webpack-alias] and [Rollup][rollup-alias] documentation on aliasing
modules (or, [native-url alias explanation][native-url-alias]).

## API

### parse(input, separator, equals)

Returns: `Object`

Parses a URL query string into a collection of key and value pairs.

| Property    | Type     | Default | Description                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------- |
| `input`     | `string` |         | The URL query string to parse.                                         |
| `separator` | `string` | `&`     | The substring used to delimit key and value pairs in the query string. |
| `equals`    | `string` | `=`     | The substring used to delimit keys and values in the query string.     |

### stringify(input, separator, equals)

Returns: `string`

Produces a URL query string from a given obj by iterating through the object's
"own properties".

| Property    | Type     | Default | Description                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------- |
| `input`     | `Object` |         | The object to serialize into a URL query string.                       |
| `separator` | `string` | `&`     | The substring used to delimit key and value pairs in the query string. |
| `equals`    | `string` | `=`     | The substring used to delimit keys and values in the query string.     |

### escape(input)

Returns: `string`

Performs URL percent-encoding on the given input in a manner that is optimized
for the specific requirements of URL query strings.

#### input

Type: `string`

### unescape(input)

Returns: `string`

Performs decoding of URL percent-encoded characters on the given input.

#### input

Type: `string`

## Browser support

Tested in IE9+ and all modern browsers.

It relies on the DOM [`URLSearchParams` API][mdn] to work. For older browsers
that don’t support the `URLSearchParams` API, a [polyfill][polyfill] is
available.

## Test

Test suite is taken from [Node core][node-tests] and
[`querystring-es3` module][querystring-es3-tests] to cover all native querystring test
cases.

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/native-querystring
[ci-img]: https://travis-ci.com/niksy/native-querystring.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=Vk9RQ1VYTlRpQ3YzU0FtdENuajhCRFA1SzFMZnVkbWxtMzBuT1VjeWQ1Yz0tLWVaOGxkZmFkY2I3Vml4azNQU0x4ZVE9PQ==--a6c932cdc306cb44c5c4a67f4678965615985e7c
[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[polyfill]: https://github.com/ungap/url-search-params
[native-url]: https://github.com/GoogleChromeLabs/native-url
[webpack-alias]: https://webpack.js.org/configuration/resolve/#resolvealias
[rollup-alias]: https://github.com/rollup/plugins/tree/master/packages/alias
[native-url-alias]: https://github.com/GoogleChromeLabs/native-url#usage
[node-tests]: https://github.com/nodejs/node/tree/v13.2.0/test/parallel
[querystring-es3-tests]: https://github.com/SpainTrain/querystring-es3/tree/master/test

<!-- prettier-ignore-end -->
