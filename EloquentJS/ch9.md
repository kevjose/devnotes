# Regular Expressions

- way to describe patterns in string data.
- these form a small part of JS language an many others as well.

#### creating a regualr expression

- regular expression is a type of object.
- can be initialised by using `RegExp` constructor or written as a literal value by enclosing a pattern in forward slash `/` characters

```javascript
let re1 = new RegExp('abc');
let re2 = /abc/;
// pattern: an a character followed by a b character followed by a c.
```

- the second notation where pattern appears in between forward slash character, put backlashes in front of any forward slash in the pattern. also backlashes not part of any special character code like `\n` will be preserved.
- characters like ? + \* . etc. have special meaning so prepend with \ to preseve in pattern.

```javascript
console.log(/abc/.test('abcde'));
// → true
console.log(/abc/.test('abxde'));
// → false
```

#### Set of characters

```javascript
console.log(/[0123456789]/.test('in 1992'));
// → true
console.log(/[0-9]/.test('in 1992'));
// → true
```

- `[-]`, show a range of characters, ordering determined by character unicode. so [0-9] and matches any digit
- a number of character groups have there shortcuts

```
\d, any digit character
\w, any alphanumneric character
\s, any white space character (space, tab, newline etc).
\D, a character not digit
\W, a character not alphnumeric
\S, a non whitespace character
., any character except newline

[\d.] means any digit or a period character.
[^01] want to match any character except the ones in the set ie 0 or 1


```

```javascript
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test('01-30-2003 15:20'));
// → true
console.log(dateTime.test('30-jan-2003 15:20'));
// → false
```

#### repeating parts of pattern

- `+` after something in a regular expression indicates, element may be repeated once, /\d+/ matches more than one digit characters.
- `*`, matches pattern repeating zero or more times.
- `?` marks the part of a pattern optional, meaning, the part may appear zero or more times.
- to indicate the pattern should repeat exact number of times use braces {4}, repeat exactly 4 times. {2, 4} indicates min two and max four times. {5,} means five or more times.

```javascript
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true

let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbour'));
// → true
console.log(neighbor.test('neighbor'));
// → true

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test('1-30-2003 8:45'));
// → true
```

#### grouping sub-expressions

- to apply \*, + etc. on more than one element use `()`, parantheses. Part of regex enclosed in parantheses is considered to be a single element
- `i`, at the end of a regex makes it case insensitive.

```javascript
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('Boohoooohoohooo'));
// → true
```

#### matches and groups

- `test` method only returns true/false
- regex also has a `exec` method, return null in case no match was found.
- exec has `index` method that tell where the match begins, rest its a array of strings.
- String values have a match method, which is similar to exec.
- regex may contain subexpressions grouped with parentheses. The whole match is always the first element. The next element is the part matched by the first group (the one whose opening parenthesis comes first in the expression), then the second group, and so on

```javascript
let match = /\d+/.exec('one two 100');
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

console.log('one two 100'.match(/\d+/));
// → ["100"]

let quotedText = /'([^']*)'/; //match ' then (zero or more characters not ` in parantheses) followed by '
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

console.log(/bad(ly)?/.exec('bad'));
// → ["bad", undefined]
console.log(/(\d)+/.exec('123'));
// → ["123", "3"]
```

#### the date class

- JS has standard class for representing a point in time, `Date` constructor.
- Convention, months starts from 0 and days from 1, hours, minutes, seconds, millis are optional and 0 if not provided
- timestamps are stored in milliseconds since start of 1970, in UTC time zone.
- Date methods - `getTime`, return time in millis. `getFullYear`, `getMonth`, `getDate`, `getHours`, `getMinutes`, and `getSeconds` extract the obivious.
- `getYear` gives year minus 1900

```javascript
function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate('1-30-2003'));
// → Thu Jan 30 2003 00:00:00 GMT+0530 (India Standard Time)
// _ binding is used to skip the full match that is [0] of exec result
```

#### word and string boundaries

- use `^` and `$` to mark the boudaries of match. ^ -> marks the start of a string and \$ marks the end of a string
- /^\d+\$/ matches a string consisting entirely of one or more digits, /^!/ matches any string that starts with an exclamation mark, and /x^/ does not match any string
- to mark word boundary use \b, a word boundary can be a start or end of a string, or a point in the string that has a word `\w`, followed by a non word character

```javascript
console.log(/cat/.test('concatenate'));
// → true
console.log(/\bcat\b/.test('concatenate'));
// → false
```

#### choice patterns

- the `|` pipe character denotes the choice,
- the parantheses can be used to limit part of the pattern that pipe applies to.

```javascript
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test('15 pigs'));
// → true
console.log(animalCount.test('15 pigchickens'));
// → false
```

#### the mechanics of matching

- to do actual matching, the regualr expression is treated as flow diagram. The expression being tested matches if we find a path from left to right in the flow
- `let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;` can be represented as under

```
boundary-> Digit|Repeat -> single_space -> (pig or cow or chicken) -> s|optional -> boundary
```

- try matching `the 3 cows`
- position 4 matches the first boundary box. at 4 we find a digit hence path through the digit box.
- at 5 one path loops back to digit another to the single_space, since element at 5 matches space, hence take the single space path.
- in the three way path choose cow path.
- at postion 9 , either skip the s or go through the `s` box. go through is chosen as the word is `cows`
- at position 10 we have found word boundary, hence successfully got a match.

#### backtracking

- `/\b([01]+b|[\da-f]+h|\d+)\b/`, matches binary number followed by b, a hexdecimal followed by h, or a decimal with no suffix.
- try matching a string `103` using the above
- starts matching with the binary branch until it sees a 3, here the string does match the expression, but no the one we are in, hence backtrack. The matcher remembers the current position.
- tries matching with second condition, however no `h`, try the decimal branch. -> a match is reported.

#### the replace method

- repalces part of the string with another
- `STRING.replace(REGEX_OR_STRING_TO_MATCH/match_modifiers,REPLACEMENT_STRING)`
- first arg can be a regex as well.
- to replace all add a `g` at the end of a regex.
- in replace we can refer to the matched groups in the repalcement string
- The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern. $1 is replaced by the text that matched against the first group, $2 by the second, and so on, up to $9. The whole match can be referred to with $&
- the replacement_string can be a function as well.

```javascript
console.log('Borobudur'.replace(/[ou]/, 'a'));
// → Barobudur
console.log('Borobudur'.replace(/[ou]/g, 'a'));
// → Barabadar

console.log(
  'Liskov, Barbara\nMcCarthy, John\nWadler, Philip'.replace(
    /(\w+), (\w+)/g,
    '$2 $1'
  )
);
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler

let stock = '1 lemon, 2 cabbages, and 101 eggs';
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = 'no';
  }
  return amount + ' ' + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
```

- This last piece of code a string, finds all occurrences of a number followed by an alphanumeric word, and returns a string wherein every such occurrence is decremented by one.
- The (\d+) group ends up as the amount argument to the function, and the (\w+) group gets bound to unit. The function converts amount to a number—which always works since it matched \d+—and makes some adjustments in case there is only one or zero left

#### greed

- example strip comments, single and multiline comments

```javascript
function stripComments(code) {
  // 1st block is for single line comments find // followed by .* (stops at newline)
  // 2nd block is for multi line comments find /* follwowed by [^]* for matching any character that is not in the empty set of characters followed by */
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, '');
}

console.log(stripComments('1 + /* 2 */3'));
// → 1 + 3
console.log(stripComments('x = 10;// ten!'));
// → x = 10;
console.log(stripComments('1 /* a */+/* b */ 1'));
// → 1  1 this output is incorrect
```

- the last output is incorrect
- the [^]\* part of the expression is backtracking and matches as much as possible
- repetition operators (+, \*, ?, and {}) are greedy, meaning they match as much as they can and backtrack from there
- If you put a question mark after them (+?, \*?, ??, {}?), they become nongreedy and start by matching as little as possible, matching more only when the remaining pattern does not fit the smaller match

```javascript
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}
console.log(stripComments('1 /* a */+/* b */ 1'));
// → 1 + 1
```

#### dynamically creating regex objects.

- to enclose the username between undrscore

```javascript
let name = 'harry';
let text = 'Harry is a suspicious character.';
let regexp = new RegExp('\\b(' + name + ')\\b', 'gi');
console.log(text.replace(regexp, '_$1_'));
// → _Harry_ is a suspicious character.
// use two blackslashes for boundary as this is a string, second args is the modifieres g -> search all, i -> case insensitive
```

- if username contains special characters , those need to escaped.

```javascript
let name = 'dea+hl[]rd';
let text = 'This dea+hl[]rd guy is super annoying.';
let escaped = name.replace(/[\\[.+*?(){|^$]/g, '\\$&');
let regexp = new RegExp('\\b' + escaped + '\\b', 'gi');
console.log(text.replace(regexp, '_$&_'));
// → This _dea+hl[]rd_ guy is super annoying.
```

#### the search method

- indexOf on a string cannot be called with a regular expression.
- for above use `search`, however, there is no way to indicate that the match should start at a given offset (like we can with the second argument to indexOf)
- search returns the first matching index.
- there is no way to indicate that the match should start at a given offset (like we can with the second argument to indexOf)

#### the lastIndex property

- the regex object contians various properties, like `source`, `lastIndex` etc.
- source contains the string the regex was made of.
- lastIndex, tells where the nex match will start only in case the match is for global `g`, this works only on the exec method.
  If the match was successful, the call to exec automatically updates the lastIndex property to point after the match. If no match was found, lastIndex is set back to zero (also the value for a newly created regex object)

```javascript
let pattern = /y/g;
console.log(pattern.source); // 'y'
pattern.lastIndex = 3;
let match = pattern.exec('xyzzy');
console.log(match); // [0: "y", groups: undefined, index: 4, input:"xyzzy", length: 1]
console.log(match.index);
// → 4
console.log(pattern.lastIndex);
// → 5
```

- the global option is that it changes the way the match method on strings works. When called with a global expression, instead of returning an array similar to that returned by exec, match will find all matches of the pattern in the string and return an array containing the matched strings

```javascript
console.log('Banana'.match(/an/g));
// → ["an", "an"]
```

#### looping over matches

```javascript
let input = 'A string with 3 numbers in it... 42 and 88.';
let number = /\b\d+\b/g;
let match;
while ((match = number.exec(input))) {
  console.log('Found', match[0], 'at', match.index);
}
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40
```

#### Parsing an ini file.

- The exact rules for this format (which is a widely used format, usually called an INI file) are as follows:
- - Blank lines and lines starting with semicolons are ignored.
- - Lines wrapped in [ and ] start a new section.
- - Lines containing an alphanumeric identifier followed by an = character add a setting to the current section.
- - Anything else is invalid.

```javascript
function parseINI(string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if ((match = line.match(/^(w+)=(.*)$/))) {
      section[match[1]] = match[2];
    }else if(match = line.match(/[(.*)\]/)){
      section = result[match[1]] = {}
    }else if(/^\s*^(;.*)?$/.test(line)){
      throw new Error('Line ${line} is invalid')
    }
  });
  return result;
}
console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}
// /^\s*^(;.*)?$/ The part between the parentheses will match comments, and the ? makes sure it also matches lines containing only whitespace
```

#### international characters.

- by default, regular expressions work on code units, not actual characters
- add a `u` option (for Unicode) to your regular expression to make it treat such characters properly

```javascript
console.log(/🍎{3}/.test('🍎🍎🍎'));
// → false
console.log(/<.>/.test('<🌹>'));
// → false
console.log(/<.>/u.test('<🌹>'));
// → true
```

- use \p in a regular expression (that must have the Unicode option enabled) to match all characters to which the Unicode standard assigns a given property

```javascript
console.log(/\p{Script=Greek}/u.test('α'));
// → true
console.log(/\p{Script=Arabic}/u.test('α'));
// → false
console.log(/\p{Alphabetic}/u.test('α'));
// → true
console.log(/\p{Alphabetic}/u.test('!'));
// → false
```

- use the \p{Property=Value} notation to match any character that has the given value for that property
- if the property name is left off, as in \p{Name}, the name is assumed to be either a binary property such as Alphabetic or a category such as Number
