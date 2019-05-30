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
