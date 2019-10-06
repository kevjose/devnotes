## React Key Concepts

- birth of react js in 2013
- traditional html, css, js.
- jquery, easier dom interactions, cross browser js compatibility, unified api acrross all browsers
- applications started to grow, increased capabilities.
- birth of SPA (load frontend only ones) as frontend websites started becoming web application. server requests via ajax.
- SPA popularity, angularJS in 2010 became de facto for SPA, better code organisation, directives, controller, views etc.
- complexity of web app increased, tracking bugs became difficult
- fb devs also found it difficult to maintain the app. (they were not using angularJS)
- they came up with react in 2013 in JS conf, a new way of building frontend apps
- 2014 angularJS complete re-write, because of this react gained popularity

#### what made react great. -> Dont touch the dom directly

- dont touch the dom, react will do it, no direct dom maniuplation
- DOM, document object model, tree representation of the page
- JS is used to manipulate the DOM. DOM api used for manipulation
- Imperative, ie. we directly change individual parts of the app. becomes difficult to understand relationships
- React, more declarative, DOM mainpulation is time taking, repaints and reflow are costly. React takes care of the repaint and reflow, all we need to tell react is to how my app state ie. JS object acts as a blueprint.
- the above leads to less complexity, better code management.

#### Component Architecture

- build wwebsites like lego blocks
- reusable components, compose components to create larger components
- components are plain JS functions
- state of the app, then components are created based on this data, simply as functions, components recieve attributes called props and returns html in JS.
- the above makes components reusable, across projects

  > React plugin lets us view the components in the application

#### One way data flow

- uni-directional data flow, react gives interactivity, all data in react is within states. state+ components creates a virtual dom JS version of the dom.
- virtual dom gives react a blueprint of the app so it knows how to update the actual dom.
- anytime we want to change something on the app, react intercepts the action, change the states accordingly, as soon as state changes react, reacts. hence one way flow of data. state trickles down, ie, data flows down.

#### UI library

- react is just the ui, rest upto us. React cares only of the view (components, state and virtual dom), idea of cross platform took of from this. also note how react and react-dom where separated for cross platform use cases.

#### good react devs

- decide on components
- decide the state and where it lives
- what changes when the state changes

## React Basics

- use node, create-react-app
- babel (makes sure js files works on all the browser), webpack(module bundler, optimise for production)
- react can be injected into any other html app, check `div id=root`
- react function components vs class components
- class provides access to state. state is an object with properties that we can access inside class.
- state can be changed only by setSate(), react here intercepts the click, and based on the updated value the re-render happens
- any time state changes, component is re-rendered

#### Thinking in JSX

- class to className, {} -> JS expression and produces a value

#### SPA

- instead of requesting for page, request data
- component life cycles, apis
- componentDidMount
