# Let's Dive In!

#### First App via codepen

```javascript
function transform(offset) {
  const cos = Math.cos(offset);
  const sin = Math.sin(offset);
  return {
    transform: `matrix3d(${sin}, ${-cos}, ${sin}, 0, ${-cos}, ${sin}, 0, 0, 0, ${cos}, ${cos}, ${sin}, 0, 0, 0, 1)`
  };
}

class App extends React.Component {
  state = { styelOne: {}, styleTwo: {} };

  onMouseMove = event => {
    this.setState({
      styleOne: transform(-event.clientX / event.clientY),
      styleTwo: transform(event.clientX / event.clientY)
    });
  };

  render() {
    return (
      <div onMouseMove={this.onMouseMove}>
        <div className="panel" style={this.state.styleOne} />
        <div className="panel" style={this.state.styleTwo} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

```css
div {
  height: 100vh;
  width: 100vw;
}

.panel {
  position: absolute;
  box-shadow: 0 0 50px grey;
  background-image: url('data:image/svg+xml,%3Csvg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z" fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E');
}
```

```html
<div id="root"></div>
```

#### Critical Questions

- Waht is react and its purpose -> is JS library, React's Ultimate purpose is to show content HTML to users and handle user interaction
- Why didn't we have to use Redux to make that app -> React can work by itself, React can work with other libraries as well to make app dev easy
- What was that class thing -> A JS 'class' is part of ES2015, React components are made of js functions or classes, components are basic units of react
- What was the HTML looking stuff -> JSX , special dialect of JS, It looks like HTML and can be placed in the JS code. Determins the content of our React app just like normal HTML
- How did the screen change when we moved the mouse -> Using an event handler that the component has created, Event Handlers are used to detect user interaction and respond to it
- Why did we add two libraries (react and reactDOM) -> React is split into two libraries, `React` knows what a component is and how to make components work together. `ReactDOM` knows how to take a component and make it show up in the DOM

#### Generating a React Project

- using the create-react-app
  `npm install -g create-react-app`
- npm, runs npm
- install, we want to install a package into our computers
- -g, installs the package globally, so we can run it from the terminal
- create-react-app, name of the package
- for new react project `create-react-app project_name`

#### Why create react app

- creates a brand new react project and sets up webpack, babel and dev server, these are behind the scenes tooling that we don't have to setup

#### Exploring the create-react-app

- src, folder where we put all the source code we write
- public, folder that store the static files like images
- node_modules, folder that contains all the project dependancies
- package.json, records our project dependancies and configures our project
- package.lock.json, records the exact version of packages we install
- README.md, instructions on how to use the project
- .gitignore, reference to git track

#### Starting and Stopping the React App

- `npm run start` or `npm start` in the project dir, dev server runs in localhost:3000
- ctrl+c to stop the application

#### Javascript Module System

- open src dir, remove all the files in the scr dir
- create empty `index.js`, name is important

- A component is a function or a class that produces HTML to show the user (using JSX), and handles feeedback from the user (Using the vent handlers)

```javascript
// >. src/index.js
// 1. Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// 2. Create a React Component
const App = () => {
  return <div>Hi there! </div>;
};

// 3. Take the react component and show it on the screen
ReactDom.render(<App />, document.querySelector('#root'));

// the #root is located in > public/index.html
```
