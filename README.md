# redux-global-selectors

a redux store enhancer adding selectors inside the store.


provide a `withGlobalSelectors` function that take a schema of your selectors, a store and return a new enhanced store.

this will allow you to centralize all your selectors in the redux store, and call them by using
```js
store.getState('yourSelector');
// or
store.getState(state => state.value);
```

## Installation
```
npm install --save guillaumearm/redux-global-selectors
```
(not published yet)

## Enhancer

##### withGlobalSelectors :: ({ selector: function }) -> store -> (store with enhanced getState)

```js
import { createStore } from 'redux';
import { withGlobalSelectors } from 'redux-global-selectors';
import rootReducer from './reducers';

const selectors = {
    fullName: state => `${state.contact.firstName} ${state.contact.lastName}`;
};

const initialState = {};
const store = createStore(rootReducer, initialState, withGlobalSelectors(selectors));
```

#### using applyMiddleware
```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { withGlobalSelectors } from 'redux-global-selectors';
import rootReducer from './reducers';
import * as selectors from './selectors';

const store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunk),
    withGlobalSelectors(selectors),
));
```
be __careful__ about the order of your store enhancers in __compose__.
(_applyMiddleware(...middlewares) is a store enhancer_)

if you inverse __compose__ arguments, the __getState__ given to your thunks will not being enhanced.

## getState
##### getState :: (selectorKey, ...additionalParameters) -> selectedValue
- call the corresponding selector given to __withGlobalSelectors__

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
you can use __redux-global-selectors__ with __reselect__.

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
Please see [react-redux-global-selectors](https://github.com/guillaumearm/redux-global-selectors/tree/master/packages/react-redux-global-selectors).

## Contributing
If you like this module, you're welcome for contributing,
take a look at [CONTRIBUTING.md](https://github.com/guillaumearm/redux-global-selectors/blob/master/CONTRIBUTING.md)
