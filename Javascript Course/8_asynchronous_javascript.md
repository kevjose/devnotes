# Asynchronous Javascript: Promises, Async/Await and Ajax

- asynchronous is that which run in the background while the main code is still running, typicall api calls etc.
- setTimeout sets a timer in JS

#### An example of asynchronous javascript

```javascript
const second = () => {
  //   console.log('Second');
  setTimeout(() => {
    // timer runs in the background
    console.log('Second');
  }, 2000);
};

const first = () => {
  console.log('Hey there');
  second();
  // the timer does not pause the execution of the synchronous code
  console.log('The End');
};

first();
// without the setTimeout lines execute line by line
// with setTimeout - the second function will log after all the synchronous lines
```

#### Understanding Asynchronous Javascript: The Event Loop

- Allow asynchronous functions to run in the 'background'
- We pass callbacks that run once the function has finished its work
- Move on immediately: Non blocking

- starts by calling the first() creates an execution context in the execution stack
- console.log('Hey there') is called -> new execution context, print message, execution context popped from the stack
- moving on to the second function an execution context is created, in the next line setTimeout is called, this causes another execution to be created
- the setTimeout function actually comes from the web APIs, these live outside the JS engine itself
- setTimeouts(), DOM events and XMLHttpRequest(), localStorage are all part of the web APIs, these are present in the JS runtime,
- the timer for the setTimeout runs in the JS runtime
- a callaback is also passed to the timer, stays with the timer until it is finished
- since timer works in background this does not block the main execution
- once timer is put in background with the callback the second execution context is also popped of
- then console.log('The End') is printed now first function execution stack is popped
- now timer is completed now callback is passed to the message queue and waits for the execution stack to be empty
- the above happens with DOM events as well
- How are callbacks in the message queue executed, this is where event loop comes into picture
- job of the event loop is to constantly monitor the message queue and the execution stack and to push the first callback function to the execution stack when it is empty
- new execution context is created for the callback and executed

#### The Old Way: Asynchronous Javascript with Callbacks

- callback hell
- promises in ES6 to resolve the callback hell

```javascript
function getRecipe() {
  setTimeout(() => {
    // list of IDs
    const recipeID = [1, 2, 3, 4];
    console.log(recipeId);
    // recipe from ID
    setTimeout(
      id => {
        const recipe = {
          title: 'Fresh tomato pasta',
          publisher: 'Jonas'
        };
        console.log(`${id} - ${recipe.title}`);
        // another recipe from the publisher of the previous result
        setTimeout(
          publisher => {
            const recipe = {
              title: 'Italian Pizza',
              publisher: 'Jonas'
            };
            connsole.log(recipe);
          },
          1500,
          recipe.publisher
        );
      },
      1000,
      recipeId[2]
    ); // the third param to the setTimeout will be passed to the callback function param
  }, 1500);
}

getRecipe();
```

#### From callback hell to promises

- Promises ES6 feature to deal with async JS
- what is a promise
- a promise is a object that keeps track about wether a certain event has happened already or not
- determines what happens after the event has happened
- events is async event like timer, api calls etc
- promise implements the concept of a future value that we are expecting
- its like saying get me some data from the server in the background
- and promise, promises us to the get the data
- so that we can handle it in the future
- Promise states, pending -> event happens -> settled/resolved
- promises success -> state become fulfilled else rejected
- we can produce and consume a promise
- we can use .then() and .catch() on the promise
- inside promise we have executor function this usually has a async function resolve returns the successful data else use reject function
- .then() takes the callback and this recieves the data of the successfull resolve

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([523, 883, 432, 974]);
  }, 1500);
});
const getRecipe = recID => {
  return new Promise((resolve, reject) => {
    setTimeout(
      ID => {
        const recipe = { title: 'Fresh tomato pasta', publisher: 'Jonas' };
        resolve(`${ID}: ${recipe.title}`);
      },
      1500,
      recID
    );
  });
};
const getRelated = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(
      pub => {
        const recipe = { title: 'Italian Pizza', publisher: 'Jonas' };
        resolve(`${pub}: ${recipe.title}`);
      },
      1500,
      publisher
    );
  });
};
getIDs
  .then(IDs => {
    console.log(IDs);
    return getRecipe(IDs[2]);
  })
  .then(recipe => {
    console.log(recipe);
    return getRelated('Jonas Schmedtmann');
  })
  .then(recipe => {
    console.log(recipe);
  })
  .catch(error => {
    console.log('Error!!');
  });
```

#### From Promises to Async/Await

- introduced in es8
- designed to consume promises not produce promise (produce is still new Promise())
- inside async function we can have one or more awaits
- await stops execution until it is resolved

```javascript
async function getRecipesAW() {
  const IDs = await getIDs;
  console.log(IDs);
  const recipe = await getRecipe(IDs[2]);
  console.log(recipe);
  const related = await getRelated('Jonas Schmedtmann');
  console.log(related);
  return recipe;
}

/*
const res = getRecipesAW()
console.log(res) // this is a promise hence not the expected result 
async function returns a promise on which we can use the then() method
*/
getRecipesAW().then(result => console.log(`${result} is the best ever!`));
```

#### Ajax and APIs

- ajax -> asynchronous javascript and xml -> helps communicating with the server without reloading the page, fetch allows us to do ajax
- APIs , application programming interface

- fetch() is a not a part of the Javascript engine, its a method made available by the browser, part of the web API
- fetch returns a promise it can have .then() and .catch() methods
- the result of fecth is a readable stream and .json converts it to javascript format

```javascript
function getWeather(woeid) {
  fetch(
    `https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`
  )
    .then(result => {
      // console.log(result);
      return result.json();
    })
    .then(data => {
      // console.log(data);
      const today = data.consolidated_weather[0];
      console.log(
        `Temperatures today in ${data.title} stay between ${
          today.min_temp
        } and ${today.max_temp}.`
      );
    })
    .catch(error => console.log(error));
}
getWeather(2487956);
getWeather(44418);
async function getWeatherAW(woeid) {
  try {
    const result = await fetch(
      `https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`
    );
    const data = await result.json();
    const tomorrow = data.consolidated_weather[1];
    console.log(
      `Temperatures tomorrow in ${data.title} stay between ${
        tomorrow.min_temp
      } and ${tomorrow.max_temp}.`
    );
    return data;
  } catch (error) {
    alert(error);
  }
}
getWeatherAW(2487956);

let dataLondon;
getWeatherAW(44418).then(data => {
  dataLondon = data;
  console.log(dataLondon);
});
```
