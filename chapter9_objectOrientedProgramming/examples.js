// class Car {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//     this.userGears = ['P', 'N', 'R', 'D'];
//     this.userGear = this.userGears[0];
//   }
//
//   shift(gear) {
//     if (this.userGears.indexOf(gear) < 0) {
//       throw new Error(`Invalid gear: ${gear}`);
//     }
//
//     this.userGear = gear;
//   }
// }
//
// const car1 = new Car('Tesla', 'Model S');
// const car2 = new Car('Mazda', '3i');
// car1.shift('D');
// car2.shift('R');
//
// console.log(car1.userGear); // 'D'
// console.log(car2.userGear); // 'R'

// // Dynamic Property
// class Car {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//     this._userGears = ['P', 'N', 'R', 'D'];
//     this._userGear = this._userGears[0];
//   }

//   get userGear() { return this._userGear; }

//   set userGear(value) {
//     if (this._userGears.indexOf(value) < 0)
//       throw new Error(`Invalid gear: ${value}`);
//     this._userGear = value;
//   }

//   shift(gear) { this.userGear = gear; }
// }

// let myCar = new Car('Toyota', 'Corolla');

// myCar.shift();

// // Static Methods
// class Car {
//   static getNextVin() {
//     return Car.nextVin++; // we could also use this.nextVin++
//                           // but referring to Car emphasizes
//                           // that this is a static method
//   }
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//     this.vin = Car.getNextVin();
//   }
//   static areSimilar(car1, car2) {
//     return car1.make===car2.make && car1.model===car2.model;
//   }
//   static areSame(car1, car2) {
//     return car1.vin===car2.vin;
//   }  
// }
// Car.nextVin = 0;
// const car1 = new Car('Tesla', 'S');
// const car2 = new Car('Mazda', '3');
// const car3 = new Car('Mazda', '3');
// car1.vin; // 0
// car2.vin; // 1
// car3.vin; // 2
// Car.areSimilar(car1, car2); // false
// Car.areSimilar(car2, car3); // true
// Car.areSame(car2, car3); // false
// Car.areSame(car2, car2); // true

// Inheritance
class Vehicle {
  constructor() {
    this.passengers = [];
    // console.log('Vehicle created');
  }
  addPassenger(p) {
    this.passengers.push(p);
  }
}
class Car extends Vehicle {
  constructor() {
    super();
      // console.log('Car created');
  }
  deployAirbags() {
    // console.log('BWOOSH!');
  } 
}
const v = new Vehicle();
v.addPassenger('Frank');
v.addPassenger('Judy');
v.passengers; // ['Frank', 'Judy']
const c = new Car();
c.addPassenger('Alice');
c.addPassenger('Cameron');
c.passengers; // ['Alice', 'Cameron']
v.deployAirbags(); // error
c.deployAirbags(); // 'BWOOSH!'

// Polymorphism
class Motorcycle extends Vehicle {}
const m = new Motorcyle();
c instanceof Car; // true
c instanceof Vehicle; // true
m instanceof Car; // false
m instanceof Motorcycle; // true
m instanceof Vehicle; // true

// Using hasOwnProperty to be sure we define data properties on intances
// not in the prototype chain
class Super {
  constructor() {
    this.name = 'Super';
    this.isSuper = true;
  }
}
// this is valid, but not a good idea...
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super {
  constructor() {
    super();
    this.name = 'Sub';
    this.isSub = true;
  }
}
const obj = new Sub();
for(let p in obj) {
  // console.log(`${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? '' : ' (inherited)'));
}

// // String representation
// class Car1 {
//   toString() {
//     return `${this.make} ${this.model}: ${this.vin}`;
// }
// //...

// Multiple Inheritance, Mixins, and Interfaces
class InsurancePolicy() {}
function makeInsurable(o) {
  o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
  o.getInsurancePolicy = function() { return this.insurancePolicy; }
  o.isInsured = function() { return !!this.insurancePolicy; }
}

makeInsurable(Car);

const car0 = new Car();
car1.addInsurancePolicy(new InsurancePolicy()); // error

const car1 = new Car();
makeInsurable(car1);
car1.addInsurancePolicy(new InsurancePolicy()); // works

makeInsurable(Car.prototype);
const car2 = new Car();
car1.addInsurancePolicy(new InsurancePolicy()); // works

// Avoiding Collision
// b/c symbols are unique, this ensure that the mixin will never interfere
// with the existing Car functionality.
class InsurancePolicy1() {}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o) {
  o[ADD_POLICY] = function(p) { this[_POLICY] = p; }
  o[GET_POLICY] = function() { return this[_POLICY]; }
  o[IS_INSURED] = function() { return !!this[_POLICY]; }
}
