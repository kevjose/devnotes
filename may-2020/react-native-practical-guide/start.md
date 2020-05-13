## Getting started

- practice based approach, by building multiple apps

- React.js- JS lib for making user interfaces, typically web developement
- ReactDOM.render adds the web support
- React itself is platform agnostic
- React native, collection of special react components, compiled to native widgets, regular div etc cannot be used, gives access to native platform apis like camera etc. Connects JS to native platform code. Also provide ways to write native code in some cases
- React native compiles to real native app.

### Behind the scenes

- special components not the regular div etc. Only views are compiled and not the logic written in JS
- React `<View>`is converted to `android.view` for android or `UIView` in ios
- logical JS is not compiled, written JS is run on the JS thread (a virtual machine) hosted by the react native app
- a bridge provided by react native between JS logic code and native apis like the camera api etc.

### Expo vs react native cli

- two options for creating a react native app
- Expo third party service, managed app developement workflow, lots of convenience and utility features specailly for some native api functions.
- limited to expo ecosystem.

### Creating first react native app

- need nodejs for the js runtime
- expo init rn-first-app select blank template
- enter name for the app
- cd rn-first-app > npm run start -> open expo cli window
- use vs code to edit code.
- `App.js` hold the code for the content shown.

- A basic starter

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('Ola amigo');
  return (
    <View style={styles.container}>
      <Text>{outputTExt}</TExt>
      <Button title='Change Text' onPress={() => setOutputText('Bye!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

### course outline

- react native basics
- debugging
- real apps , styling components etc.
- responsive and adaptive apps
- navigation
- state management using redux
- shop app
- enhance above app by handling user input validations etc.
- http requests, store data remotely, on a server, database
- user authentication
- native device features, on device storage sqlite etc.
- expo vs no expo workflow
- publish your app
- over the air updates, no re-install completely

### Course goal app

- Core components, compiled to native widgets View, Text, Button, Touchable, Image etc.
- Custom components by composing the core components
- styling, there is no css in react native, use StyleSheet Objects(based on css syntax)

- `$: expo init rn-complete-guide`, select blank template.
- `npm start` to launch expo dev tools

#### Planning the app

- app to save goals, add an input field to input goal, a button to add the input goal to the list, delete the item on tap of the list
- add goal in modal.

#### Flexbox and layouts

- flex position elements , coloumn is default, use flexDirection for changing to 'row'
- justifyContent, align along main axis
- alignItems, align along cross axis
- every View in react native uses flexbox, to organize the child elements
- flexDirection, row, column, row-reverse, column-reverse
- the child has height and width that it needs by default
- to avoid the above give the parent a height, width has no impact on the child elements since for row the LTR is the main axis and elements are fitted along the main axis.
- stretch along cross axis(Top to bottom in case of row) use alignItems:'stretch' on the parent.
- width in case of row , can be controlled by child element using the flex property
- flex: 1 //

```javascript
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={{ padding: 50 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TextInput
          placeholder='Course goal'
          style={{
            width: '80%',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            padding: 10
          }}
        />
        <Button title='Add' />
      </View>
      <View>...</View>
    </View>
  );
}

const styles = StyleSheet.create({});
```

#### Inline styles and StyleSheet objects

- inline downside, harder to follow
- recommended to use StyleSheet object

```javascript
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Course goal' style={styles.input} />
        <Button title='Add' />
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  }
});
```

#### working with state and events

- use hooks
- onChangeText

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // arrow function expression
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
  };
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Course goal'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title='Add' onPress={addGoalHandler} />
      </View>
      <View>
        {courseGoals.map(goal => (
          // text have a very limited styles hence wrap with View
          // key to added to the root that is being repeated
          <View style={styles.listItem} key={goal}>
            <Text>{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10 // not available in css
  }
});
```

- by default react native does not have scroll if list items overflow
- scrolling with ScrollView

```javascript
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView
} from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // arrow function expression
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
  };
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Course goal'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title='Add' onPress={addGoalHandler} />
      </View>
      {/* scrollView makes views scraollable can be subsection or the entire view*/}
      <ScrollView>
        {courseGoals.map(goal => (
          // text have a very limited styles hence wrap with View
          // key to added to the root that is being repeated
          <View style={styles.listItem} key={goal}>
            <Text>{goal}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10 // not available in css
  }
});
```

#### A better list, FlatList

- scrollView is inefficient n case of long list, as it renders it all even the ones not visible on the screen
- to handle long list use FlatList

```javascript
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // arrow function expression
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal }
    ]);
  };
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Course goal'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title='Add' onPress={addGoalHandler} />
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoal}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Text>{itemData.item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10 // not available in css
  }
});
```

#### Splitting app into components

- splitting and lifting states to GoalInput and GoalItem component.

```javascript
// components/GoalItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10 // not available in css
  }
});
// components/GoalInput.js
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  return (
    <View style={styles.inputContainer}>
        <TextInput
          placeholder='Course goal'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title='Add' onPress={() => props.onAddGoal(enteredGoal)} />
        //alternatively <Button title='Add' onPress={props.onAddGoal.bind(this, enteredGoal)} />
      </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  }
})
export default GoalInput;


// App.js
mport React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (goalTitle) => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
  };
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoal}
        renderItem={itemData => (
          <GoalItem title={itemData.item.value}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

```

#### Deleting items

- onPress will not work on custom components, make sure the View within supports the onPress
- TouchableOpacity component, one of the multiple touchable events
- TouchableHighlight component
- TouchableNativeFeedback, only for android (ripple effect)
- TouchableWithoutFeedback

```javascript
// components/GoalItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = props => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10 // not available in css
  }
});

// App.js
mport React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (goalTitle) => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id!= goalId);
    })
  }
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style
  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoal}
        renderItem={itemData => (
          <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={removeGoalHandler}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

```

#### Adding a Modal Overlay

- Modal component, adds a fullscreen overlay
- add a modal to add the goal

```javascript
// components/GoalInput.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('')
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Course goal'
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
        <Button title="Cancel" color='red' onPress={props.onCancel}/>
        <Button title='Add' onPress={addGoalHandler} />
        </View>
        { /*alternatively{' '}
        <Button title='Add' onPress={props.onAddGoal.bind(this, enteredGoal)} /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'60%'
  }
});
export default GoalInput;

// App.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = (goalTitle) => {
    // setCourseGoals([...courseGoals, enteredGoal]); -> this wont garauntee the latest snapshot, use the function one
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id!= goalId);
    })
  }
  // Text has to wrapped in <Text> component, as oppposed to text in HTML
  // <View> to layout and apply style

  const onCancelGoalHandler = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput onAddGoal={addGoalHandler} visible={isAddMode} onCancel={onCancelGoalHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoal}
        renderItem={itemData => (
          <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={removeGoalHandler}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
```

### Debug react-native apps

- types of errors
  -- Error messages or app crash, the red overlay, these maybe syntax errors, reference errors, failing n/w error, writing access blocked to file system etc.
  -- Logical errors, unexpected app behavior, unhandled user behavior,
  -- styling errors, wrong styling, inconsistent layout on android and ios etc.

- `console.log` debugging to understand the flow of code.
- chrome debugger(+Breakpoint) supported in react-native.
- react-native-debugger

### Guess a number app

- the heart of building react native apps: components (builtin and custom components) + layout and styling (custom fonts etc.) + native API modules (later point)
- will cover component + layout and styling (images and custom fonts)
- an application, with a header (Guess a number), starting screen with input with button confirm and reset, button to start a screen with the same header, computer guessed number, suggest lower or greater, alert for cheat(:P if wrong hint was given), summary screen , restart game button
