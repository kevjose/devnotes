# Budgety

A budget app

It can add income and add expenses and at any point it tell us the budget

It also shows how much each expenses has contributed from the income in percentages

It show overall expense from income in percent

#### Project Planning and Architecture

Identify the fundamental part the app should have

1. add event handler
2. get input values
3. add new item to data structure
4. add new item to the UI
5. Calculate budget
6. Update the UI

#### Structure the code with Modules

1. Important for a robust applicatin
2. Allows clean and organised code
3. Exncapsulate the data privacy and expose other data publically

Modules help us break the code into logical units and then interact with one another

#### Modules in our project

1. UI Module - Get input value, add new item to UI, update UI
2. Data Module - Add new item to data structure, calculate budget
3. Controller Module - Add event handler, interat between other modules

#### Implementing Module Pattern

1. Modules Pattern allows data encapsulation
2. allows methods that are private and some that are publically available

```javascript
var budgetController = (function() {
  // IIFE
  var x = 23; // private
  var add = function(a) {
    // private - cannot be access from outside
    return x + a;
  };
  return {
    // closure
    publicTest: function(b) {
      // this is returned to be accessed publically
      return add(b);
    }
  };
})();

var UIController = (function() {
  // Some Code
})();

// the above to are independent, because of separation of concers, however we want them to interact, this can be done below
var controller = (function(budegtCtrl, UICtrl) {
  // we can use original controller inside here as they re defined in global scope, however that will make the code coupled
  // have a different name so that even if original names are changed we dont have to change code inside
  var z = budgetCtrl.publicTest(5);
  return {
    anotherPublic: function() {
      console.log(z);
    }
  };
})(budgetController, UIController);
```

The IIFE returns immediately however the publicTest method being a closure will still have access to so called private methods i.e add method and x variable

#### Setting up event listeners

```javascript
// BUDGET CONTROLLER
var budgetController = (function() {
  // Some Code
})();

// UI CONTROLLER
var UIController = (function() {
  // Some Code
})();

// APP CONTROLLER (point of interaction between other controllers)
var controller = (function(budgetCtrl, UICtrl) {
  // Define a common function for both the events
  var ctrlAddItem = function() {
    // 1. Get the filed input data
    // 2. Add item to the budget controller
    // 3. Add item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  // keypress is on the document not only any particular dom element
  document.addEventListener('keypress', function(event) {
    // console.log(event); // keyboard event object with lot of properties
    if (event.keyCode === 13 || event.which === 13) {
      // event.which is for older browers where event.keyCode is not available
      console.log('ENTER was pressed');
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
```

#### Reading Input Data

We define methods in the UI and Budget Controller and call this in the app controller

```javascript
var UIController = (function() {
  return {
    getInput: function() {
      // var type = document.querySelector('.add__type').value; // reads the value to type, will be either inc or exp
      // var description = document.quesrySelector('.add__description').value;
      // var value = document.querySelector('.add__value').value;
      // return all three so better return an object
      return {
        type: document.querySelector('.add__type').value, // reads the value to type, will be either inc or exp
        description: document.quesrySelector('.add__description').value,
        value: document.querySelector('.add__value').value
      };
    }
  };
})();

// call the above defined get input in the app controller

var controller = (function(budgetCtrl, UICtrl) {
  // Define a common function for both the events
  var ctrlAddItem = function() {
    // 1. Get the field input data
    var input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    console.log(input);
    // 2. Add item to the budget controller
    // 3. Add item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  // keypress is on the document not only any particular dom element
  document.addEventListener('keypress', function(event) {
    // console.log(event); // keyboard event object with lot of properties
    if (event.keyCode === 13 || event.which === 13) {
      // event.which is for older browers where event.keyCode is not available
      console.log('ENTER was pressed');
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
```

Problem with the above lot of string values , if any change in the UI class names this is difficult to track and change

- solution: create and object all store all the data in the UIController

```javascript
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
  return {
    getInput: function() {
      // var type = document.querySelector('.add__type').value; // reads the value to type, will be either inc or exp
      // var description = document.quesrySelector('.add__description').value;
      // var value = document.querySelector('.add__value').value;
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.quesrySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  // Define a common function for both the events
  var DOM = UICtrl.getDOMstrings;
  var ctrlAddItem = function() {
    // 1. Get the field input data
    var input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    console.log(input);
    // 2. Add item to the budget controller
    // 3. Add item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
  // keypress is on the document not only any particular dom element
  document.addEventListener('keypress', function(event) {
    // console.log(event); // keyboard event object with lot of properties
    if (event.keyCode === 13 || event.which === 13) {
      // event.which is for older browers where event.keyCode is not available
      console.log('ENTER was pressed');
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
```

#### Creating an initialization function

in the app controller we have all decalaration etc scattered.
We only need functions, no variables hanging around.

Cleaning the app controller

```javascript
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    // 1. Get the field input data
    var input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    // 2. Add item to the budget controller
    // 3. Add item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init(); // only line of code placed outside
```

#### creating income and expense contructors

- How to choose function constructors for the application's need
- How to set up a proper data structure for out bugdet controller

```javascript
var bugetController = (function() {
  // choose data structure - object
  var Expense = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      expenses: [],
      incomes: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
})();
```

#### Adding a new item to our budget controller

- how to avoid conflicts in our data structures
- how and why to pass data from one module to another

```javascript
var bugetController = (function() {
  // choose data structure - object
  var Expense = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      expenses: [],
      incomes: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem: function(type, des, val) {
      // ID is unique for each new item
      // ID == last ID +1

      var newItem, ID;
      ID = data.allItems[type][data.allItems[type].length - 1].ID + 1 || 0;
      // Create new Item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // Push to our data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    // 2. Add item to the budget controller
    newItem = budegtCtrl.addItem(input.type, input.description, input.value);
    // 3. Add item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
```

#### Adding new item to the UI

- A techinque for adding big chunks of HTMl into the DOM
- How to replace parts of strings
- How to do DOM manipulation using the insertAdjacentHTMl method

```javascript
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses_list'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.quesrySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    // 2. Add item to the budget controller
    newItem = budegtCtrl.addItem(input.type, input.description, input.value);
    // 3. Add item to UI
    UICtrl.addListItem(newItem, input.type);
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
```

#### Clearing the input fields

- How to clear HTMl fields
- How to use querySelectorAll,
- How to convert list to an array
- A better way to loop over an array than the `for` loop ie. `forEach`

this deals with UIController

```javascript
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses_list'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.quesrySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Converts toa  floating  number
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function(){
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription+', '+ DOMstrings.inputValue);// this returns a list not an array it doesnt have array method
      // use array method slice to pass a list that returns an array
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array){ // here array is fieldsArray
        current.value = "";
      })
      fieldsArr[0].focus(); // sets the focus back to description

    }

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    // 2. Add item to the budget controller
    newItem = budegtCtrl.addItem(input.type, input.description, input.value);
    // 3. Add item to UI
    UICtrl.addListItem(newItem, input.type);
    // 3a. Clear the input fields
    UICtrl.clearFields();
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();

```

#### Updating the BudgetController

- How to convert input fields to numbers - parseFloat
- How to prevent false inputs

```javascript

var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses_list'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.quesrySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Converts toa  floating  number
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function(){
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription+', '+ DOMstrings.inputValue);// this returns a list not an array it doesnt have array method
      // use array method slice to pass a list that returns an array
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array){ // here array is fieldsArray
        current.value = "";
      })
      fieldsArr[0].focus(); // sets the focus back to description

    }

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function() {
    // 1. Calculate the budget
    // 2. Return the budget
    // 3. Display the Budget on the UI
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    if(input.description !== '' && !isNan(input.value) && input.value > 0){
      // 2. Add item to the budget controller
      newItem = budegtCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the input fields
      UICtrl.clearFields();
      // 5. Calculate and update the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
```

#### Updating the Budget: BugetController

- How and why to create simpole reusable functions with only one purpose
- how to sum all element using the forEach method

```javascript
var bugetController = (function() {
  // choose data structure - object
  var Expense = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      expenses: [],
      incomes: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItem: function(type, des, val) {
      // ID is unique for each new item
      // ID == last ID +1

      var newItem, ID;
      ID = data.allItems[type][data.allItems[type].length - 1].ID + 1 || 0;
      // Create new Item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // Push to our data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget: income -expense
      data.budget = data.totals['inc'] - data.totals['exp'];
      // calculate the percentaget of income that we spent
      if(data.totals.inc >0){
        data.percentage = Math.round(
          (data.totals['exp'] / data.total['inc']) * 100
        );
      }else{
        data.percentage = -1;
      }
    },
    getBudget = function(){
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function() {
    var budget;
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    budget = budgetCtrl.getBudget();
    // 3. Display the Budget on the UI
    console.log(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    if (input.description !== '' && !isNan(input.value) && input.value > 0) {
      // 2. Add item to the budget controller
      newItem = budegtCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the input fields
      UICtrl.clearFields();
      // 5. Calculate and update the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
```

#### Updating the Budget: UI Controller

- Practice DOM manipulation by updating the budget and the total values

```javascript
var bugetController = (function() {
  // choose data structure - object
  var Expense = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItem: function(type, des, val) {
      // ID is unique for each new item
      // ID == last ID +1

      var newItem, ID;
      if (data.allItems[type] > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].ID + 1;
      } else {
        ID = 0;
      }

      // Create new Item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // Push to our data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget: income -expense
      data.budget = data.totals['inc'] - data.totals['exp'];
      // calculate the percentaget of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(
          (data.totals['exp'] / data.totals['inc']) * 100
        );
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    }
  };
})();

var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Converts toa  floating  number
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      ); // this returns a list not an array it doesnt have array method
      // use array method slice to pass a list that returns an array
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array) {
        // here array is fieldsArray
        current.value = '';
      });
      fieldsArr[0].focus(); // sets the focus back to description
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function() {
    var budget;
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    budget = budgetCtrl.getBudget();
    // 3. Display the Budget on the UI
    console.log(budget);
    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the input fields
      UICtrl.clearFields();
      // 5. Calculate and update the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('App has started');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(bugetController, UIController);

controller.init();
```

#### Project Plannin: Part 2

- TO-DO list, Add event handler for delete button, delete item from data structure, delete item from the UI, re-calculate budget, update the UI

#### Event Delegation

- event bubbling, when an event is triggered on dom element , then same event is triggered on parent element as well, on at a time
- element that caused the event is called the target element
- this target is stored as a property in the event object, ie all the parent will know the target,
- from the above we can attach an event on the parent and wait for the event to bubble up , this is called `event delegation`
- use case for event delegation 1. when element has lot of child elements 2. when element we are interested in is not in DOM on load, hence no way to attach an event to the non existent DOM

#### Setting up the Delete event using event delegation

- How to use event delegation in practice
- How to use IDs in HTML to connect to UI with data model
- How to use parentNode property for the DOM traversing

```javascript
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Converts toa  floating  number
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      ); // this returns a list not an array it doesnt have array method
      // use array method slice to pass a list that returns an array
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array) {
        // here array is fieldsArray
        current.value = '';
      });
      fieldsArr[0].focus(); // sets the focus back to description
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Attach the event listener, attach the event to the parent not the list elements, use event delegation to delete the list item intended
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function() {
    var budget;
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    budget = budgetCtrl.getBudget();
    // 3. Display the Budget on the UI
    console.log(budget);
    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the input fields
      UICtrl.clearFields();
      // 5. Calculate and update the budget
      updateBudget();
    }
  };

  var ctrlDeleteItem = function(event) {
    // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // inc-1 use .split() to split thisto get type and id
      splitID = itemID.split('-');
      type = splitId[0];
      ID = parseInt(splitID[1]);

      // 1. Delete the items from the data structure
      // 2. Delete item from the UI
      // 3. Update ansd show the new budget
    }
  };

  return {
    init: function() {
      console.log('App has started');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(bugetController, UIController);
```

- DOM traversal, event.target returns an HTMl, use the parentNode property to traverse
- split method is available to a string as JS coerces the string to an object and on Objects we can call methods, hence we have methods on primitives as well

#### Deleting an item from the budget controller

- yet another loop over and array: map
- how to remove elements from an array using the splice method

```javascript
var bugetController = (function() {
  // choose data structure - object
  var Expense = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    // use captial for function constructor
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItem: function(type, des, val) {
      // ID is unique for each new item
      // ID == last ID +1

      var newItem, ID;
      if (data.allItems[type] > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].ID + 1;
      } else {
        ID = 0;
      }

      // Create new Item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // Push to our data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },
    deleteItem: function(type, id) {
      var ids, index;
      // id = 3, cannot directly access this id as the ids are not in order
      // map() returns a brand new array
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      // delete the above from the allitems[type] array using splice(pos_start_of_delete, number_of_element_to_delete)
      if (index !== -1) {
        data.allItem[type].splice(index, 1);
      }
    },
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget: income -expense
      data.budget = data.totals['inc'] - data.totals['exp'];
      // calculate the percentaget of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(
          (data.totals['exp'] / data.totals['inc']) * 100
        );
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    }
  };
})();

var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  };
  return {
    getInput: function() {
      // return all three so better return an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // reads the value to type, will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Converts toa  floating  number
      };
    },

    // obj id newItem passed from ctrlAddItem from app controller
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      ); // this returns a list not an array it doesnt have array method
      // use array method slice to pass a list that returns an array
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array) {
        // here array is fieldsArray
        current.value = '';
      });
      fieldsArr[0].focus(); // sets the focus back to description
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Attach the event listener, attach the event to the parent not the list elements, use event delegation to delete the list item intended
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function() {
    var budget;
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    budget = budgetCtrl.getBudget();
    // 3. Display the Budget on the UI
    console.log(budget);
    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput(); // this is triggered if user press the add__btn or press the keyboard enter
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the input fields
      UICtrl.clearFields();
      // 5. Calculate and update the budget
      updateBudget();
    }
  };

  var ctrlDeleteItem = function(event) {
    // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // inc-1 use .split() to split thisto get type and id
      splitID = itemID.split('-');
      type = splitId[0];
      ID = parseInt(splitID[1]);
      budgetCtrl.deleteItem(type, ID);

      // 1. Delete the items from the data structure
      // 2. Delete item from the UI
      // 3. Update ansd show the new budget
    }
  };

  return {
    init: function() {
      console.log('App has started');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(bugetController, UIController);
```

#### Deleting the item from the UI

-
