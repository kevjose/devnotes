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

### Composition vs Inheritance

- react, prefer composition over interhitance, to reuse code between components
- Containment, when components are generic boxes like sidebar or modal, user props.children to pass chilren elements to their output

```javascript
function FancyBorder(props) {
  return (
    <div className={`FancyBorder FancyBorder-` + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialogue() {
  return (
    <FancyBorder color='blue'>
      <h1 className='Dialog-title'>Welcome</h1>
      <p className='Thank you for visiting'></p>
    </FancyBorder>
  );
}

// in case we might need more holes other than children

function SplitPane(props) {
  return (
    <div>
      {props.left}
      {props.right}
    </div>
  );
}
function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

- react elements are just like objects and can be passed like props
- also works well with classes

```javascript
function Dialog(props) {
  return (
    <FancyBorder color='blue'>
      <h1 className='Dialog-title'>{props.title}</h1>
      <p className='Dialog-message'>{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  render() {
    return (
      <Dialog
        title='Mars Exploration Program'
        message='How should we refer to you?'
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

- If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it

### Thinking in react

- start with a mock
- break ui into a component hierarchy (use single responsiblity principle)
- FilterableProductTable (contains the entirety of the example)
- -SearchBar (receives user input)
- - ProductTable (display row for each product)
- - - ProductCategoryRow (display heading for each category)
- - - ProductRow (dispaly row for each product)
- build a static version in react
- props are way of passing data from parent to child
- use props and not state, build top down or bottom-up

- Step 2

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type='text' placeholder='Search...' />
        <p>
          <input type='checkbox' />
          Only show products in stock
        </p>
      </form>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan='2'>{category}</th>
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
const PRODUCTS = [];
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
```

- step 3 identify the minimal representation of the ui state
- original list of products passed as props, hence not a state
- search text is a state
- filtered products can be computed from props hence not state

* step 4 where should state live
* step 5 inverse data flow

```javascript
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handlInStockChange = this.handlInStockChange.bind(this);
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
          type='text'
          placeholder='Search...'
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type='checkbox'
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
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
```
