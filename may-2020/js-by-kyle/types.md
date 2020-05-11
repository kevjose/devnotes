## Types

- primitive types

- in js everything is not an object eg: false is not an object, most of the types can behave like an object
- undefined type value is undefined
- string type
- number
- boolean type with value true and false
- object type with many types
- symbol type to create pseudo private keys
- the above are the primitive types

- undecalred? value as a type
- null? historical bug
- function? a subtype of object, a callable objects
- arrays? a subtype of object type with numeric indexing
- bigint? large integer, already in stage 3 and likely as a primitive type
- types are associated with characteristics
- in js the variables dont have types, the values do
- typeof operator, determines the type of the value, returns a string, only some strings
- typeof null -> "object", historical error
- typeof function(){} -> "function"
- typeof [1,2] -> "object", just historical reason, other helper available for the same like Array.isArray()
- undefined vs undeclared, not synonyms, new in es6 - temporal dead zone or uninitialized (blocked scoped values does not get the value undefined in the begining)
- special value within the primitives, NaN special value to indicate an invalid number
- Number("n/a") // NaN
- also NaN === NaN //false
- determine a value is NaN use isNaN
- isNaN("my sons age") -> value is coerced to Number first
- to rectify the above in es6 Number.isNaN, specifically NaN
- typeof NaN -> 'number'
- negative zero, zero value with a sign bit. a = -0; a.toString() -> "0",
- from above a === 0, -> true
- in es6 Object.is(a,-0)// true Object.is is like a quadruple equality
- Object.is(a, 0) // false, also can be used for NaN check
- Object.is polyfill

```javascript
if(!Object.is || true /* temporary */){
  Object.is = function ObjectIs(x,y){
    var xNegZero = isItNegZero(x);
    var yNegZero = isItNegZero(y);
    if (xNegZero || yNegZero){
      return xNegZero && yNegZero;
    }
    elseif(isItNaN(x) && isItNaN(y)){
      return true;
    }else if(x === y){
      return true;
    }

    /** to test -negative zero**/
    function isItNegZero(v){
      return v == 0 && (1/v) == -Infinity;
    }
    /* to test NaN without builtin*/
    function isitNaN(v){
      return v!==v;
    }
  }
}

```

- fundamentaal objects aka built in objects or native function
- use new with Object(), Array(), Function(), Date(), RegExp(), Error()
- without new, String(), Number(), Boolean use as functions and not as constructor
