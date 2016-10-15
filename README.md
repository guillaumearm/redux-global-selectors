# redux-with-selectors

a redux store enhancer for adding selectors inside the store.


provide a `withSelectors` function that take a schema of your selectors, a store and return a new enhanced store.

this will allow you to centralize all your selectors in the redux store, and call them by using `getState()`



## Installation
```
npm install --save guillaumearm/redux-with-selectors
```
(not published yet)

## Enhancer

##### withSelectors :: ({ selector: function }) -> store -> (store with enhanced getState)

```js
import { createStore } from 'redux';
import { withSelectors } from 'redux-with-selectors';
import rootReducer from './reducers';

const selectors = {
    fullName: state => `${state.contact.firstName} ${state.contact.lastName}`;
};

const initialState = {};
const store = createStore(rootReducer, initialState, withSelectors(selectors));
```

#### using applyMiddleware
```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { withSelectors } from 'redux-with-selectors';
import rootReducer from './reducers';
import * as selectors from './selectors';

const store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunk),
    withSelectors(selectors),
));
```
be __careful__ about the order of your store enhancers in __compose__.
(_applyMiddleware(...middlewares) is a store enhancer_)

if you inverse __compose__ arguments, the __getState__ given to your thunks will not being enhanced.

## getState
##### getState :: (selectorKey, ...additionalParameters) -> selectedValue
- call the corresponding selector given to __withSelectors__

##### getState :: () -> state
- traditional getState()

## using [reselect](https://github.com/reactjs/reselect)
you can use reselect with __redux-with-selectors__, but not with selector factory.
you should do something like this:
```js
// create store, enhance it, etc...
// [...]
import { makeGetDummy } from './selectors/factories/dummy';
const getDummy = makeGetDummy();
const value = getDummy(store.getState());
```

## using [React](https://facebook.github.io/react/)
(coming soon in `react-redux-with-selectors`).

## Contributing
If you like this module, you're welcome for contributing,
take a look at [CONTRIBUTING.md](https://github.com/guillaumearm/redux-with-selectors/blob/master/CONTRIBUTING.md)
