# Redux store design

- Rules of reducers

1. Must return any value beside undefined
2. Produces 'state', or data to be used inside of your app using only previous state and the actions(reducers are pure)
3. Must not return reach 'out of itself' to decide what value to return(reducers are pure)
4. Must not mutate its input 'state' argument (Redux does not give error on mutation, however, this return new state only if change is detected for change to be detected, mutations should not be done)

```javascript
// reduc/src/cobineReducers.js - github
let hasChanged = false;
const nextState = {};
for (let i = 0; i < finalReducerKeys.length; i++) {
  // iterationg over each reducer
  const key = finalReducerKeys[i];
  const reducer = finalReducers[key];
  const previousStateForKey = state[key];
  const nextStateForKey = reducer(previousStateForKey, action);
  if (typeof nextStateForKey === 'undefined') {
    // reducer cannot return undefined
    const errorMessage = getUndefinedStateErrorMessage(key, action);
    throw new Error(errorMessage);
  }
  nextState[key] = nextStateForKey;
  hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
  // the above is why we should not mutate the state
}
// return new state only if change is detected
return hasChanged ? nextState : state;
```

```javascript
// reducers/index.js
import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

export default combineReducers({
  posts: postsReducer
});
```

- separate file for each reducer
- about the reducer we are going to create
- Action Creator(fetchPosts), Action({type:'FETCH_POSTS', payload: response}), Store(Reducers-> postReducer - maintains an array of all fectched posts)

```javascript
// reducers/postsReducer.js
export default (state = [], action) => {
  if (action.type === 'FETCH_POSTS') {
    return action.payload;
  }
  return state;
};
```

- during redux app initilization each reducer is going to be called exactly one time
- second time a reducer is called it is called with the output of the previous call with an action obj to produce a new state

- Pure reducers, the reducer must take the previous state value and the action to generate the new state it should not return an API request or a file read or any other outside function calling

- Equality of arrays and objects done based on reference to memory not the content in it

* Mutations in JS

#### Safe State updates in reducers

- Removing element from an array BAD: state.pop() GOOD: state.filter(el => el!== 'hi')
- Adding element to an array BAD: state.push('hi') GOOD: [...state, 'hi']
- Replacing element in a array BAD: `state[0] = 'hi'` GOOD: `state.map(el => el === 'hi'?'bye':el)`
- Updating property in object BAD: state.name = 'Sam' GOOD: {...state, name:'SAM'}
- Adding property in object BAD: state.age = 30 GOOD: {...state, age:30}
- Removing property in object BAD: delete state.name GOOD: {...state, name:undefined} or \_.omit(state,'name')

#### reducer with switch syntax

```javascript
// reducers/postsReducer.js

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};
```

#### Dispatching correct values

```javascript
// components/PostList.js
import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};
export default connect(
  mapStateToProps,
  { fetchPosts: fetchPosts }
)(PostList);
```
