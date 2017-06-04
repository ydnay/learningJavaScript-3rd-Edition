// const person = {
//   first: 'Leo',
//   last: 'Marmol',
//   getFullName() {
//     return `My name is ${this.first} ${this.last}`;
//   },
// };
//
// console.log(person.getFullName());

// let f = (function () {
//   let counter = 0;
//   return function () {
//     return `This function has been called ${++counter} times`;
//   };
// })();
//
// for (var i = 0; i < 15; i++) {
//   console.log(f());
// }

let f = (function () {
  let counter = 0;
  return () => `This function has been called ${++counter} times`;
})();

for (var i = 0; i < 15; i++) {
  console.log(f());
}
