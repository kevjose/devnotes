# Communicating with props

#### The three tenets of components

- Component Nesting, A component can be shown inside of another
- Component Reusability, We want to make components that can be reused throughout the application
- Component Configuration, We should be able to configure the component while creating it

#### naive component approach (components app)

- use semantic ui for styling (https://semantic-ui.com/)
- https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css place this in a link tag in the head section in the public/index.html

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div> Hi there</div>;
};
ReactDOM.render(<App />, document.querySelector('#root'));
```

### starting to create a Naive UI for the comments using semantic-ui#comments

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src="" />
        </a>
        <div className="content">
          <a href="/" className="author">
            Sam
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">Nice Blog Post!</div>
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
```

#### Adding images to JSX

- use faker js to do initial project without api,
- `npm install --save faker`
- `<img alt="avatar" src={faker.image.avatar()} />`, call the fake then entity and call this as a function

```javascript
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.avatar()} />
        </a>
        <div className="content">
          <a href="/" className="author">
            Sam
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">Nice Blog Post!</div>
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
```

#### Duplicating a single component

- repeat the comment part three times, this becomes unsable, making changes to a single comment will become error prone.

```javascript
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.avatar()} />
        </a>
        <div className="content">
          <a href="/" className="author">
            Sam
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">Nice Blog Post!</div>
        </div>
      </div>
      // 2nd comment
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.avatar()} />
        </a>
        <div className="content">
          <a href="/" className="author">
            Sam
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">Nice Blog Post!</div>
        </div>
      </div>
      // 3rd comment
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.avatar()} />
        </a>
        <div className="content">
          <a href="/" className="author">
            Sam
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">Nice Blog Post!</div>
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
```

#### Extracting JSX to new components

- Creating a resuable configurable component
- identify JSX that appears to be duplicated
- what is the purpose of the JSX block, think of a desciptive name for what it does
- create new file to house this component, it should have same name as the component
- create new component in the new file, past the JSX into it
- Make the component configurable using the react prop system

- Note there are some hard code stuff in the JSX below like the name of the author, the time etc. we want these to be configurable so that the component can then be reused

```javascript
// CommentDetail.js
import react from 'react';
import faker from 'faker';

const CommentDetail = () => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={faker.image.avatar()} />
      </a>
      <div className="content">
        <a href="/" className="author">
          Sam
        </a>
        <div className="metadata">
          <span className="date">Today at 6:00PM</span>
        </div>
        <div className="text">Nice Blog Post!</div>
      </div>
    </div>
  );
};
export default CommentDetail; // exposes the component;
```

#### Component Nesting

- to add component nesting use the components as if they are JSX tags nand do not use {}

```javascript
// index.js
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail />
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
```

#### React's prop system

- component heirarchy 1. App-> 2.a CommentDetail 2.b CommentDetail, App is parent, CommentDetail is child component
- props, system for passing data from parent to child component
- props, goal is to customise or configure a child component
- no restrictions on passing number of props from parent to child
- props short for properties

#### Passing and receiving props

- providing props from parent to child
  `<CommentDetail author='Sam'/>`
- author, name of the prop
- Sam, value of the prop, this value can be referenced via a JS variable as well
- prop value will not be shared for multiple instances, each will be a unique instance of the child component
- the passed props can be used in the child by accessing the props.PROPERTY_NAME

```javascript
// index.js
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail author="Sam" />
      <CommentDetail author="Jerry" />
      <CommentDetail author="John" />
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));

// CommentDetail.js
import react from 'react';
import faker from 'faker';

const CommentDetail = props => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={faker.image.avatar()} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}// accessing the props from parent to child
        </a>
        <div className="metadata">
          <span className="date">Today at 6:00PM</span>
        </div>
        <div className="text">Nice Blog Post!</div>
      </div>
    </div>
  );
};
export default CommentDetail; // exposes the component;
```

#### Passing multiple props

```javascript
// index.js
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail author="Sam" timeAgo="5 mins ago" />
      <CommentDetail author="Jerry" timeAgo="15 mins ago" />
      <CommentDetail author="John" timeAgo="25 mins ago" />
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));

// CommentDetail.js
import react from 'react';
import faker from 'faker';

const CommentDetail = props => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={faker.image.avatar()} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}// accessing the props from parent to child
        </a>
        <div className="metadata">
          <span className="date">{props.timeAgo}</span>
        </div>
        <div className="text">Nice Blog Post!</div>
      </div>
    </div>
  );
};
export default CommentDetail; // exposes the component;
```

#### Component reuse

- Approval Card
- props.children, we want to show CommentDetail inside the ApprovalCard component, also make ApprovalCard reusable,
- child component is set at props.children

```javascript
// ApprovalCard
import React from 'react';

const ApprovalCard = props => {
  return (
    <div className="ui card">
      <div className="content">{props.children}</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;

// CommentDetail
import React from 'react';

const CommentDetail = props => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={props.avatar} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">{props.timeAgo}</span>
        </div>
        <div className="text">{props.content}</div>
      </div>
    </div>
  );
};

export default CommentDetail;

// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning!</h4>
          Are you sure you want to do this?
        </div>
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail
          author="Sam"
          timeAgo="Today at 4:45PM"
          content="Nice blog post"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail
          author="Alex"
          timeAgo="Today at 2:00AM"
          content="I like the subject"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail
          author="Jane"
          timeAgo="Yesterday at 5:00PM"
          content="I like the writing"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

```
