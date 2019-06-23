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

#### List and keys

- transform lists in JS using map

```javascript
const numbers = [1, 2, 4, 3, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
```

- In react transforming array into list of elements is nearly identical
- Rendering multiple components

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const listItems = numbers.map(num => {
  <li> {num} </li>;
});
ReactDOM.render(<ul>{listItem}</ul>, document.getElementById('root'));
```

- Basic list component

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItem = numbers.map(num => {
    <li>{num}</li>;
  });
  return <ul>{listItem}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- the above will give a warning that key should be provided for the list items
- key is a special string attribute

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItem = numbers.map(num => {
    <li key={num.toString()}>{num}</li>;
  });
  return <ul>{listItem}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- Keys help react identify which item has changed, added or removed. Key are given to the elements in the array to give them a stable identity
- React does not recommed using indexes for key if the order of the item may change, React by default uses index as key values if not provided any

#### Forms

- HTML form elements work differently than other DOM elements in React, form elements naturally keep some internal state
- The form has a default behavior of browsing to a new page when the use submits the form. This works in react as well,however its more convenient to have JS function that handles the submission of the form and has access to the data that the use entered into the form. - Controlled Components

- Controlled Components, In HTML, form elements like input, textarea, select typically maintain their own state and update it based on the user input. In React, mutable state is typically kept in the state property of the component and only updated using the `setState()`.
- We make react state the single source of truth.

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            onChange={this.onbChange}
            value={this.state.value}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### Lifting state up

- Often several components need to reflect the same changing data. WE lift the shared state up to its closest common ancestor.

```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Water is boiling </p>;
  } else {
    return <p>Water not boiling</p>;
  }
}
```

- create Calculator component, it renders input tag and lets you enter the temperature and keeps in the state, addtionally it renders the BoilingVerdict for the current input value

```javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperatur: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />

        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

- For multiple inputs celsius and farenheit and they must be in sync

```javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />

        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

- React calls the function specified as onChange on the DOM <input>. In our case, this is the handleChange method in the TemperatureInput component.
- The handleChange method in the TemperatureInput component calls this.props.onTemperatureChange() with the new desired value. Its props, including onTemperatureChange, were provided by its parent component, the Calculator.
- When it previously rendered, the Calculator has specified that onTemperatureChange of the Celsius TemperatureInput is the Calculator’s handleCelsiusChange method, and onTemperatureChange of the Fahrenheit TemperatureInput is the Calculator’s handleFahrenheitChange method. So either of these two Calculator methods gets called depending on which input we edited.
- Inside these methods, the Calculator component asks React to re-render itself by calling this.setState() with the new input value and the current scale of the input we just edited.
- React calls the Calculator component’s render method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
- React calls the render methods of the individual TemperatureInput components with their new props specified by the Calculator. It learns what their UI should look like.
- React calls the render method of the BoilingVerdict component, passing the temperature in Celsius as its props.
- React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.

#### Composition vs Inheritance

- Containment, some components may not know its children ahead of time, use the `props.children`, to pass children directly into their output

```javascript
function FancyBox(props) {
  return <div className={props.color}>{props.children}</div>;
}

function WelcomeDialogue() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

- Anything inside the <FancyBorder> JSX tag gets passed into the FancyBorder component as a children prop. Since FancyBorder renders {props.children} inside a <div>, the passed elements appear in the final output.

- what if we need multiple holes, in a component, come up with own convention rather than using the children property.

```javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

- React elements like <Contacts /> and <Chat /> are just objects, so you can pass them as props like any other data.
- Specialization, configurirng with props

```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  );
}
```

- Composition with classes

```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: '' };
  }

  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input value={this.state.login} onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({ login: e.target.value });
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

#### Thinking in react

- Building a searchable product data table using react
- Break UI into component hierarchy
- Single responsibility principle, component should ideally do only one thing, if it end up growing it should be decomposed into smaller subcomponents
- Five components for our simple app

1. FilterableProductTable, Contains the application
2. SearchBar, receives all user input
3. ProductTable, displays and filters the data collection based on user input
4. ProductCategoryRow, dispalys a heading for each category
5. ProductRow, displays row for each product

- Building a static version in react

```javascript
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach(product => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search ..." />
        <p>
          <input type="checkbox" /> Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

- Identify the minimal but complete representation of the UI state

- Think of all of the pieces of data in our example application. We have:

- The original list of products
- The search text the user has entered
- The value of the checkbox
- The filtered list of products

- Is it passed in from a parent via props? If so, it probably isn’t state.
- Does it remain unchanged over time? If so, it probably isn’t state.
- Can you compute it based on any other state or props in your component? If so, it isn’t state.

- Our final state is
- The search text the user has entered
- The value of the checkbox

- Identify where the state should live
- Inverse data flow

```javascript
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```
