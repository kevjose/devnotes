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

- fundamental objects aka built in objects or native function
- use new with Object(), Array(), Function(), Date(), RegExp(), Error()
- without new, String(), Number(), Boolean use as functions and not as constructor

### Abstract operations

- type coversion same is coersion
  ToPrimitve(hint) -> abstract opertaions
- function in js are inherently recursive, is non primitive is put again in ToPrimitive, recursively
- any non primitive has valueOf and toString function
- toPrimitve invokes these valueOf and toString to get a primitive.
- coersion is done with valueOf and toString property

- ToString, operation null->'null' undefined -> 'undefined' -0 -> '0' (corner case)
- [1,2,3] toString '1,2,3'
- [null, undefined] toString ',' the string 'null' and 'undefined' are left out
- {} toString "[object Object]"
- {a:2} toString "[object Object]"
- {toString(){return "X"}} toString "X"

- ToNumber
- "" toNumber 0
- "0" toNumber 0
- "0." -> 0
- ".0" -> 0
- "." -> NaN
- " 0009 " -> 9
- false toNumber 0
- true toNumber 1
- null toNumber 0
- undefined toNumber NaN

- for [] and {} by default {valueO(){return this;}}

- ToBoolean, does not invoke the toPrimitve function just a lookup , unlike the toString and toNumber
- lookup if truthy or false
- falsy, "",0,-0, null, NaN, false, undefined
- truthy otherwise

#### Cases of coercion

- the template literals uses coercion, implicity
- - operator overload, if either operand is a string, it does a abstract toString operation
- unary + invokes toNumber operation
- `-` operator is not overloaded, it invokes a toNumber on the string operand

#### Boxing

- accesing properties on primitive value, how does this work, this is called boxing, a form of implicit coercion, use it as if it were an object, this is where the notion from where evrything in js in an object
- corner case of coercion, Number("") -> 0
- String([null]) -> "0"
- String([undefined]) -> "0"
- Boolean(new Boolean(false)) -> true
- 1<2<3 , accident 1<2 gets evaluate to true true<3 a toNumber invoked on so 1<3 so this is actually an accident
- 3>2>1 => 1>1 -> false which is not correct

- adopt a coding style that makes value types plain and obivious
