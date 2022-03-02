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

Bad Solution:
```typescript
class Sorter {
  constructor(public collection: number[] | string) {}
  
  sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {

        //run if collection is an array of numbers
        if(this.collection[j] > this.collection[j + 1]) {          const leftHand = this.collection[j];
          this.collection[j] = this.collection[j + 1];
          this.collection[j + 1] = leftHand;
        }

        // if collection is a string, do this logic instead

      } 
    }
 }
}
```
> remember, the Union operator (OR | ), typescript behind the scene restricts the access on the property. BOTH types of data must contain the same properties. 
> Can only access properties that are common between **numbers** and **strings**. This is bad. See [here](https://www.udemy.com/course/typescript-the-complete-developers-guide/learn/lecture/15066662#content) for more details.


#### Type Guards
- [TS docs](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)
- is a check on the **type of** `this.collection` to clarify the type of data we are working with. By clarifying this, Typescript will restore access to all the properties associated with an array of numbers AND a string. 
- uses `instanceof` 

Adding a guard:
```typescript
class Sorter {
  constructor(public collection: number[] | string) {}
  
  sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {

        // All of this only works if collection is a number[]
        //run if collection is an array of numbers
  
        if(this.collection instanceof Array) { // this is a type guard
          if(this.collection[j] > this.collection[j + 1]) {         
            const leftHand = this.collection[j];
            this.collection[j] = this.collection[j + 1];
            this.collection[j + 1] = leftHand;
          }

        }
        // Only work if collection is a string
        // if collection is a string, do this logic instead

      } 
    }
 }
}
```
`if(this.collection instanceof Array)` tells is that if we want to go past here, `this.collection` **must** be an array. 

> Same goes for 'string' but use  `typeof` 
> more on [typeof](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards).
```typescript
 if(typeof this.collection === 'string') {
          this.collection. // have accesss to all properties of a string
        }
```
---

![Guards](https://github.com/Cwarcup/notes/blob/9c053ecab51afa0d3690cec61b965a6f6fa84b51/images/Typescript-images/guards.png)

- If we want to setup a type guard on a number, string, boolean, or symbol, we use **[typeof](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)**.
  - used to **narrow type** of a value to a **primitive type**.
- we use **[instanceof](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)** for **every other value** that is created with a constructor function.
  - you add in a reference to the constructor function ` if(this.collection instanceof <HERE>)`.
    - could be `Date`, or `Sorter`, etc.

Guards:  we use type Guards any time we want to **restore** **access** to a set of properties in a **union type**, which is what we have right here.
> `collection: number[] | string`.
> union = '|' "or".

However, this is **bad code**. If we ever wanted to add a data type to be worsted, we need additional `if` statements for every single type of data. 

## Better Solution

- will no longer have the `Sorter` refer to numbers[] or strings.
- will have it refer to a new `NumbersCollection.ts`.
  - will contain special methods inside.
  - wrapping all the 'custom' functions needed in this class. 
- we want `Sorter` to generic as possible.

---

1. create new `Sorter.ts` file in "src". Cut the Sorter class into here.
   1. make sure you add `export`
2. create the `NumbersCollection.ts` in 'src'.
```typescript
export class NumbersCollection {
  data: number[];

  constructor(data: number[]) {
    this.data = data
  }
}
```
3. want to replace `(this.collection[j] > this.collection[j + 1])` with the `compare()` method, and decide if they need to be swapped. 
> If true, then swap needs to occur. If false, no swap.
```typescript
  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }
```
4. need to change the `const {length} = this.collection`. Can be done by using a [Getter/Setter](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters).
   1. done by adding `get` in front of the method. Can now call the method as a property.
```typescript
export class NumbersCollection {
  data: number[];

  constructor(data: number[]) {
    this.data = data
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = leftHand;
  }
}

const collection = new NumbersCollection([1,2,3]);

console.log(collection.length); // 3
``` 
5. Now need to import  `NumbersCollection` inside the `Sorter`
```typescript
import { NumbersCollection } from './NumbersCollection';

export class Sorter {
  constructor(public collection: NumbersCollection ) {}
  
  sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {
        if(this.collection.compare(j, j+1)) {         
          this.collection.swap(j, j+1);
        }
      }
    } 
  }
}
```
6. import the `Sorter` and `NumbersCollection` into the `index.ts`.
```typescript
