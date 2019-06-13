# Max Char Problem

- Directions
- Given a string, return the character that is most commonly used in the string.
- Examples
- maxChar("abcccccccd") === "c"
- maxChar("apple 1231111") === "1"
- similar questions
- most common character in the string
- does string A have same characters as string B
- does given string have repeated characters in it

```javascript
function maxChar(str) {
  const charMap = {};
  let max = 0;
  let maxChar = '';
  for (char of str) {
    if (charMap[char]) charMap[char]++;
    else charMap[char] = 1;
  }

  for (let char in charMap) {
    if (charMap[char] > map) {
      map = charMap[char];
      maxChar = char;
    }
  }
  return maxChar;
}
```

# FizzBuzz

- Directions
- Write a program that console logs the numbers from 1 to n. But for multiples of three print “fizz” instead of the number and for the multiples of five print “buzz”. For numbers which are multiples of both three and five print “fizzbuzz”.
- Example
- fizzBuzz(5);
- 1
- 2
- fizz
- 4
- buzz

```javascript
function fizzbuzz(n) {
  for (let i = 0; i < n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}
```

# Array chunk problem

- Directions
- Given an array and chunk size, divide the array into many subarrays where each subarray is of length size
- Examples
- chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
- chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
- chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
- chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
- chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

#### solution 1

```javascript
function chunk(array, size) {
  const chunked = [];
  for (let element of array) {
    const last = chunked[chunked.length - 1];
    if (!last || last.length === size) {
      chunked.push([element]);
    } else {
      last.push(element);
    }
  }
  return chunked;
}
```

#### solution 2

```javascript
function chunk(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index = index + size;
  }
  return chucked;
}
```

# Anagrams

- Directions
- Check to see if two provided strings are anagrams of eachother. One string is an anagram of another if it uses the same characters in the same quantity. Only consider characters, not spaces or punctuation. Consider capital letters to be the same as lower case
- Examples
- anagrams('rail safety', 'fairy tales') --> True
- anagrams('RAIL! SAFETY!', 'fairy tales') --> True
- anagrams('Hi there', 'Bye there') --> False

#### Solution 1

```javascript
function anagrams(stringA, stringB) {
  const charMapA = buildCharMap(stringA);
  const charMapB = buildCharMap(stringB);
  if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
    return false;
  }
  for (let char in charMapA) {
    if (charMapA[char] !== charMapB[char]) {
      return false;
    }
  }
  return true;
}

function buildCharMap(str) {
  const charMap = {};
  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    charMap[char] = charMap + 1 || 1;
  }
  return charMap;
}
```

#### Solution 2

```javascript
function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB);
}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}
```

# Sentence Capitalization

- Directions
- Write a function that accepts a string. The function should capitalize the first letter of each word in the string then return the capitalized string.
- Examples
- capitalize('a short sentence') --> 'A Short Sentence'
- capitalize('a lazy fox') --> 'A Lazy Fox'
- capitalize('look, it is working!') --> 'Look, It Is Working!'

#### solution 1

```javascript
function capitalize(str) {
  const words = [];
  for (let word in str.split(' ')) {
    words.push(word[0] + word.slice(1));
  }
  return words;
}
```

#### solution 2

```javascript
function capitalize(str) {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}
```
