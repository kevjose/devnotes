# Making API requests with React

- use unsplash API (returns stock images)
- Our app, requests for pics of an entity, unsplash returns a list of images

#### Axios vs Fetch

- ajax client will be making the API request not react library
- axios -> 3rd party package, fetch -> function built into modern browsers

* `npm install --sav axios`

```javascript
// components/App.js
import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

class App extends React.Component {
  onSearchSubmit(term) {
    axios.get('https://api.unsplash.com/search/photos',{
      params:{
        query: term
      },
      headers: {
        Authorization:'Client-ID 34e39e5c2f447ce52009a515846ca2b6ccc35552bb63de59cf4a6d06728f3f7e'
      }
    });
    // the above can be checked in the newtork tab of the browser as we havent done anything with the api call result yet
  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}
export default App;


// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };
  onFormSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
    // in a class based component use this.props instead of just props as in a functional component
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={event => this.onFormSubmit(event)}>
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

#### Handling Requests with Async Await

- Component renders itself one time with no list of images
- onSearchSubmit method is called
- Request made to unsplash API
- wait ....
- Request complete
- Set image data on the state of the App Component
- App component re-renders ans shows the images

```javascript
// components/App.js
import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

class App extends React.Component {
  async onSearchSubmit(term) {
    const response = await axios.get('https://api.unsplash.com/search/photos',{
      params:{
        query: term
      },
      headers: {
        Authorization:'Client-ID 34e39e5c2f447ce52009a515846ca2b6ccc35552bb63de59cf4a6d06728f3f7e'
      }
    });
    console.log(response.data.results);
  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}
export default App;


// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
    // in a class based component use this.props instead of just props as in a functional component
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
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

#### Setting state after async request

```javascript
// components/App.js
import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = {images: [] };
  onSearchSubmit = async(term) =>  {
    const response = await axios.get('https://api.unsplash.com/search/photos',{
      params:{
        query: term
      },
      headers: {
        Authorization:'Client-ID 34e39e5c2f447ce52009a515846ca2b6ccc35552bb63de59cf4a6d06728f3f7e'
      }
    });
    this.setState({images: response.data.results});
  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        Found :{this.state.images.length} images
      </div>
    );
  }
}
export default App;


// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
    // in a class based component use this.props instead of just props as in a functional component
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
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

#### Creating custom axios clients

```javascript
// api/unsplash.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      'Client-ID 34e39e5c2f447ce52009a515846ca2b6ccc35552bb63de59cf4a6d06728f3f7e'
  }
});


// components/App.js
import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = {images: [] };

  onSearchSubmit = async term => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });

    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        Found :{this.state.images.length} images
      </div>
    );
  }
}
export default App;


// components/SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
    // in a class based component use this.props instead of just props as in a functional component
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
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
