# Modern Javacript: Using ES6, NPM, Babel and Webpack

#### cmd intro

- ls, list the files in the folder
- cd, (change directory) move around
- clear, clears the cmdline
- mkdir, make directory
- touch, creates new file
- cp, copies target, destination
- mv, moves target, destination
- rm, removes, not move to trash
- rm -r, deletes recursively, delete one folder at a time then the folder
- open, opens the file with default program
- npm init
- npm install package_name --save-dev
- npm uninstall package_name
- sudo npm install package_name -g , global install

#### Configuring webpack

- asset bundler for js, css, .jpg, .png etc.
- webpack 4 has a 0 config mode, just need to have src/index.js file, works well for small projects
- core concepts webpack, entry point, output, loaders, plugins
- entry, is where wepack starts bundling here, it looks for all dependancies to be bundled here, can specify one or more entry files
- output, where to save the bundle file, takes an object which takes path to folder then the file name, the path needs to be an absolute path, for getting the absolute path use the path node package, use the path.resolve(\_\_dirname, 'dist/js'), \_\_driname give the root directory we are working with
- webpack 4 has prod and dev mode as well, dev mode bundles without minifying, prod enables optimisation like minifying, tree shaking etc, this can be specified by mode property

- use npm scripts to start webpack
- use `npm run` to start the script
- move mode in webpack to npm script,

#### webpack dev server

- automatically reloads the page when we save our code (bundling etc done)
- while using the webpack-dev-server the bundle.js file is not requires as this is inject on the fly into the output path
- plugins allow us to do complex processing on our input files

#### Setup Babel

- loaders, in webpack allows to load and process different files es6->es5 sass to css etc
- in webpack modules -> rules -> regex -> use babel if match regex
- some things like promises were not present in ES5, here babel cannot convert these rather use polyfills

#### Project Architecture

- going to use MVC, Model View Controller, easily decouples presentation logic with the application logic with an app controller in between
- the above is similar to the budgety app in ES5, but now we will use ES6, will we use ES6 module for this
- Model, Search.js, Recipe.js, List.js, Likes.js
- View, SearchView.js, recipeView.js, listView.js, likesView.js
- Controller, index.js

#### How ES6 Modules work

- How to use ES6 modules
- Default and named exports and imports

- Model file names starts with capital -> convention
- default exports are used in case of only single exports
- when we import the module no need of adding .js
- named export, use export for each entity function constants etc.
- to use different names in the named exports use the syntax `import {add as a, multiply as m} from './models/Search';`

```javascript
import { add } from './models/Search';
import { multiply as m } from './models/Search';
import * as search from './models/Search';
console.log(`${add(2, 3)}`);
console.log(`${search.multiply(2, 3)}`);
```

#### Making API calls

- How to use real world APIs
- What API keys are and why we need them
- food2fork.com API

#### Building Search Model

- How to build a simple data model using ES6 classes

```javascript
import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const key = 'b6b9a58327dd7ba27f7da759f09325af';
      const res = await axios(
        `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${
          this.query
        }`
      );
      this.result = res.data.recipes;
      console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}
```

#### Building the Search Controller

- The concept of application state
- A simple way of implementing state

```javascript
import Search from './models/Search';
/**
 * Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - liked recipe
 *
 */
const state = {};
const controlSearch = async () => {
  // 1. get the query from the view
  const query = 'pizza'; // TODO
  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI for the result

    // 4. Search for the recipes
    await state.search.getResults();

    // 5. Render results on the UI
    console.log(state.search.result);
  }
};
document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
```

#### Building search view

- Advanced DOM manipulation techniques
- Use ES6 string literal to render entire HTML components
- How to create a loading spinner
- use split and reduce method to prettify the long titles of the recipe
- the reduce method takes an accumulator and current value in the callback, we have to pass an initial value to the accumulator with the param after the callback

```javascript
let title = 'kalfkjak sdfklas dfkasfkah sdfkak';
let limit = 17;
newTitle = [];
title.split(' ').reduce((acc, cur) => {
  if (acc + cur.length <= limit) {
    newTitle.push(cur);
  }
  return acc + cur.length;
}, 0);
newTitle = `${newTitle.join(' ')} ...`;
console.log(newTitle);
```

#### Rendering AJAX loading spinner

```javascript
// views/base.js
export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};

// index.js
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - liked recipe
 *
 */
const state = {};
const controlSearch = async () => {
  // 1. get the query from the view
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI for the result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for the recipes
    await state.search.getResults();

    // 5. Render results on the UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
```

#### Implementing Search Results Pagination

- How to use the .closest method for easier event handling
- How and why to use data-\* attribute in HTML5
- cannot add event on an element not visible in the DOM already
- targetting button to add event listener becomes difficult
- The closest() method of the Element interface returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in a parameter. If no such element exists, it returns null.

```javascript
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
```

#### Building Recipe Model

- For a single recipe from the search results

```javascript
import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  calcTime() {
    // Assuming that we need 15 mins for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
```

#### Building the Reciper Controller

- How to read data from the page URL
- How to respond to hashchange event
- How to add eventListeners to multiple events

```javascript
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
```

#### Building the Recipe Model

- Use array methods like map, slice, findIndex and inclues
- How and why to use eval();
