const colors = require("colors/safe");

function isPrime(num) {
  if (num === 0 || num === 1) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function toColor(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (i % 3) {
      case 0:
        console.log(colors.green(arr[i]));
        break;
      case 1:
        console.log(colors.yellow(arr[i]));
        break;
      case 2:
        console.log(colors.red(arr[i]));
        break;
    }
  }
}

function showPrimeNumbers(a, b) {
  if (isNaN(a) || isNaN(b)) {
    console.log("Введите диапазон числами через пробел!");
    return;
  } else {
    let numbers = [];
    for (let i = a; i <= b; i++) {
      if (isPrime(i)) {
        numbers.push(i);
      }
    }
    if (numbers.length > 0) {
      toColor(numbers);
    } else {
      console.log(colors.red("В указанном диапазоне простых чисел нет!"));
    }
  }
}

let firstNum = +process.argv[2];
let lastNum = +process.argv[3];
showPrimeNumbers(firstNum, lastNum);
