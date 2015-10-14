# headr
Adds header / banner info to a file. Requires node.js 4+.

## CLIENT
`npm install -g headr` (it may require Root privileges)

### Usage
```CLI
$ headr file.js --version --homepage --license > fileOutput.js
```
Headr will inspect package.json and generate the following code, name and description are default.
```js
/**
 * headr - Add header to a file
 *
 * @version 0.0.1
 * @homepage http://heldr.com
 * @license MIT
 */

 your code
```

#### Custom labels
```CLI
$ headr file.js --homepage="link" > fileOutput.js
```

```js
/**
 * headr - Add header to a file
 *
 * @link http://heldr.com
 */

 your code
```

#### tab spaces
```CLI
$ headr file.js --h-tab-spaces=4 > fileOutput.js
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)
