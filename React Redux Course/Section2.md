# Building Content with JSX

- JSX looks like HTML but is javascript
- babel also processes the JSX to JS
- JSX gets converted to a JS function call

```javascript
const App = () => {
  return <div>Hello</div>;
};

// above is converted to JS func call as below
const App = () => {
  return React.createElement('div', null, 'Hello');
};
```

#### converting HTML to JSX

- Adding custom styling to an element uses different syntax
- Adding a class to an element uses a different syntax
- JSX can refrence JS variables

```html
<div>
  <label class="label" for="name">Enter Name:</label>
  <input id="name" type="text" />
  <button style="background-color:blue; color:white;">Submit</button>
</div>
```

```javascript
// >. src/index.js
// 1. Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// 2. Create a React Component
const App = () => {
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter Name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        Submit
      </button>
      // inner is a JS object
    </div>
  );
};

// 3. Take the react component and show it on the screen
ReactDom.render(<App />, document.querySelector('#root'));

// the #root is located in > public/index.html
```

#### Referencing JS variables in JSX

- using {}, indicating that we want to use a JS variable, this is JSX convention

```javascript
// >. src/index.js
// 1. Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// 2. Create a React Component
const App = () => {
  const buttonText = 'Click Me';
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter Name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        {buttonText} // we can replace this with a function call as well
      </button>
      // inner is a JS object
    </div>
  );
};

// 3. Take the react component and show it on the screen
ReactDom.render(<App />, document.querySelector('#root'));

// the #root is located in > public/index.html
```

#### Values JSX can't show

- Objects are not valid as a react child, cannot take JS object to show as text, instead refer to exact property to be displayed
- we can use objects until we are trying to display them as such

#### Finding forbidden property names

- check for warnings in the console, eg: for in the label should be htmlFor
- the console throws, Invalid DOM property error
