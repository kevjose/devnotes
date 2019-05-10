# Arrays

JS supports arrays natively.
Traditionally arrays stores data sequentially with same datatype, however, we can store different datatypes within same array in javascript.

Use array to group variables of same type.

#### Creating and initializing array

var a = new Array() // empty array using Array constructor
var b = new Array(7) // empty array with fixed length
var c = new Array(1,2,3,4,5,6,7,8) // initialize with values

however the common way of doign this is `var d = []` i.e using empty brackets or `var e = [1,2,3,4,5]`
use the `.length` property to check the size of the array

#### Accessing elements and iterating

pass the index of the position to be accessed.
arrays in JS are `0` indexed.

```
// fibonacci series with arrays & loops

var fibonacci = [];
fibonacci[0] = 1;
fibonacci[1] = 1;
fibonacci[2] = 2;
for(let i = 3; i<20; i++ ){
  fibonacci[i] = fibonacci[i-1]+ fibonacci[i-2];
}
console.log(fibonacci);
```

#### Adding elements

JS array is mutable, we can add elements to the same array dynamically.

```
var a = [1,2,3,4,5,6,7,8,9]
// to add element at the end
a[a.length] = 10
```

#### Adding elements using the push method

`push` allows to add element at the end of an array

```
a.push(11)
console.log(a); //[1,2,3,4,5,6,7,8,9,10,11]
```

#### Inserting elements in the begining

free the first element, shift elements one right

```
for(let i = a.length; i>=0; i++){
  a[i] = a[i-1];
}
a[0] = -1 // new value to assign
```

#### Inserting the elements in the begining using the unshift() method

`unshift` method insert the value passed at the beigning of the array.

```
a.unshift(-2);
a.unshift(-3,-4);
```

#### Removing elements

`pop()` method can be used to remove element from the end

#### Removing an element from first position

```
for(let i = 0; i<a.length; i++){
  a[i] = a[i+1];
}
```

#### Using the shift method

`shift()` method can be used to remove element from the begining

#### Adding and removing elements from the specific position

the `splice` method is used to remove an element from an array by simply specifying the position/index that we would like to delete from and how many elements we would like to remove.

```
let a = [1,2,3,4,5,6,7,8,9,10]
a.splice(5,2)
//(2) [6, 7]
a
//(8) [1, 2, 3, 4, 5, 8, 9, 10]
```

> `delete` operator can also be used to remove element, however, the delete operator will replace value with `undefined`.

```
a.splice(index, howmany, item1, ....., itemX)
```

# Two dimensional and multi-dimensional array

Javascript only supports one dimensional arrays. However multi-dimensional arrays can be implemented using array of arrays. Multi-dimensional arrays can be iterated over by using nested lo.

# Javascript array methods

In JS Arrays are modified objects. Every array inherits a few methods that can be used over it.

`concat`, joins mulitple arrays and returns a copy of the same.

`every`, iterates over every element based on conditon (function) till it returns _false_

`filer`, creates new array with elements that evaluate to _true_ in the function provided

`forEach`, executes specific function on each element of the array

`join`, this joins all the elements to form a string

`indexOf`, searches the array for speific element and return its position else -1

`lastIndexOf`, returns the position of the last item matching the search criteria

`map`, creates a new array and return elements evaluating to a given conditon (function)

`reverse`, reverses the array

`slice`, returns a new array from the specified position

`some`, iterates over every element based on conditon (function) till it returns _true_

`sort`, sorts alphabetically or by function provided

`toString`, returns the array as string

`reduce`, reduce method receives previous, current, index and array. reduce can be used to return value that will added to a accumulator that will returned once reduce finishes execution.

# ES6 and new Array features

`@@iterator`, returns iterator object containing value of the array, can iterate over using the .next() method

```
let a = [1,2,3,4,5,6,7,8,9]
a[Symbol.iterator]()
//Array Iterator {}
a[Symbol.iterator]().next()
//{value: 1, done: false}
//done becomes true once all elements are iterated over
```

`copy-within`, copies a sequence of values of the array from a given position.

`entries`, returns `@@iterator` that contains key/value pair

```
a.entries()
Array Iterator {}
a.entries().next()
{value: Array(2), done: false}
// value[0], key
// value[1], value
```

`includes`, returns true if element is found else false

`find`, returns the element in case it is found else undefined

```
var array1 = [5, 12, 8, 130, 44];
var found = array1.find(function(element) {
  return element == 10;
});
```

`findeIndex`, return index , same as find

`fill`, fills the array with static value

`from`, creates new array from the existing one

`keys`, return `@@iterator` that contatins keys of the array

`of`, this creates array from the args passed to the function

```
var numbers = Array.of(1,2,3,4,5);
console.log(numbers);
//Array [1, 2, 3, 4, 5]
```

`values`, return the `@@iterator` containing the values of the array.

#### forEach with arrow function

```
let numbers = [1,2,3,4,5,6]
numbers.forEach((num)=> console.log(num))
> 1
> 2
> 3
> 4
> 5
> 6
```

#### for..of loop

```
let numbers = [1,2,3,4,5,6]
for(n of numbers){
  console.log(n);
}
> 1
> 2
> 3
> 4
> 5
> 6
```

# The TypedArray class

like array however works only with single datatype
let arr = new TypedArray(lenght)
here `TypedArray` needs to be any of
Int8Array(), Unit8Array() etc.

TypedArray works great with WebGL APIs, manipulate bits, files and images.
