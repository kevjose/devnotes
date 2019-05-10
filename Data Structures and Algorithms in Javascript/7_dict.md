# The dict

used to store key value pair. (in set we were interested only in the value, set is [key, key], dict is [key, value]). Also known as map, symbol table, associative array.

```
function toStrFunc(item){
  if(!item){
    return 'NULL'
  }
  if(typeof item == 'string' || item isInstanceof String){
    return `${item}`;
  }
  return item.toString
}

class Dictionary{
  constructor(toStrFunc = toStrFunc){
    this.toStr = toStrFunc
    this.pair = {};
  }

}
```

#### methods available for dictionary

`set(key, value)`, adds a new key value, if key already present, it will be overwritten.

`revmove(key)`, removes the value by key.

`hasKey(key)`, returns true is key in dictionary

`get(key)`, return the value of the key.

`clear()`, clears alls values from dictionary

`size()`, returns number of values from the dictionary.

`isEmpty()`, returns true if size is 0.

`keys()`, return all keys of dictionary as an array.

`value()`, returns all values of the dictionary as an array.

`keyValues()`, returns array of [key, value] from dictionary.

`forEach(cb)`, this method iterates over every values in the dictionary, the cb function has two parameter key, value and can be interrupted as the `every()` method from the Array.

#### has key function

```
hasKey(key){
  return this.table[this.toStr(key)]!== null)
}
```

```

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }

  keyValues() {
    return Object.values(this.table);
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.table).length;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
```

# The Hash Table

also known as hashmap an implementation of the dictionary class.
`Hashing` is finding the element in the data structure in the shortest possible time.

`hash function`, given a key, the function will return an address in the table where the value is.

`lose-lose hash function`, takes the ascii sum of the keys

#### hash table class

```
class HashTable {
  constructor(toStr = toStrFunc){
    this.toStr = toStr;
    this.table = {};
  }
}
```

#### available methods

`put(key, value)`, upserts new item to the table.

`remove(key)`, removes value from table using the key.

`get(key)`, returns the value of the key being searched.

#### loselose hash function

```
loseloseHashCode(key){
  if(typeof key == 'number'){
    return key;
  }
  let hash = 0
  const tableKey = this.toStr(key);
  for(let i = 0; i<tableKey.length; i++){
    hash += tablekey.charCodeAt(i);
  }
  return hash % 37;
}

hashCode(key){
  return this.loseloseHashCode(key);
}

put(key, value) {
  if (key != null && value != null) {
    const position = this.hashCode(key);
    this.table[position] = new ValuePair(key, value);
    return true;
  }
  return false;
}

get(key) {
  const valuePair = this.table[this.hashCode(key)];
  return valuePair == null ? undefined : valuePair.value;
}

remove(key) {
  const hash = this.hashCode(key);
  const valuePair = this.table[hash];
  if (valuePair != null) {
    delete this.table[hash];
    return true;
  }
  return false;
}

getTable() {
  return this.table;
}

isEmpty() {
  return this.size() === 0;
}

size() {
  return Object.keys(this.table).length;
}

clear() {
  this.table = {};
}

toString() {
  if (this.isEmpty()) {
    return '';
  }
  const keys = Object.keys(this.table);
  let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
  for (let i = 1; i < keys.length; i++) {
    objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
  }
  return objString;
}
```

# Handling collisions

1. Separate Chaining
2. Linear Probing
