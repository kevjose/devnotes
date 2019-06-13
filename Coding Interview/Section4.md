# Palindromes

- Directions
- Given a string, return true if the string is a palindrome or false if it is not. Palindromes are strings that form the same word if it is reversed. _Do_ include spaces and punctuation in determining if the string is a palindrome.
- Examples:
- palindrome("abba") === true
- palindrome("abcdefg") === false

```javascript
function palindromes(str){
  const reversed = str.split('').reverse.().join('');
  return reversed === str;
}

function palindromes(str){
  return str.split('').every((char, i) => {
    return char === str[str.length - i - 1];
  });
}
```
