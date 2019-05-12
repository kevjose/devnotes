/**
 * Implement a function which removes all even elements from given array
 *
 * Solution 1: start with first element check if it is not even and push element to new array, otherwise skip to next element,
 * repeat till end - complexity O(n)
 *
 * Solution 2: Using filter() and lambda - complexity O(n), however a more elegant way.
 */

function removeEven1(arr) {
  var odd = [];
  for (let number of arr) {
    if (number % 2 !== 0) {
      odd.push(number);
    }
  }
  return odd;
}

// console.log(removeEven1([3, 4, 5, 6, 34, 27]));

function removeEven2(arr) {
  return arr.filter(num => {
    return num % 2 !== 0;
  });
}

// console.log(removeEven2([3, 4, 5, 6, 34, 27]));

/**
 * Implement a function which merges two sorted arrays into another sorted array
 *
 *
 * Solution 1: Use the spread and sort operator.
 * The spread opertator concats arr1 and arr2 while the sort() sorts the concatenated array -complexity nlogn because of sort()
 *
 * Solution 2: Start by new empty list.
 * Traverse bot lists and insert smaller value from arr1 or arr2 into the result list and increment that list index
 * If a list is completely traversed, while other one is left, then copy the remaining elements in result list
 * Complexity O(n+m)
 */

function mergeArray1(arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => {
    return a - b;
  });
}

// console.log(mergeArray1([1, 2, 4, 5, 6], [-2, -1, 0, 2, 3, 4]));

function mergeArray2(arr1, arr2) {
  var merged = [];
  var i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  if (i <= arr1.length - 1) {
    arr1.splice(0, i);
    merged = merged.concat(arr1);
  } else if (j <= arr2.length - 1) {
    arr2.splice(0, j);
    merged = merged.concat(arr2);
  }
  return merged;
}
// console.log(mergeArray2([1, 2, 4, 5, 6], [-2, -1, 0, 2, 3, 4]));

/**
 * Given an array and a number n, find two numbers from the array that sum to n
 *
 * Solution 1: Traverse whole array, for each elemnt in the array check if any two elements add up the given number n.
 * Use nested for loop to iterate over entire array for each element.
 * Complexity O(n^2)
 *
 * Solution 2: sort the array, then for each element in the array use the binary seaerch to look for the difference between that element and the intended sum
 * if intended sum is n and first element is a0, then you will conduct a binary search for n-a0 so on for every a until one is fond.
 * Complexity O(nlogn) because of the search
 *
 * Solution 3: sort the array, moving indices
 * sum= arr[index1]+arr[last_index] if sum<value; index++ if sum>value; last_index-- else push the index element to the resultant array.
 * Complexity o(nlogn) because of the sort
 *
 * Solution 4: Using a set: scan the whole array once and store visited element in a hash.
 * During the scan, for every element arr[i] in arr, we check if value - arr[i] is present i.e it is already visited, if found in hash set,
 * it means (arr[i], value-arr[i] exists in array and is the solution)
 * Complexity O(n)
 *
 */

function findSum1(arr, value) {
  for (let i of arr) {
    for (let j of arr) {
      if (i + j === value) {
        return [j, k];
      }
    }
  }
  return false;
}

function binarySearch(arr, item) {
  var first = 0,
    mid;
  var last = arr.length - 1;
  var found = false;
  while (first <= last && !found) {
    mid = Math.floor((first + last) / 2);
    if (arr[mid] == item) {
      found = mid;
    } else {
      if (item < arr[mid]) {
        last = mid - 1;
      } else {
        first = mid + 1;
      }
    }
  }
  return found;
}

function findSum2(arr, value) {
  arr.sort((a, b) => a - b);
  var index;
  for (let j of arr) {
    index = binarySearch(arr, value - arr);
    if (index) return [j, value - j];
  }
  return false;
}

function findSum3(arr, value) {
  arr.sort((a, b) => a - b);
  var index1 = 0;
  var index2 = arr.length - 1;
  var result = [];
  sum = 0;
  while (index1 != index2) {
    sum = arr[index1] + arr[index2];
    if (sum < value) {
      index1++;
    } else if (sum > value) {
      index2--;
    } else {
      result.push(arr[index1]);
      result.push(arr[index2]);
      return result;
    }
  }
  return false;
}

function findSum4(arr, value) {
  let found_values = new Set();
  var results = [];
  for (let i in arr) {
    if (found_values.has(value - arr[i])) {
      return [arr[i], value - arr[i]];
    }
    found_values.add(arr[i]);
  }
  return false;
}

/**
 * Given an array, return an array where each index store the products of all numbers in the array except the number at the index itself.
 *
 * Solution 1: iterate over the array and calculate the product of all the number to the right of each element.
 * Then append the products of all the elements to the right of the current element and the product of all elemnts to the left of the current element.
 * Keep a track of products left of arr[i] as left = left*arr[i]
 * Complexity O(n^2)
 *
 * Solution 2: Optimizing the number of multiplications
 * first create a new list with the products of all elements to the left of each element.
 * then multiply each element in that list to the product of all element to the right of the list by traversing in reverse
 * Complexity O(n)
 */

function findProduct1(arr) {
  var result = [];
  var left = 1,
    currentProduct;
  for (var i = 0; i < arr.length; i++) {
    currentProduct = 1;
    for (var j = i + 1; arr.length; j++) {
      currentProduct = currentProduct * arr[j];
    }
    result.push(currentProduct * left);
    left = left * arr[i];
  }
  return result;
}

function findProduct2(arr) {
  var left = 1;
  var product = [];
  for (let ele in arr) {
    product.push(left);
    left = left * ele;
  }
  var right = 1;
  for (let i = arr.length - 1; i > 1; i++) {
    product[i] *= right;
    right *= arr[i];
  }
  return product;
}

/**
 * Given an array of size n, find the minimum value in the array;
 *
 * Solution 1: Sort the array and return first element
 * Complexity O(nlogn)
 *
 * Solution 2: Iterate over the array, at every index compare its value wih the current minimum
 * and if less, then make that index value new minimum value.
 * Complexity O(n)
 *
 */

function findMinimum1(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}

function findMinimum2(arr) {
  var currentMin = arr[0];
  for (let val of arr) {
    if (val < currentMin) {
      currentMin = val;
    }
  }
  return currentMin;
}

/**
 * Given an array, find the first inteer which is unique in the array. Unique means the number does not repeat and appears only once in the whole array.
 *
 * Solution 1: start from the first element and traverse through the whole array comparing it with all the other elements to see if any is equal
 * if so skip to the next element and repeat. if not then it is the first unique element.
 * Complexity O(n^2)
 *
 * Solution 2: Use Javascript Object to keep the count return first property with count 1
 * Complexity O(n) issue is order is not maintained, may not necessarily return the 1st non repeating element
 */

function findFirstUnique1(arr) {
  var index2;
  for (var index1 = 0; index < arr.length; index1++) {
    index2 = 0;
    while (index2 < arr.length) {
      if (index1 != index2 && arr[index1] == arr[index2]) {
        break;
      }
      index2 += 1;
    }
    if (arr2 == arr.length) {
      return arr[index1];
    }
  }
  return null;
}

function findFirstUnique2(arr) {
  var counts = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] in counts) {
      counts[arr[i]]++;
    } else {
      counts[arr[i]] = 1;
    }
  }
  for (var i = 0; i < arr.length; i++) {
    if (counts[arr[i]] == 1) return arr[i];
  }
  return null;
}

/**
 * Given array of size n, can you find the second maximum element in the array
 *
 * Solution 1: sort and index, we sort the array and return array[array.length -2]
 * Complexity: O(nlogn) because of the sorting
 *
 * Solution 2: traversing the array twice , first traversal we find the first greatest, in the second traversal we find the greatest element
 * less that the element obtained in the first traversal.
 * Complexity: O(n)
 *
 * Solution 3: Second largest in a single traversal
 * Initialize two variables max and secondMax to -INF, We traverse the array and if the current element in the array is greater than the maximum value,
 * then set secondMax to max and max to current element.
 * If current element is between first and second update secondMax to current element.
 * Complexity: O(n)
 */

function findSecondMax1(arr) {
  arr.sort((a, b) => a - b);
  if (arr.length >= 2) {
    return arr[arr.length - 2];
  }
  return null;
}

function findSecondMax2(arr) {
  var firsMax = Number.NEGATIVE_INFINITY;
  var secondMax = Number.NEGATIVE_INFINITY;
  for (let item of arr) {
    if (item > firsMax) {
      firsMax = item;
    }
  }
  for (let item of arr) {
    if (item != firsMax && item > secondMax) {
      secondMax = item;
    }
  }
  return secondMax;
}

function findSecondMax3(arr) {
  var max = Number.NEGATIVE_INFINITY;
  var secondMax = Number.NEGATIVE_INFINITY;
  for (var val of arr) {
    if (val > max) {
      secondMax = max;
      max = val;
    } else if (val > secondMax) {
      secondMax = val;
    }
  }
  return secondMax;
}

/**
 * Right Rotate Array
 * Given an array, rotate its elements from right to left by one index.
 *
 * Solution 1: we first create and empty array. we then iterate through the last n elements of the array and append then to the new array.
 * Lastly we append the first arr.length-n elements to the new array and return
 * Complexity O(n)
 *
 * Solution 2: Using splice and concat
 * Complexity: O(1)
 */

function rightRotate1(arr, n) {
  var rotatedList = [];
  for (var item = arr.length - n; item < arr.length; item++) {
    rotatedList.push(arr[item]);
  }
  for (var item = 0; item < arr.length - n; item++) {
    rotatedList.push(arr[i]);
  }
  return rotatedList;
}

function rightRotate2(arr, n) {
  return arr.splice(arr.length - n).concat(arr.splice(0, arr.length));
}

/**
 * Rearrange positive and negative values,
 * Given an array, re-arrange the elements in such a way that the negative elements appear at one side and the positive appears in the other
 *
 * Solution 1: Using Auxiliary array.
 * We iterate over the entire array and append all negative to one array and positive ones to another
 * Complexity: O(n)
 *
 * Solution 2: Rearranging in place
 * we iterate over the entire array and if we encounter a negative element, we swap it with the leftmost positive element
 */

function reArrange1(arr) {
  var neg = [];
  var pos = [];
  for (let ele of arr) {
    if (ele < 0) neg.push(ele);
    else pos.push(ele);
  }
  return neg.concat(pos);
}

function reArrange2(arr) {
  var leftMostPosEle = 0,
    tmp;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      if (i != leftMostPosEle) {
        tmp = arr[i];
        arr[i] = arr[leftMostPosEle];
        arr[leftMostPosEle] = tmp;
      }
      leftMostPosEle += 1;
    }
  }
  return arr;
}

/**
 * Arrange the elements of a sorted array in such a way that the maximum element appears at first then minimum at second,
 * then second maximum at third position and second minimu at fourth so on
 *
 * Solution 1:  we first create a new empty array.
 * We then iterate through the array starting from the 0th index until arr.length/2.
 * At each iteration we first append the largest arr[arr.length -(i+1)] and then the smallest arr[i]
 */

function maxMin(arr) {
  var result = [];
  for (var i = 0; i < Math.floor(arr.length / 2); i++) {
    result.push(arr[arr.length - (i + 1)]);
    result.push(arr[i]);
  }
  if (arr.length % 2) {
    result.push(arr[Math.floor(arr.length / 2)]);
  }
  return result;
}
