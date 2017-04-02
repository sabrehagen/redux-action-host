# redux-action-host
Redux middleware to add the hostname of the originating computer to action metadata.

[![npm version](https://img.shields.io/npm/v/redux-action-host.svg?style=flat-square)](https://www.npmjs.com/package/redux-action-host)

```bash
npm install --save redux-action-host
```

## Motivation

When writing networked applications that replay actions against multiple redux stores, it is desireable to know which host the action originated on.

## Usage

```js
import { createStore, applyMiddleware } from 'redux';
import actionHost from 'redux-action-host';
import reducers from './reducers';
import actionTypes from './constants/actionTypes';

const store = createStore(reducers, applyMiddleware(actionHost()));
```

All actions will now be dispatched with the hostname of the originating computer on the action meta.

```js
{
  type: 'ACTION_TYPE',
  meta: {
    hostname: 'ubuntu'
  }
}
```

## Advanced Usage

The hostname of the originating computer is retreived via the [`os` module](https://nodejs.org/api/os.html) when in node.js.  Do remove this dependency when using the library in the browser, supply the hostname to be used as the first parameter to the middleware.

```js
const store = createStore(reducers, applyMiddleware(actionHost('ubuntu')));
```

If the middleware is not invoked with a hostname when used in the browser, a random hostname will be generated.

```js
{
  type: 'ACTION_TYPE',
  meta: {
    hostname: 'browser-0f11ce'
  }
}
```
