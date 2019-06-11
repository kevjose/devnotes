# twitch clone

- user is not logged in

1. User can view all streams and channels
2. User can view video for a single stream

- user is logged in

1. User can create a new stream/channel
2. User can edit a stream/channel they have created
3. User can delete a stream/channel they have created

#### App challenges

- Need to be able to navigate around to separate pages in the application
- Need to allow user to login/logout
- Need to handle forms in redux
- CRUD operations in react/redux
- Need good error handling

#### Intro to react router

`npm install --save react-router-dom`

- react-router, core nvaigation lib, we do not install this manually
- react-router-dom, Navigation for dom based apps, we want this
- react-router-native, Navigation for react-native apps
- react-router-redux, Bindings between react-router and redux (not necessary)

#### Sample expamle for react-router-dom

```javascript
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const PageOne = () => {
  return <div>PageOne</div>;
};
const PageTwo = () => {
  return <div>PageTwo</div>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo" exact component={PageTwo} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

- react router cares about parts after the slash ie after the domain and port definitions
- part of react router

1. history (keeps track of address bar in the browser) -> BrowserRouter (listens to history for changes to the url) -> Route path='/pagetwo' (visible on when the path matches the current url) -> component sprecified in the Router

#### How path gets matched

- mulitple routes can point to the same component, in this case multiple instances of the components will be rendered
- exact , if we donot use the exact keyword, the Route / and /pagetwo both will be rendered on localhost:3000/pagetwo as / also partially matched /pagetwo
- the way react router works is `extractedPath.contains(path)` this expalins why we see two components on removing the exact keyword for '/pagetwo' route
- when we include the exact keyword the react router works as`extractedPath === path`

#### Navigation with react-router-dom

- in traditional application we use the `<a href=''>link to navigate to</a>` for navigation , this is not how we want to handle navigation in react app

- why we should no use anchor tags for navgation in react apps

1. you add anchor tag to react app and click it
2. your browser makes a request to localhost:3000
3. dev server responds with index.html
4. browser receives index.html file, dumps old html file it was showing including all the react/redux states
5. index.html file lists the js files in the script tag, - browser downloads and executes these scripts
6. Our app starts up

- `<Link to='/'>LinkToPage</Link>`

```javascript
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <div>
      PageOne
      <Link to="/pagetwo">PageTwo Link</Link>
    </div>
  );
};
const PageTwo = () => {
  return (
    <div>
      PageTwo
      <Link to="/">PageOne Link</Link>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo" exact component={PageTwo} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

- what we want

1. User wants to navigate to another page in our app
2. User clicks a link tag
3. react-router prevents the browser from navigating to new page and fetching the index.html
4. url still changes
5. History sees updated URL, takes URL takes it to BrowserRouter, BrowserRouter communicated the URL to Route Components
6. Route Components re-renders to show new of components

#### Component Scafolding

- /, StreamList
- /streams/new, StreamCreate
- /streams/edit, StreamEdit
- /streams/delete, StreamDelete
- /streams/show, StreamShow

#### Always visible components

- define <Header/> and login button component outside the <BrowserRouter> components so that it is visible all the time
- You should not use <Link> outside a <Router>, since link is a child of the react-router component
- Header should be inside BrowserRouter

```javascript
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```
