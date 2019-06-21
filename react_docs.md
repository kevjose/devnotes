# React Documentation Notes

### Main Concepts

#### Hello world

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1> Hello World </h1>, document.getElementById('root'));
```

#### Intro to JSX

- consider variable declaration `const element = <h1> Hello World </h1>` this is JSX, a syntax extension to Javascript
- JSX describes what UI should look like and is recommended to be used with rect for rending UI
- JSX is a templating language with full power of javascript
- JSX produces React elements
- React embraces coupling of logic with UI
- React separate concerns using `components` which contains both logic and UI

- we can put any valid JS expression within a set of curly races `{}` in JSX

```javascript
// embedded JSX expressions in react
const name = 'John Doe';
const element = <h1> {name} </h1>;

ReactDOM.render(element, document.getElementById('root'));
```

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'John',
  lastName: 'Doe'
};
const element = <h1>{formatName(user)}</h1>;

reactDOM.render(element, document.getElementById('root'));
```

- JSX is also an expression, after compilation this become regular JS function call and evaluate to JS objects
- this means JSX can be used inside conditionals, loops, assigned to variables, accepted as args and returned from functions, just like objects in JS (or funcitons as well)
- attribute values can be set by putting them between quotes, expression between braces
- since JSX is closer to JS, HTML attributes are camelCased for naming convention

- Specifying Children in JSX
- if tag is empty with can directly close it by `<Element />` syntax
- JSX tags may contain other tags as children

```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

- JSX prevent injection attacks, everything is converted to string before rendering
- JSX represents objects, babel converts JSX to `React.CreateElement()` call

```javascript
const element = <h1 className="greeting">Hello, world!</h1>;

// the above is same as
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```

- React.CreateElement, performs few check to write bug free code and returns an object called `react elements`

```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

- React elements are description of what we want to see on the screen. React reads these objects and use them to construct the DOM and keep it up-to-date

#### Rendering Elements

- elements are the smallest building blocks of a react app
- React Elements are pure objects
- ReactDOM takes care of updating the DOM to match the react elements

- to render a react elements into a root node , pass both to ReactDOM.render()

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

- updating the rendered elements
- React elements are immutable, once created cannot be changed
- with the knowledge so far, to change the element create new element and pass to ReactDOM.render()

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}

setTimeInterval(tick(), 1000);
```

> in practice ReactDOM.render() is called only once,

- react updates only what is necessary
- ReactDOM compares the element and its children to the previous one , and only applies the DOM updates necessary to bring the DOM to the desired state
- in the above example even though we are re-creating the UI elemnt on every tick, only the text ie the date that is updated gets updated in the ReactDOM

#### Components and Props

- components lets split the UI into independant, reusable pieces and think about each in isolation
- conceptaully components are JS functions. These accept arbitrary input called `props` and return react elements describing what should appear on the screen
- function and class components

- simplest way of defining a component is a JS function

```javascript
function Welcome(props) {
  return <h1> Hello {props.name}</h1>;
}
```

- the above is a valid React component as it takes a single props object argument with data and returns a React element. We call this function components as these are JS functions

- the above can be writte using ES6 class

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>hello {this.props.name}</h1>;
  }
}
```

- the above two are equal from react point of view, there are additional features in class based components.

- Rendering a component
- elements can also be user-defined components `const element = <Welcome name='John'/>;`

```javascript
function Welcome(props) {
  return <h1> hello {props.name} </h1>;
}
const element = <Welcome name="john" />;
ReactDOM.render(element, document.getElementById('root'));
```

1. In the above, we call `ReactDOM.render()`, with `<Welcome name='John'>` element
2. React calls the Welcome component with `{name: 'John'}`, as the props
3. Welcome component returns html to be rendered
4. React DOM efficiently updated the DOM to match the returned HTML from the component

- always use Capital letter for Component name, React considers component starting with lowercase as DOM tags, The component requires to be in scope

- Composing Components,
- components can refer to other components in their output

```javascript
function Welcome(props) {
  return <h1> Hello {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="John" />
      <Welcome name="James" />
      <Welcome name="Sara" />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
```

- Extracting Components
- consider the example below

```javascript
function Comment(props) {
  return (
    <div>
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

- the above has author(an object), text (a string), date(a date object), as props and describes and Comment
- this can be tricky to change, due to the nestings, also hard to reuse the compnents

- lets extract Avatar component out

```javascript
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

- the above does not need to know that it will be rendered inside the Comment or any other component
- recommend naming the props from the components point of view, rather than the context it will be used in
- we can extract UserInfo as well

```javascript
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
```

- final Comment Component

```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

- Rule of thumb is, if a part of the UI is used several times, or is complex in its own, it is a good candidate for resusable component

- Props are Read-only, when we declare the component as a class or a function, it must never modify its own props, such functions are known as pure functions, as these do not attempt to modify their inputs and always return the same value for the same input
- All React components must act like pure functions with respect to their props.
- State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

#### state and lifecycle

- converting function to class based component
- Create ES6 class with the same name and extend React.Component
- Add single method render that has the code inside the function component
- replace props with this.props in the render body.
- Delete the function component

- Add a constructor function to initialise the this.state object

```javascript
class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date().toLocaleTimeString();
    }
  }

  render(){
    return (
      <div>
        <h1>Hello World </h1>
        <h2> the time is {this.state.date} </h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

- Adding lifecycle methods to a class
- we want to set up a timer whenever the Clock is rendered to the DOM. this is called mounting
- we want to clear the timer, when the DOM produced by the <Clock /> is removed, this is unmounting
- we declare special methods on the component class to run some code when a component mounts and unmounts, these are the lifecycle methods
- `componentDidMount()`, method runs after the component has been rendered to the DOM
- `componentWillUnmount()`, run to tear down the timer when the component is no longer in use

```javascript
class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date().toLocaleTimeString()}
  }

  componentDidMount(){
    this.timerId = setInterval(() = > {
      this.tick()
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  tick(){
    this.setState({
      date:new Date().toLocaleTimeString();
    })
  }
  render(){
    return (
      <h1> Hello There </h1>
      <h2> the time is {this.state.date} </h2>
    )
  }
}

ReactDOM.render(
  <Clock/>,
  document.getElementById('root')
)
```

- The clock ticks every second
- When <Clock /> is passed to ReactDOM.render(), react calls the constructor of clock component. Since clock need to render the current time, set state.date as new Date().
- React then calls the render(), this is how react learns what to show on the screen
- when the component is rendered at this point the componentDidMount() is called the Clock component asks the browser to set up a timer to call the component’s tick() method once a second.

- Every second the browser calls the tick() method. Inside it, the Clock component schedules a UI update by calling setState() with an object containing the current time. Thanks to the setState() call, React knows the state has changed, and calls the render() method again to learn what should be on the screen. This time, this.state.date in the render() method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

- If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle method so the timer is stopped.

* Using `States` correctly
* Do not modify states directly except in the constructor, at the time of initialisation, if modified elsewhere, this will not trigger the render() to be called
* Use `setState()` for modifying
* State updates might be asynchronous, react may batch multiple state updates for performance
* due to the above do not rely on current value of state to calculate next state

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
});
```

- to solve the above use alt syntax of setState()
- this accepts a function than a n object
- the function will recieve previous state a first arg, and props at the time as second.

```javascript
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

- the data flows down
- Neither parent nor child know if a certain component is stateful or stateless
- state is often called isolated or encapsulated
- A component may choose to pass, its state down as props to another child component
- This is called top-down, unidirectional data-flow. Any state is always owned by the component, and any data or ui derived will affect only its children components

#### Handling Events

- Handling events with react element is similar to handling events on the DOM, with some syntactic differences
- react events are named with camelCase rather than lowercased in case of HTML events
- with JSX we pass a event handler function rather than a string (which is the name of the function)
- in DOM events return `false` to prevent default behaviour. In React element event we must call preventDefault explicitly.

```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('this link was clicked');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click Me{' '}
    </a>
  );
}
```

- in the above e is a `synthetic event`, React defines the synthetic event for cross browser compatibility

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggled: true };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => {
      return { isToggled: !state.isToggled };
    });
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
```

- Passing args to the event handlers

```javascript
// with arrow funciton
<button onClick={e => this.deleteRow(id, e)}>Delete Row</button>
```

```javascript
// with Function.prototype.bind
<button onClick={this.deleteRow.bind(this, id)}>Delete Row </button>
```

#### Conditional Rendering

- in react we can create distinct components that encapsulates, behavior we need.
- Render only part of them based on the state of the application

```javascript
function UserGreeting(props) {
  return <h1>Welcome</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up </h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

```javascript
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(<LoginControl />, document.getElementById('root'));
```

- Preventing Components from rendering, return null

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));
```

- Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance componentDidUpdate will still be called.
