let numbers = [10, 35, 67, 21, 50];

let sum = numbers.reduce((a, b) => a + b, 0);
let largest = Math.max(...numbers);

console.log("Sum:", sum);
console.log("Largest:", largest);
