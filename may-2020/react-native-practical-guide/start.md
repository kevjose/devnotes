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
