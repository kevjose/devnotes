# Building list of records

- in the components dir -> ImageList.js

```javascript
// components/ImageList.js
import React from 'react';

const ImageList = () => {
  return <div> Image list </div>;
};

export default ImageList;



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
import ImageList from './ImageList';

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
        <ImageList images={this.state.images} />
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

```javascript
// components/ImageList.js
import React from 'react';

const ImageList = props => {
  console.log(props.images);
  return <div> Image list </div>;
};

export default ImageList;
```

#### Rendering list of components

```javascript
// components/ImageList.js
import React from 'react';

const ImageList = props => {
  const images = props.images.map(image => {
    return <img src={image.urls.regular} />;
  });
  return <div> {images} </div>;
};

export default ImageList;
```

#### The purpose of keys in List

- for diffing pupose by react
- assign key to the root repeating element

```javascript
// components/ImageList.js
import React from 'react';

const ImageList = props => {
  const images = props.images.map(image => {
    return (
      <img key={image.id} src={image.urls.regular} alt={image.description} />
    );
  });
  return <div> {images} </div>;
};

export default ImageList;



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
import ImageList from './ImageList';

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
        <ImageList images={this.state.images} />
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
