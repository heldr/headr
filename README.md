# headr
Adds header / banner info to a file. Nice to use as npm script :)

`npm install -g headr` (it may require Root privileges)

or for npm script:

`npm install --save-dev headr`


## Requirements

- Node.js 4+

## Usage
```CLI
$ headr input.js -o=output.js --version --homepage --license
```

Headr will inspect package.json using **name** and **description** as default, and then generates the following code:

```js
/**
 * headr - Add header to a file
 *
 * @version v0.0.1
 * @homepage http://heldr.com
 * @license MIT
 */

 your code
```

### Custom labels
```CLI
$ headr input.js -o=output.js --homepage="link"
```

```js
/**
 * headr - Add header to a file
 *
 * @link http://heldr.com
 */

 your code
```

### Tab spaces
```CLI
$ headr input.js -o=output.js --h-tab-spaces=4
```

## Pipe

```CLI
$ cat input.js | headr -o=output.js --version --homepage --license
```

or:

```CLI
$ cat input.js | headr --version --homepage --license > output.js
```
Just make sure to use a different output file in this case, otherwise `-o` replaces the file nicely :)

## License

MIT License
(c) [Helder Santana](http://heldr.com)
