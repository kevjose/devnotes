# Handling User Input with Forms and Events

- stuff to still figure out
- How to get feedback form user
- How to fetch data from outside API or server
- How do we show list of records

#### Pics project

#### Component design

- app challenges, Need to get search term from user, Need to use the search term to make an external API request, Need to fetch the results of the API call and show them on the screen in a list
- Components needed, 1. SearchBar 2. ImageList
- App (parent), SearchBar(child), ImageList(child)

#### Adding project structure

```javascript
// components/App.js
import React from 'react';
const App = () => {
  return <div>App</div>;
};
export default App;

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));
```

#### Showing forms to the User

```javascript
// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className='field'>
            <label>Image Search</label>
            <input type='text'/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

// components/App.js
import React from 'react';
import SearchBar from './SearchBar';
const App = () => {
  return (
    <div className='ui container' style={{marginTop:'10px'}}>
      <SearchBar />
    </div>
  );
};
export default App;

```

#### Creating event handler

- User clicks on something -> onClick
- User changes text in an input -> onChange
- User submits a form -> onSubmit

```javascript
// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  onInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input type="text" onChange={this.onInputChange} />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
```

#### Controlled vs Uncontrolled Elements

- currently have an uncontrolled element we want a controlled element
- below is conversion to constrolled by adding a state variable and setting the value of the input using the state variable via an arrow function

```javascript
// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
```

#### More on controlled elements

- User types an input
- callback gets invoked
- we call setState with new value
- component re-renders
- input is told what value is coming from state
- this is a controlled element
- we keep the HTML element value via state not from HTML
- dont store value in HTML, it should go from state to HTML

```javascript
// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
```
