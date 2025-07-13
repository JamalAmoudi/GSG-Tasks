// GSG – Code2Career
// TASK#3

// For iterating over an iterable object,  for an object to be iterable it must meet the demands of the iteration protocol
// the iteration protocol includes two parts :
//  the iterable :  the iterable protocol and the iterator protocol
//  the iterable protocol requires the object to have a method under the name of symbol.iterator this method cannot have any arguments and must return an object
// the returned object is the iterator object
// the iterator protocol specifies rules for the returned object, it requires the object to have a next method , the next method must return an object with at least two properties value and don

// Generators are a special type of function that can be paused and resumed, allowing for the creation of iterators in a more described way. They are defined using the `function*` syntax and use the `yield` keyword to produce values.

// Example

const myIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let value of myIterable) {
  console.log(value);
}

console.log(iter2.next());
console.log(iter2.next());
