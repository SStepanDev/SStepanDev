
// For Loop
var myStringArray = ["Hello","World"];
var arrayLength = myStringArray.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(myStringArray[i]);
    //Do something
}

// forEach Loop
const array = ["one", "two", "three"]
array.forEach(function (item, index) {
  console.log(item, index);
});

// Filter - forEach
array.filter(item => item.condition < 10)
     .forEach(item => console.log(item))

// short forEach
const numbers = [1,2,3,4,5], doubled = [];
numbers.forEach((n, i) => { doubled[i] = n * 2 });

// Map
const numbers = [1,2,3,4,5];
const doubled = numbers.map(n => n * 2);
const doubled = numbers.map(function(n){return n*2});
console.log(doubled);

// Reduce
const numbers = [1,2,3,4,5];
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum);
