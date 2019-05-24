# Arrays in es6

```javascript
const boxes = document.querySeclectorAll('.box');
// the above returns a nodelist and has to converted to an array
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArra5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerBlue';
});

// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => (cur.style.backgroundColor = 'dodgerblue'));
```

To loop over an array we normally use the `map`or the `forEach` method,
the problem with these is that we cannot break in between

in es5 we can use `for` loop with break, continue etc.

```javascript
//ES5

for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === 'box blue') {
    continue; // skips the current iteration
  }
  boxesArr5[i].textContent = 'I changed to blue';
}

// ES6
for (const cur of boxesArr6) {
  if (cur.className.inlcudes('blue')) {
    continue;
  }
  cur.textContent = 'I changed to blue';
}
```

to find element in array we has indexOf

new methods available in ES6

```diff
//ES5
var ages = [12, 17, 8, 21];
-var fullAges = ages.map(function(cur) {
-  return cur >= 18;
-});
-console.log(full); //[false, false, false, true]

-full.indexOf(true); //3
-ages[full.indexOf(true)]; // 21

//ES6 find and findIndex Method
+ages.findIndex(cur => cur >= 18); // 3
+ages.find(cur => cur >= 18); // 21
```
