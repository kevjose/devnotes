const addBinary = (a, b) => {
  let lenA = a.length;
  let lenB = b.length;
  let ai = 0,
    bi = 0;
  let carry = 0;
  let sum = '';

  let valA, valB, val, rem;
  while (ai < lenA || bi < lenB) {
    valA = ai < lenA ? parseInt(a[lenA - 1 - ai]) : 0;
    valB = bi < lenB ? parseInt(b[lenB - 1 - bi]) : 0;
    val = valA + valB + carry;
    rem = val % 2;
    carry = val > 1 ? 1 : 0;
    sum = rem + sum;
    ai++;
    bi++;
  }
  return carry > 0 ? carry + sum : sum;
};
