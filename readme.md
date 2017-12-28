# context-tracer : log context info, for your node apps

Propagates a unique context ID throughout calls. Similar to Java MDC and the likes.

> For node 6+.

## Usage

Returns a callback, augmented with a unique context UUID. Within this callback, all operations (and their childs) will inherit the unique ID.

```js
tracer.set(() => {
  // all nested calls have now access to a unique context ID
  console.log(tracer.get()); // you can now log it
});
```

## Example

The following code :

```js
const tracer = require("context-tracer");

function callThings() {
  nested();
}

function nested() {
  console.log("nested call - stack n°", tracer.get());
}

tracer.set(() => {
  console.log("first call - stack n°", tracer.get());

  // called within the tracer, and inherits the ID
  callThings();
});
```

Will print :

```js
> first call : stack n°AAAA
> nested call : stack n°AAAA
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

You can nest context augments : the new context ID will override the previous one, only for its callback operations.

### tracer.get() ⇒ `string`

* Retrieves current context ID
* Returns a "no context" string if _set_ hasn't been called

```js
console.log("stack n°" + tracer.get());

> stack n°AAAA
```

## :warning: Node 6-7 users

While this package supports node 6-7, the underlying architecture is considered experimental for these versions. Read more [here](https://www.npmjs.com/package/cls-hooked).

## Local installation

This project is made using Typescript. To generate the transpiled javascript package, you need to run gulp :

`$ gulp`

You can run the full test suite with mocha :

`$ npm i && npm run test`
