# Searching and Sorting algorithm

#### The Bubble Sort

bubble sort algorithm compares every two adjacent values and swaps them is the first one is bigger than the second one.

The name come from the fact that the values tenss to move up(bubble) into the correct order

```
function bubbleSort(array, comparFn = defaultCompare){
    cont {length} = array;
    for(let i = 0; i< length; i++){
        for(j=0; j<length -1-i; j++){
            if(array[j]> array[j+1])
            swap(array,j, j+1);
        }
    }
    return array;
}
```

#### The Selection Sort

1. in place comparison sort algorithm
2. find the minimum value place it in first position, find next minimum place it in second position, so on

```
function selectionSort(array, compareFn){
    const {length} = array;
    let indexMin;
    for(let i = 0; i < length; i++){
        indexMin = i;
        for(let j =i; j< length; j++){
            if(array[indexMin]> array[j]){
                indexMin = j;// find the min value in the array from position j till end
            }
        }
        if(i!== indexMin){
            swap(array,i, indexMin);// swap i value with the new found minimum
        }
    }
}
```

#### The Insertion Sort

1. Build the final sorted array one at a time
2. assumes that the first element is already sorted.
3. comparison with the second value to find if it should stay in the same place or inserted before the first -> first two are now sorted.
4. now compare with the third, should it be inserted in first second or thirs position, so on

```
function insertionSort(array, compareFn){
    const {length} = array;
    let temp;
    for(let i= 1; i< length; i++){
        let j = i;
        temp = array[i];
        while(j>0; array[j-1]>temp){
            array[j] = array[j-1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}
```

#### The Merge Sort

1. divide and conquer algorithm.
2. divide original array into smaller arrays, until, each smaller array has only one position,
3. Merge these smaller arrays into the bigger ones to form the final array.
4. merge sort is recursive
5. algorithm divide into two functions, one responsible for dividing the array into smaller ones, another function that will do the sort.

```
function mergeSort(array, compareFn){
    if(array.length >1){
        const {length} = array;
        const middle = Math.floor(length/2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn)
        array = merge(left, right, compareFn)
    }
    return array;
}

function merge(left, right, compareFn){
    let i = 0;
    let j = 0;
    const result = [];
    while(i< left.length && j< right.length){
        result.push(left[i]<right[j]?left[i++]:right[j++]);
    }
    return result.concat(i< left.length?left.slice(i):right.slice(j));
}
```

#### The Quick Sort

1. Uses the divide and conquer strategy
2. Select a pivot element (usually the middle element)
3. Create left and right pointers, left points to the first element, right points to the last one.
4. Move the left till we find a bigger value than the pivot, move the right pointer till we find a smaller element than the pivot.
5. swap in case the above is found.
6. repeat the above till left pointer passes the right
7. Value lesser the pivot of the left and higher on the right, the process is called partition.

```
function quickSort(array, compareFn){
    return quick(array,0,array.length-1, compareFn);
}
function quick(array, left, right, compareFn){
    let index;
    if(array.length >1){
        index = partition(array, left, right, compareFn);
        if(left < index-1){
            quick(array, left, index-1, compareFn);
        }
        if(index < right){
            quick(array, index, right, compareFn);
        }
    }
    return array;
}

function partition(array, left, right, compareFn){
    const pivot = array[Meth.floor((right+left)/2)];
    let i = left;
    let j = right;
    while(i <= j){
        while(array[i]< pivot){
            i++;
        }
        while(array[j]> pivot){
            j--;
        }
        if(i <= j){
            swap(array, i, j);
        }
    }
    return i;
}
```

#### The Counting Sort

1. Distribution sort algorithm, uses auxiliary data structure
2. The auxialiaries (buckets) that are organised are merged to get the sorted array
3. The algorithm is good for integer sorting.

```
function countingSort(array){
    if(array.length < 2){
        return array;
    }
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue +1);
    array.forEach(element => {
        if(!counts[element]){
            counts[element] = 0;
        }
        counts[element]++;
    });
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while(count>0){
            array[sortedIndex++] = i;
            count --;
        }
    });
    return array;
}

function findMaxValue(array){
    let max = array[0];
    for(let i =1; i < array.length; i++){
        if(array[i] > max ){
            max = array[i];
        }
    }
    return max;
}
```
