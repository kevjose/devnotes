# Understanding lifecycle methods

- component lifecycle methods are methods that can be optionally defined within our class based component, if defined these will be called automatically at certain triggers
- constructor
- render (not optional, we have to define this unlike other methods)
- after render, content visible on screen
- componentDidMount
- sit and wait for updates
- componentDidUpdate
- sit and wait until this component is no longer shown
- componentWillUnmount (used for cleanup)
- any time component updates the render methods re-renders

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { lat:null, errorMessage:'' };
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message })
      }
    );
  }
  componentDidMount(){
    console.log('Component rendered to screen');
  }
  componentDidUpdate(){
    console.log('it re-rendered');
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading...</div>
  }
}
```

#### Why lifecycle methods

- constructor, good place to do one-time setup
- render, avoid doing anything other than rendering JSX
- componentDidMount, good palce to do data loading one time, can do in constructor but for cleaner separation do one time data loading is done in componentDidMount
- componentDidUpdate, good place to do more data loading when state or props change, multiple data loading
- componentWillUnmount, god place to do cleanup, specially non-react stuff

* other lifecycle methods (rarely used)
* shouldComponentUpdate()
* getDerivedStateFromProps()
* getSnapshotBeforeUpdate()

#### Refactoring data loading to the lifecycle method

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { lat:null, errorMessage:'' };
  }
  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message });
      }
    );
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading...</div>
  }
}
```

#### Alternate state initialization

- how is constructor method same as the current initialisation -> babel converts this to a constructor initialisation

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = { lat:null, errorMessage:'' };
  // }
  // the above is a long-form of the below, remove this as below
  state = { lat:null, errorMessage:'' };
  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message });
      }
    );
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading...</div>
  }
}
```

#### Passing state as props

```javascript
// SeasonDisplay.js
import React from 'react';
const SeasonDisplay = (props) => {
  return <div>Latitude: {props.lat}</div>;
};
export default SeasonDisplay;


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';


class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = { lat:null, errorMessage:'' };
  // }
  // the above is a long-form of the below, remove this as below
  state = { lat:null, errorMessage:'' };
  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message });
      }
    );
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      // child component also re-renders
      return <SeasonDisplay lat={thi.state.lat} />
    }
    return <div>Loading...</div>
  }
}
```

#### Determining Season

- new Date().getMonth()

```javascript
// SeasonDisplay.js
import React from 'react';
const getSeason = (lat, month) => {
  if(month > 2 && month < 9){
    return lat > 0 ? 'Summer':'Winter';
  }else{
    return lat > 0 ? 'Winter':'Summer';
  }
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth());

  return <div>{season}</div>;
};
export default SeasonDisplay;


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';


class App extends React.Component {
  state = { lat:null, errorMessage:'' };
  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message });
      }
    );
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      // child component also re-renders
      return <SeasonDisplay lat={thi.state.lat} />
    }
    return <div>Loading...</div>
  }
}
```

#### Ternary Expressions in JSX

```javascript
// SeasonDisplay.js
import React from 'react';
const getSeason = (lat, month) => {
  if(month > 2 && month < 9){
    return lat > 0 ? 'Summer':'Winter';
  }else{
    return lat > 0 ? 'Winter':'Summer';
  }
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth());

  return (
    <div>
      <h1>{season === 'Winter'?'Burr it is chilly!':'Let\'s hit the beach'}</h1>
    </div>
  );
};
export default SeasonDisplay;


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';


class App extends React.Component {
  state = { lat:null, errorMessage:'' };
  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude});
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message });
      }
    );
  }

  render() {
    if(this.state.errorMessage && this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat){
      // child component also re-renders
      return <SeasonDisplay lat={thi.state.lat} />
    }
    return <div>Loading...</div>
  }
}
```

#### Showing Icons

```css
// SeasonDisplay
.icon-left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.icon-right {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.season-display.winter i {
  color: blue;
}

.season-display.summer i {
  color: red;
}

.season-display {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.winter {
  background-color: aliceblue;
}

.summer {
  background-color: orange;
}
```

```javascript
// SeasonDisplay
import './SeasonDisplay.css';
import React from 'react';

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: 'sun'
  },
  winter: {
    text: 'Burr it is cold!',
    iconName: 'snowflake'
  }
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];

  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left massive ${iconName} icon`} />
      <h1>{text}</h1>
      <i className={`icon-right massive ${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;

// Spinner
import React from 'react';

const Spinner = props => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};
// Default Props
Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;

// index
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```
