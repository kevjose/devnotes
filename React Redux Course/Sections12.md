# Redux

- state management library
- makes creating complex applications easier
- not required to create a react app
- not explicitly designed to work with react

#### Redux by analogy

- story (analogy ) to help understand redux
- write some code in codepen with redux only
- work on a react app
- understand how to integrate react with redux

- Redux Cycle
- Action Creator, Action, dispatch, Reducers, State

* Lets build an insurance company
* policy, Customer holds a policy, if bad stuff happens to them then we pay off
* clain, Customer had something bad happen to them, we need to pay them

- claims history, stores a list of all claims every made
- policies, stores a list of who has a policy with our company
- accounting, stores a big bag of cash, we pay people from this.

- customer ->Form->Form Receiver(Front office)->Form(copies of the form is given to all the departments) (Claims History, Policies, Accounting) [not all the departments are concerned with the form given regardles a copy is given to all]
- if a form is a new policy form the only department that concerns is the policy department, regardless the form is given to all the deparments
- again, form to sign for a policy -> policy Department(list of customers with policy)-> new person added
- Management team, tell me who has a policy right now
- Rather than Management having to go and ask for data to the departments all the time maintain a single central repository of data
- the form receiver now send the new form and also hands over the policies data from the central form to the policies department, now policies dept adds the new data and passes it on to the central data repository
- form has two properties -> type: CLAIM, payload, `{name:'', claim_amount:''}`
- insurance will need three types of forms: CREATE_POLICY, CREATE_CLAIM, DELETE_POLICY

#### Mapping analogy to redux

- Action Creator, Person dropping off the form
- Action, the form
- dispatch, form receiver
- reducers, departments
- state, compiled department data

#### Modelling with redux

- Modelling action creators and actions

```javascript
// People dropping off a form (action creator)
const createPolicy = (name, amount) => {
  return {
    // Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};
```

- dispatch is a part of redux library hence no modelling
- Modelling reducers
- inside reducer do not modify existing data structure instead return new copy

```javascript
import { createStore, combineReducers } from 'redux';
// People dropping off a form (action creator)

const createPolicy = (name, amount) => {
  return {
    // Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Departments (reducers)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (Form)
    return [...oldListOfClaims, action.payload];
  }
  // we don't care about the action
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }

  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(policy => policy != action.payload.name);
  }

  return listOfPolicies;
};

// Company setup
const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex'));
store.dispatch(createClaim('Alex', 100));
store.dispatch(deletePolicy('Alex'));

store.dispatch(createPolicy('Alex'));
store.dispatch(createClaim('Alex', 100));
store.dispatch(deletePolicy('Alex'));

store.dispatch(createPolicy('Alex'));
store.dispatch(createClaim('Alex', 100));
store.dispatch(deletePolicy('Alex'));

console.log(store.getState());
```

- combineReducers,
- createStore,
- store.dispatch(ACTION_CREATOR),
- store.getState(),

#### Important redux notes

- To change the state of our app, we call `action_creator` this produces an `action`, which gets fed to `dispatch`, the dispatch forwards the action to all the `reducers`, the reducers returns a new `state` which then waits until new update is needed
