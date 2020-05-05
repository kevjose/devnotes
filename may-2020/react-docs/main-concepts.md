## Introducing JSX

```javascript
const element = <h1>Hello World </h1>;
```

why JSX?

- because UI logic is coupled with rendering logic
- in react components have UI and rendering logic, components serve as unit for separation of concerns

```javascript
const name = 'John Doe';
const element = <h1> Hello, {name} </h1>;

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

const element = <h1>Hello, {formatName(user)}</h1>;

ReactDOM.rener(element, document.getElementById(root));
```

- JSX prevents malicious code by escaping it before rendering

### JSX represents objects

```javascript
const element = <h1 className='greeting'>Hello World!</h1>;
// is same as

const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello World'
);

// React.createElement create the followng data structure

const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello World'
  }
};
// React reads the above and construct the DOM with it.
```

## Rendering elements

- react elements are immutable
- to update UI create a new element

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello World</h1>
      <h2>It is {new Date().toLocaleString()}</h2>
    </div>
  );
}

ReactDOM.render(element, document.getElementById('root'));

setInterVal(tick, 1000);
```

- react only updates what is necessary, in the above only the date is re-rendered, even though the entire JSX is returned (a new instance).

## Components and props

- components for reusable ui pieces
- function and class components

```javascript
function Welcome(props) {
  return <h1>Hello {props.name} </h1>;
}
// same but class based.
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- Composing componetns, components referring to other components, multiple times

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name='John' />
      <Welcome name='Jane' />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

- Extracting components

```javascript
function Comment(props) {
  return (
    <div className='Comment'>
      <div className='UserInfo'>
        <img
          className='Avatar'
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className='UserInfo-name'>{props.author.name}</div>
        <div className='Comment-text'>{props.text}</div>
        <div className='Comment-date'>{formatDate(props.date)}</div>
      </div>
    </div>
  );
}

// the above can be extracted into  different resusable components as below

function Avatar(props) {
  return (
    <img
      className='Avatar'
      src={props.author.avatarUrl}
      alt={props.author.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className='UserInfo'>
      <Avatar user={props.user} />
      <div className='UserInfo-name'>{props.author.name}</div>
    </div>
  );
}

// finally the Comments component can be re-written as

function Comment(props){
  return(
    <div className="Comment">
      <UserInfo user={props.user}>
      <div className='Comment-text'>{props.text}</div>
        <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  )
}
```

- props are read only
- all react components must act pure wrt their props

## State and lifecycle

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <h2> It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

- state to modified directly only in constructor.
- setState may do apply changes in batches
- for relaible way to use state values, use below

```javascript
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

- also setState does a shallow merge, ie we can update only a few keys in the state and it does not affect the remaining ones

## Handling Events

```javascript
function ActionLink() {
  function handlClick(e) {
    e.preventDefault();
    console.log('The link was clicked');
  }
  return (
    <a href='#' onClick={handleClick}>
      Click me.
    </a>
  );
}
```

- `e` here is a synthetic event
- use the .bind notation to fix the `this` issue or the public class field syntax
- passing args to event handlers

```html
<button onClick={(e) => this.deleteRow(id, e)}> Delete Row</button>

<button onClick={this.deleteRow.bind(this, id)}> Delete Row</button>
```

## Conditional rendering

- using if conditon in a function
- using logical && inline
