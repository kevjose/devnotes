# Structuring Apps with Class-Based Components

#### class based components

- a component is a function or a class
- functional components, good for simple content
- class components, good for everything else (handle user ineraction, api requests etc.)
- Benefits of class components, easier code organization, can use 'state' - another react system, easier to handle input, understands life cycle events, easier to do things when app first starts

#### Seasons App Overview

- if user is , in the northern hemisphere and between october and march - burr its chilly
- if use is, in the northern hemisphere and between March and October - Let's hit the beach
- App Challenges, Need to get the users physical location
- Need to determine the current month
- Need to change the text and styling based in the location and month

#### Scafolding the App

- use the semantic-ui.min.css cdn > put this in public/index.html#head.link
- Components required, App, has the code to determine the location and month, SeasonDisplay, Shows different text/icons based on the props.

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div>Hi There!</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));

// SeasonDisplay.js
import React from 'react';
const SeasonDisplay = () => {
  return <div>Season Display </div>;
};
export default SeasonDisplay;
```

#### Getting the Users Physical Location

- use browsers geolocation API

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  window.navigator.geolocation.getCurrentPosition(
    (position) => {console.log(position)} // success callback
    (err) => {console.log(err)} // failure callback
  );
  return <div>Hi There!</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));

// SeasonDisplay.js
import React from 'react';
const SeasonDisplay = () => {
  return <div>Season Display </div>;
};
export default SeasonDisplay;
```

#### Resetting Geolocation Preferences

- if user deny the location detection, then we get the error callback
- reset the location request via the info icon on the browser url placeholder

#### Handling Async Operations and Functional Components

- aim, to show the latitute via the position param from the geolocation api call
- Appication Timeline: JS file loaded by browser, App component gets created, We call the geolocation service, App returns JSX, get rendered to the page as HTML, ---- , we get the result of the geolocation , asynchronously
- with functional component we dont have a way of waiting until the success callback happens, and then stick the position into the JSX, functional component does not have the capability, solution is class based component with react state system

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  window.navigator.geolocation.getCurrentPosition(
    (position) => {console.log(position)} // success callback
    (err) => {console.log(err)} // failure callback
  );
  return <div>Latitude: </div>; // problems faced via functional components

};

ReactDOM.render(<App />, document.querySelector('#root'));

// SeasonDisplay.js
import React from 'react';
const SeasonDisplay = () => {
  return <div>Season Display </div>;
};
export default SeasonDisplay;
```

#### Refactoring from functional to class components

- Tell the component to re-render itself with the new information
- Rules of class based components
- Must be a JS class, must extend React.Component, must define a render method that return some amount of JSX

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {console.log(position)} // success callback
      (err) => {console.log(err)} // failure callback
    );
    return <div>Latitute: </div>;// this will still be empty, we will have to use the state system to get the desired output
  }
}
```
