# String Reversal

- Directions
- Given a string, return a new string with the reversed order of characters
- Examples
- reverse('apple') === 'leppa'
- reverse('hello') === 'olleh'
- reverse('Greetings!') === '!sgniteerG'

```javascript
// solution 1
function reverse(str) {
  return str
    .split()
    .reverse()
    .join();
}
// solution 2
function reverse(str) {
  let reversed = '';
  for (let character of str) {
    reversed = character + reversed;
  }
  return reversed;
}

// solution 3
function reverse(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

module.exports = reverse;
```

#### debugger statements

- `debugger`, pauses the execution
- node inspect reversestring/index.js
- type `c` or `cont` to continue to reach the next debug statement
- type `repl` to start a javascript console mode where we can read, edit , inspect varaibles, eval expresssion etc.

- steps
- add `debugger` statement in the funciton
- call the function manually
- at the terminal run `node inspect file_name.js`
- to continue execution press 'c' then 'enter'
- to launch a repl session type repl and hit enter
- to exit repl press ctrl+c
