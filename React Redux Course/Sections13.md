# Redux with React

- songs project, intro to react with redux

- components, 1. SongList, 2. SongDetail
- react, redux, react-redux(Get react and redux to work together)
- `npm install --save redux react-redux`

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.querySelector('#root');
)
```

```javascript
// components/App.js

import React from 'react';

const App = () => {
  return <div>App</div>;
};

export default App;
```

#### Design of Redux App

- all the component state level data is now usually going to reside in the global redux store.
- App without redux
- - App(List of Songs, Selected Song)
- - App ->props(List of Songs,onSongSelect callback)-> SongList
- - App ->props(Selected Song)-> SongDetail

- App with redux
- - React Side components
- - - App, App->SongList, App->SongDetail
- - Redux Side
- - - Redux -> Reducers (Song list reducer, Selected song reducer), Action Creators (select song)

#### How react-Redux works

- Provider(provides info to other components) and Connect provided by React-Redux
- the redux store is passed on to the provider as a prop , the provider sits at the top even above <App />, provider now has a eternal reference to the store object
- now below the App component the SongList components need access to the list of songs from the store, we now create instance of the connect component that will be placed above the SongList component for communication with the Provider , the communication is not via the props system, the communication is via the context system, this allows parent to communicate to the child directly even if there are children between in the heirarchy
- Connect function allows to pass data from provider to child component, it also passes the action creators to be passed to the child [this replaces the store.dispatch way of doing things in the redux world]

#### Redux Project structure

- / src
- - /actions, contains the files related to action creators
- - /components, files related to the components
- - /reducers, files relates to reducers
- - /injex.js, sets up both the react and redux side of app

* actions
* - index.js, has the selectSong action creator

#### Named vs default exports

```javascript
// actions/index.js
// Action creator
// Named export
export const selectSong = song => {
  // return an action
  return {
    type: 'SONG_SELECTED',
    payload: song
  };
};
```

```javascript
// components/App.js

import React from 'react';
import { selectSong } from '../actions';

const App = () => {
  return <div>App</div>;
};

export default App;
```

#### Building Reducers

```javascript
// reducers/index.js

const songsReducer = () => {
  return [
    { title: 'No Scrubs', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Star', duration: '3:15' },
    { title: 'I Want it That Way', duration: '1:45' }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }

  return selectedSong;
};
```
