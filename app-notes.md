# Task
- implement and create Bubble Sort algorithm.

Will be created a double nested loop to compare the first element to the next element. If num1 < num2, do not swap. If num1 > num2, then swap.

Basic sorting algorithm. Only works with an array of numbers. 
```typescript
class Sorter {
  constructor(public collection: number[]) {}
  
  sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
        // use - i because after one iteration, the first number in the array is in the correct position. 
      for(let j = 0; j < length - i - 1; j++) {
        // if left side is greater than right side, SWAP.
        if(this.collection[j] > this.collection[j + 1]) {
          //swap
          const leftHand = this.collection[j];
          this.collection[j] = this.collection[j + 1];
          this.collection[j + 1] = leftHand;
        }
      } 
    }
 }
}

const sorter = new Sorter([13, 3, -5, 0])
sorter.sort();
console.log(sorter.collection); // [ -5, 0, 3, 13 ]
```

#### How would we have to change our code to support a string?

String in JavaScript
- strings sometimes act like arrays.
```javascript
const color = 'red';
color[0] // 'r';

// string in JavaScript are immutable: can NOT be modified.
color[0] = 'Y' // will NOT change our string.
```
> Therefore, our swapping logic will **NOT work** with a string of characters. 
> Also need to change the `if` statement.
```javascript
"X" > "a" // returns false. Would not result in a swap.

"X".charCodeAt(0) // 88
"a".charCodeAt(0) // 97

// comparison goes as
88 > 97 // which is FALSE
``` 

#### Solution:
