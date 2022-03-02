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
console.log(sorter.collection);

