class Sorter {
  constructor(public collection: number[] | string) {}
  
  sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {

        // All of this only works if collection is a number[]
        //run if collection is an array of numbers
        if(this.collection instanceof Array) {
          if(this.collection[j] > this.collection[j + 1]) {         
            const leftHand = this.collection[j];
            this.collection[j] = this.collection[j + 1];
            this.collection[j + 1] = leftHand;
          }

        }
        if(typeof this.collection === 'string') {
        }
        // Only work if collection is a string
        // if collection is a string, do this logic instead

      } 
    }
 }
}

const sorter = new Sorter([13, 3, -5, 0])
sorter.sort();
console.log(sorter.collection);

