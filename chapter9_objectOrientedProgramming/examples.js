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
// console.log(car1.userGear); // "D"
// console.log(car2.userGear); // "R"

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ['P', 'N', 'R', 'D'];
    this._userGear = this._userGears[0];
  }

  get userGear() { return this._userGear; }

  set userGear(value) {
    if (this._userGears.indexOf(value) < 0)
      throw new Error(`Invalid gear: ${value}`);
    this._userGear = value;
  }

  shift(gear) { this.userGear = gear; }
}

let myCar = new Car('Toyota', 'Corolla');

myCar.shift();
