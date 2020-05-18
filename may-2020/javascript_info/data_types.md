## Methods of primitives

- javascript allows to work with primitives as though they were objects (provide methods to call)
- this is allowed via object wrapper, to provide method access on primitives an object wrapper that provides the method is created and then destroyed.
- some object wrappers are `String`, `Number`, `Boolean`, `Symbol`
- the above provide special methods to the primitives

```javascript
let str = 'Hello';
console.log(str.toUpperCase());
```

- `str` is a primitive string, so the moment of accessing `toUpperCase` a special object is created that knows the value of `str` and has methods like `toUpperCase`, the method runs and return the result and is destroyed, leaving the primitive `str`

### Numbers

- regular number(double precision floating point numbers) and bigInt(needed when regular number exceed 2^53, -2^53)
- in js we can shorten the number by appending `e` to the number and specifying 0

```javascript
let billion = 1e9; // 1 billion 1 and 9 zeros
console.log(7.3e9); // 7,300,000,000 // 7.3 * 1000000000
let ms = 1e-6; // 0.000001 (1/1000000)
```

- `toString(base)`, return string representation of num in given base

```javascript
let num = 255;
console.log(num.toString(16)); //ff
console.log(num.toString(2)); //11111111

console.log((123456).toString(36)); // 2n9c two dots not a typo the first dot is considered a decimal point, this is how you call a methods directly on a number
```

- Rounding `Math.floor`(3.1->3, -1.1 -> -2), `Math.ceil`(3.1->4, -1.1 -> -1), `Math.round`(3.1->3, 3.6-> 4, -1.1->-1), `Math.trunc`(remove the decimal part, no support in IE)
- round of to n place using `toFixed(n)`, returns string

- imprecise calculations

```javascript
console.log(1e500); // Infinity
console.log(0.1 + 0.2 == 0.3); // false 0.1 and 0.2 are unending expression when converted to binary
// solution
console.log(+(0.1 + 0.2).toFixed(2)); // 0.3
```

- because of internal representation of number there exists two 0 (0, -0) this is because of the sign bit
- Tests, inFinite and isNaN
- iSNaN converts argument to number and then test wether that number is NaN
- isFinite converts argument to number and returns true is number is regular and not any of NaN/Infinity/-Infinity

```javascript
// Infinity(greater) and -Infinity(less) than any other value
//
// NaN === NaN // false
```

- `Object.is` compares like `===` but more reliabel for edge cases `Object.is(NaN, NaN)=== true // true`, also value `Object.is(0,-0)=== false// true`, ie (0,-0) are treated differently `in Object.is`
- parseInt and parseFloat, read number from a string until they cant, the first read should be a number though, otherwise return a NaN
- both parseInt and parseFloat have a second radix argument, this specifies a base
- `Math` object

```javascript
Math.random(), returns number between 0 and 1 not including 1
Math.max(a,b,c)
Math.min(a,b,c)
Math.pow(2,10) //1024
```
