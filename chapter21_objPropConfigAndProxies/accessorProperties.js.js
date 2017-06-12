// Accessor Properties: Getters and Setters

// There are two types of object properties: data properties and accessor properties. We’ve
// already seen both, but the accessor properties have been hidden behind some ES6
// syntactic sugar (we called them “dynamic properties” in Chapter 9).

// We’re familiar with function properties (or methods); accessor properties are similar
// except they have two functions—a getter and a setter—and when accessed, they act
// more like a data property than a function.

// Let’s review dynamic properties. Imagine you have a User class, with methods setE
// mail and getEmail. We opted to use a “get” and “set” method instead of just having a
// property called email because we want to prevent a user from getting an invalid email
// address. Our class is very simple (for simplicity, we’ll treat any string with an at sign
// as a valid email address):
// const USER_EMAIL = Symbol();
// class User {
//     setEmail(value) {
//         if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
//         this[USER_EMAIL] = value;
//     }
//     getEmail() {
//         return this[USER_EMAIL];
//     }
// }
// In this example, the only thing that’s compelling us to use two methods (instead of a
// property) is to prevent the USER_EMAIL property from receiving an invalid email
// address. We’re using a symbol property here to discourage accidental direct access of
// the property (if we used a string property called email or even _email, it would be
// easy to carelessly access it directly).

// This is a common pattern, and it works well, but it’s slightly more unwieldy than we
// might like. Here’s an example of using this class:
// const u = new User();
// u.setEmail("john@doe.com");
// console.log(`User email: ${u.getEmail()}`);

// While this works, it would be more natural to write:
// const u = new User();
// u.email = "john@doe.com";
// console.log(`User email: ${u.email}`);

// Enter accessor properties: they allow us to have the benefits of the former with the
// natural syntax of the latter. Let’s rewrite our class using accessor properties:
const USER_EMAIL = Symbol();
class User {
    set email(value) {
        if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }
    get email() {
        return this[USER_EMAIL];
    }
}
const u = new User();
u.email = "john@doe.com";
console.log(`User email: ${u.email}`);
// We’ve provided two distinct functions, but they are bundled into a single property
// called email. If the property is assigned to, then the setter is called (with the assignment
// value being passed in as the first argument), and if the property is evaluated, the
// getter is called.

// You can provide a getter without a setter; for example, consider a getter that provides
// the perimeter of a rectangle:
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    get perimeter() {
        return this.width * 2 + this.height * 2;
    }
}
const r = new Rectangle();
r.width = 2;
r.height = 3;
console.log(`Rectangle perimeter: ${r.perimeter}`);
// We don’t provide a setter for perimeter because there’s no obvious way to infer the
// rectangle’s width and height from the length of the perimeter; it makes sense for this
// to be a read-only property.

// Likewise, you can provide a setter without a getter, though this is a much less common
// pattern.