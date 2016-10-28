# redux-with-selectors

a redux store enhancer adding selectors inside the store.


provide a `withSelectors` function that take a schema of your selectors, a store and return a new enhanced store.

this will allow you to centralize all your selectors in the redux store, and call them by using
```js
store.getState('yourSelector');
// or
store.getState(state => state.value);
```

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

```js
    store.getState('fullName'); // => will call the 'fullName' selector, given to the store.
```

##### getState :: (selector, ...additionalParameters) -> selectedValue
- call the first parameter as a selector, very useful for using with selector factory.
```js
store.getState(state => state.firstName); // => will call this selector
```

##### getState :: () -> state
- traditional getState()

## nested selectors
you can nest your selectors and call them with `store.getState('my.nested.selector')`

example of nested selector :
```js
const selectors = {
    my: { nested: { selector: state => state } },
};
```

## using [reselect](https://github.com/reactjs/reselect)
you can use __redux-with-selectors__ with __reselect__.

but if you want to use it with selectors factories,
you should do something like this:
```js
// create store, enhance it, etc...
// [...]
import { makeGetDummy } from './selectors/factories/dummy';
const getDummy = makeGetDummy();
const value = store.getState(getDummy);
```

## using [React](https://facebook.github.io/react/)
(coming soon with `react-redux-with-selectors`).

## Contributing
If you like this module, you're welcome for contributing,
take a look at [CONTRIBUTING.md](https://github.com/guillaumearm/redux-with-selectors/blob/master/CONTRIBUTING.md)
