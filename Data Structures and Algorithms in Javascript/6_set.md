# Sets

collection of unordered distinct items.

#### mathematically speaking

set is collection of distinct objects

List of object within a set is surrounded by `{}`

null/ empty set is a set containing no objects

#### Set Class

```
// JS objectsdo not allow you to have two properties on same key
class Set {
  constructor(){
    this.item={}; // object instead of array
  }
}
```

#### Methods for Set Class

`add(element)`, Adds new element to the set.

`delete(element)`, removes element from set,

`has(element)`, returns true if element exists else false.

`clear()`, removes all elements from set.

`size()`, returns count of elements in the set

`values()`, returns an array of elements of the set

#### has(element)

this is done first as add and delete uses the has methods to check if element already exists.

```
has(element){
  return element in this.items;
  // return Object.prototype.hasOwnProperty.call(this.items, element); call is used to prevent any overshadowing done by inheritance
  // return this.items.hasOwnProperty(element);
}
```

#### add method

```
add(element){
  if(!this.has(element)){
    thie.items[element] = element;
    return true;
  }
  return false;
}
```

#### delete and clear

```
delete(element){
  if(this.has(element)){
    delete this.items[element];
    return true;
  }
  return false;
}

clear(){
  this.items = {};
}

size(){
  return Object.keys(this.items).length;
}

values(){
  return Object.values(this.items);
}
```

#### Set Operations

common application of set in computer science is `databases`.

base of sql joins are set operations. Following are the set operations that can be performed.

`union`, given two sets it returns a new set with elements of all given sets.

`intersection`, given two sets, returns set with common elements found in both.

`difference`, given two sets it return a new set with elements of first not present in the second.

`subset`, this confirms with given set is sub-set of another.

#### Set union

A union B = x , where x is either in A or B

```
union(otherSet){
  const unionset = new set()
  this.values().forEach(value = unionset.add(value));
  otherSet.values().forEach(value = unionset.add(value));
}

intersection(otherSet){
  const intersectionSet = new Set();
  const values = this.values();
  const otherValues = otherSet.values();
  let biggerSet = values;
  let smallerSet = otherValues;
  if (smallerSet.length -biggerSet.length > 0){
    smallerSet = values;
    biggerSet = otherValues;
  }
  smaller.forEach(value => {
    if(biggerSet.has(value)){
      instersectionSet.add(value);
    }
  });
  return intersectionSet;
}

difference(otherSet){
  const differenceSet = new Set();
  this.value().forEach(value => {
    if(!otherSet.has(value)){
      differenceSet.add(value)
    }
  });
  return differenceSet;
}

isSubsetOf(otherSet){
  if(this.size() > otherSet.size()){
    return false;
  }
  let subSet = true;
  this.values().every(values => {
    if(!otherSet.has(value)){
      subSet = false;
      return false;
    }
    return true;
  })
  return subSet;
}
```
