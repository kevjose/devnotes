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

#### Wiring up the provider

- combineReducers from redux imported and the reducers are combined and exported
- the keys of the combineReducers object are the same as that would show up in the state object

```javascript
// reducers/index.js
import { combineReducers } from 'redux';

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
// these keys are the ones that show up in the state object
export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
```

- Provider should be top most in the heirarchy

```javascript
// index.js
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

#### The connect function

- configuring connect with mapStateToProps
- state param in the mapStateToProps -> contains all the redux store data
- connect(SLICE_OF_REDUX_STORE_TO_BE_PASSED_AS_PROPS_CHUNKED_VIA_MAP_STATE_TO_PROPS,{ACTION_CREATORS_FOR_PROPS})(REACT_COMPONENT);
- above thing passed in the connect will be available on the props object of the REACT_COMPONENT passed to connect

```javascript
// SongList.js
import React from 'react';
import { connect } from 'react-redux';

class SongList extends React.Component {
  renderList() {
    return this.props.songs.map(song => {
      return <div key={song.title}>{song.title}</div>;
    });
  }
  render() {
    return <div>{this.renderList()}</div>;
  }
}
// state -> contains all the redux store data
const mapStateToProps = state => {
  return { songs: state.songs };
};
export default connect(mapStateToProps)(SongList);
```

```javascript
// components/App.js

import React from 'react';
import { selectSong } from '../actions';
import SongList from './SongList';

const App = () => {
  return (
    <div>
      <SongList />
    </div>
  );
};

export default App;
```

#### Building a list with redux data

- if we have to update rdux data call the action crator
- connect function also used to get actions to our components correctly
- any time data in the redux store is changed by the action creator and reducer the mapStateToProps re-runs with the new state (redux store object)

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component {
  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { songs: state.songs };
};

export default connect(
  mapStateToProps,
  { selectSong }
)(SongList);
```

#### why not call action creator directly rather that passing it to props via connect function ??

#### Redux not magic

- redux does not detect action creators being called
- redux does not detect automatically a function returning an object that is an action
- connect function is responsible for calling the dispatch function on the function it attaches to the props object -> hence pass action creator via conenct(mapStateToProps,{action_creators:action_creators})(COMPONENT)

```javascript
import React from 'react';
import { connect } from 'react-redux';

const SongDetail = props => {
  if (!props.song) {
    return <div>Select a song</div>;
  }

  return (
    <div>
      <h3>Details for:</h3>
      <p>
        Title: {props.song.title}
        <br />
        Duration: {props.song.duration}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
```
