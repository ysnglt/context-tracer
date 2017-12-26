# context-tracer : log context info, for your node apps

> :bookmark: Propagates a unique context ID throughout calls.
> Similar to Java MDC and the likes.

> For node 4.7 +.

## Usage

The following code :

```js
const tracer = require("context-tracer");

function writeLog(log) {
  logger.log(log + " - stack n°", tracer.get());
}

tracer.set(() => {
  // all operations called within the tracer will inherit a unique context ID
  // including their childs
  logger.log("1st call - stack n°", tracer.get());

  // called within the tracer, and inherits the ID
  writeLog("2nd call");
});

tracer.set(() => {
  writeLog("3rd call");
});
```

Will print :

```js
> 1st call : stack n°AAAA
> 2st call : stack n°AAAA
> 3rd call : stack n°BBBB
```

## Installation

`> npm install context-tracer`

## API

### tracer.set(callback)

* Creates a unique context ID
* provides a context-augmented callback :
  * all calls within the callback will have the same context ID
  * you only need to call the first function in the callback to propagate the context to its childs

```js
tracer.set(() => {
  // all operations called within the tracer will inherit a unique context ID
});
```

### tracer.get() ⇒ `string`

* Retrieves current context ID
* Returns a "no context" string if _set_ hasn't been called

```js
console.log("stack n°" + tracer.get());

> stack n°AAAA
```

## Local installation

This project is made using Typescript. To generate the transpiled javascript package, you need to run gulp :

`$ gulp`

You can run the full test suite with mocha :

`$ npm i && npm run test`
