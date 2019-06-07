# Blogs app

- App goals
- absolutley understand purpose of reducers
- making API calls with redux
- understand redux-thunk

- `npm install --save redux react-redux redux-thunk axios`
- redux, the redux library
- react-redux, integration layer between react and redux
- axios, helps in making network requests
- redux-thunk, middleware to help us make request in redux application

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

```javascript
// components/App.js

import React from 'react';
const App = () => {
  return <div>App</div>;
};

export default App;
```

#### Tricking redux with dummy reducers

- combineReducers expects a key with a function value

```javascript
// reducers/index.js
// dummy reducer
import { combineReducers } from 'redux';
export default combineReducers({
  repalceMe: () => 'hi there'
});
```

#### PostList components setup

```javascript
import React from 'react';

class PostList extends React.Component {
  render() {
    return <div>PostList</div>;
  }
}

export default PostList;
```

```javascript
// components/App.js

import React from 'react';
import PostList from './PostList';

const App = () => {
  return (
    <div>
      <PostList />
    </div>
  );
};

export default App;
```

#### How to fetch data in a Redux App

- general data loading with redux
- component gets rendered on the screen
- components 'componentDidMount' lifecycle method gets called
- we call action creator from the lifecycle method
- action creator run the code to make an API request
- API responds with data
- action creator return a action type with the data on its payload property
- some reducer sees the action and returns the data off the payload
- because we generated a new state object, redux/react-redux causes the react app to be re-rendered

* components are generally responsible for fetching data they need by calling an action creator
* Action creators are responsible for making API requests
* the above is where redux thunk comes into play
* we get the fetched data into a component by generating a new state in our redux store, then getting that into our component via mapStateToProps

#### Wiring up an action creator

```javascript
// action/index.js
export const fetchPosts = () => {
  return {
    type: 'FETCH_POST'
  };
};
```

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return <div>PostList</div>;
  }
}

export default connect(
  null,
  { fetchPosts: fetchPosts }
)(PostList);
```

#### Making a requests from a action creator

```javascript
// api/jsonPlaceholder.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
```

```javascript
// action/index.js
import jsonPlaceholder from '../api/jsonPlaceholder';
export const fetchPosts = async () => {
  // Bad approach !!!! -> this breaks rules of redux -> actions must be plain object.
  // Use custom middleware for async actions
  const response = await jsonPlaceholder.get('/posts');
  return {
    type: 'FETCH_POST',
    payload: response
  };
};
```

#### understanding Async action creators

- what is wrog with fetchPosts

1. action creators must return a plain JS object with a type property, optionally payload, we are not

- when fetchPosts is transpiled it does not return a plain JS, since we have the async await syntax here, we are returned with the API response object, this is sent to the reducer, reducer sees no plain JS object with type property hence the error

2. by the time action gets to a reducer, we wont have fetched our data

- if we do not use async await we will be getting a promise object rather than a the API result (However now we will be returning a plain JS object)

#### Middlewares in redux

- synchronous action creators, instantly return an action with data ready to go
- asynchronous action creators, takes some time for it to get its data ready to go

- Middlewares in Redux

1. functions that gets called with every action we dispatch
2. has ability to STOP, MODIFY, mess around with actions
3. many opensource middlewares exists
4. popular use -> dealing with async actions
5. we are going to use redux-thunk for the same

#### Behind the scenes with Redux-thunk

- Normal Rules

1. Action creator must return action object
2. Action must have type property
3. Action can optionally have a payload

- With Redux thunk

1. Action creators can return action objects or action creators can return functions
2. if an action object gets returned it must have type property
3. if an action objec gets returned it can have an optional payload property

- ActionCreator -> Action(either object or function) -> pass it on to the dipatch function -> this ends up into redux thunk -> is the object pass a plain JS or a function ? if object -> passes this on it to the different reducers , if function -> great, i am going to call you with the dispatch and getState function, Go ahead and dispatch actions at your leisure, -> function invoked with dispatch, , we wait for request to finish, Request complete, dispatch action manually, when we dispatch an action we get a new action (now a plain JS object), this flows back to the dispatch and now this time since its plain JS it is passed to the reducers

- redux github -> src/index.js

#### Redux thunk syntax

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```javascript
// actions/index.js

import jsonPlaceholder from '../api/jsonPlaceholder';
export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({
      type: 'FETCH_POST',
      payload: response
    });
  };
};
```

- shorter syntax

```javascript
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
```
