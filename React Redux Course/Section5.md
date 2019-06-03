# State in React Components

#### The Rules of State

- Only usable with class components
- You will confuse state with props
- 'Sate' in a JS object that contains data relevant to a component
- Updating 'state', on a component causes the component to (almost) instantly re-render
- state must be initialised when a component is created
- state can only be updated using the setState function !! Important

#### Initializing state via constructor

- state must be initialized when component is created

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){ // same props as we saw in the functional components
    super(props); // app is extending react.Component which has own methods which sets up the components, we want to make sure that the parent constructor is called via super(props)
    this.state = { lat:null }; // state object
  }

  // react says we have to define render
  render() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {console.log(position)} // success callback
      (err) => {console.log(err)} // failure callback
    );
    return <div>Latitute: {this.state.lat} </div>; // this will still be empty, we will have to use the state system to get the desired output
  }
}
```

#### Updating the state properties

- the state variable can be used inside other functions after initialisation
- any time we update the state object the component re-renders itself.
- render gets called frequently, chances of double fetching the location, put location service in constructor for now

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){ // same props as we saw in the functional components
    super(props); // app is extending react.Component which has own methods which sets up the components, we want to make sure that the parent constructor is called via super(props)
    // This is only time we do direct assignment
    this.state = { lat:null }; // state object
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // success callback
        this.setState({lat: position.coords.latitude}); // state updates only via this.setState(), one exception is contructor intialisation
      }
      (err) => {console.log(err)} // failure callback
    );
  }

  // react says we have to define render
  render() {
    // re-renders after setState() sets the lat property
    return <div>Latitute: {this.state.lat} </div>; // this will still be empty, we will have to use the state system to get the desired output
  }
}
```

#### App lifecycle walkthrough

- JS file loaded by the browser
- Instance of the app component is created
- App components 'constructor' function gets called
- State object is created and assigned to the this.state property
- we call the geolocation service
- react calls the components render method
- App returns the JSX, get rendered to the page as HTML
- .......
- We get result of the geolocation
- We update the satte object with a call to the this.setState()
- React sees that we updated the state of a component
- React calls the render method a second time
- Render method returns the updated JSX
- React takes that JSX and updates content of the HTML

#### Handling errors gracefully

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){ // same props as we saw in the functional components
    super(props); // app is extending react.Component which has own methods which sets up the components, we want to make sure that the parent constructor is called via super(props)
    // This is only time we do direct assignment
    this.state = { lat:null, errorMessage:'' }; // state object
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // success callback
        this.setState({lat: position.coords.latitude}); // state updates only via this.setState(), one exception is contructor intialisation
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message })// we can update selective properties on the this.state
      }
    );
  }

  // react says we have to define render
  render() {
    // re-renders after setState() sets the lat property
    return(
      <div>
        Latitute: {this.state.lat}
        <br/>
        Error: {this.state.errorMessage}
      </div>
    );
  }
}
```

#### Conditional rendering content

- have latitude, No errorMessage -> show latitude
- No latitude, Have errorMessage -> show error
- No latitude, No errorMessage -> show 'loading'

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){ // same props as we saw in the functional components
    super(props); // app is extending react.Component which has own methods which sets up the components, we want to make sure that the parent constructor is called via super(props)
    // This is only time we do direct assignment
    this.state = { lat:null, errorMessage:'' }; // state object
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // success callback
        this.setState({lat: position.coords.latitude}); // state updates only via this.setState(), one exception is contructor intialisation
      }
      (err) => {
        // failure callback
        this.setState({ errorMessage:err.message })// we can update selective properties on the this.state
      }
    );
  }

  // react says we have to define render
  render() {
    // re-renders after setState() sets the lat property
    // return(
    //   <div>
    //     Latitute: {this.state.lat}
    //     <br/>
    //     Error: {this.state.errorMessage}
    //   </div>
    // );
    // Conditional Rendering
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
