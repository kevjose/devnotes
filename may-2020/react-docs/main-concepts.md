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

## List and keys

- keys help react identify which item in the list has changed, added or removed, Keys should be given to elements inside the array t o give the elements a stable identity.

```javascript
const todoItems = todos.map(todo => (
  <li key={todo.id}>
    {todo.text}
  </li>
)

```

- using `index` is not considered as using a stable key
- keys only make sense in context of surrouding array

```javascript
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => {
    return <ListItem key={number.toString()} value={number} />;
  });
  return <ul>{listItem}</ul>;
}
const numbers = [1, 2, 3, 4, 5, 6, 7];
ReactDOM.render(
  <NumberList number={numbers} />,
  document.geElementById('root')
);
```

- key must be unique among siblings, no need to be globally unique

## Forms

- html form elements keep internal state
- `Controlled components`, html forms like input, textarea and select maintain their own state. In react mutable state is kept in state property and updated with setState()
- React state as the single source of truth, this notion is called controlled components

```javascript
class NameForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    console.log(this.state.value);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}/>
        <label>
          Name:
          <input type="text" value={tnis.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit">
      </form>
    )
  }

}
```

- in textarea use the value attrib in react to set its value
- for select also use the value attrib
- file type input is uncontrolled since its read only

* for multiple fields

```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value // computed property name syntax
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name='numberOfGuests'
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

### Lifting states up

- lift state up to the common ansector in case many of the child component need to reflect the change
- There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.

- Lifting state involves writing more “boilerplate” code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state “lives” in some component and that component alone can change it, the surface area for bugs is greatly reduced
