// Object Property Attributes

// At this point, we have a lot of experience with object properties. We know that they
// have a key (which can be a string or a symbol) and a value (which can be of any type).
// We also know that you cannot guarantee the order of properties in an object (the way
// you can in an array or Map). We know two ways of accessing object properties (member
// access with dot notation, and computed member access with square brackets).
// Lastly, we know three ways to create properties in the object literal notation (regular
// properties with keys that are identifiers, computed property names allowing nonidentifiers
// and symbols, and method shorthand).

// There’s more to know about properties, however. In particular, properties have
// attributes that control how the properties behave in the context of the object they
// belong to. Let’s start by creating a property using one of the techniques we know; then
// we’ll use Object.getOwnPropertyDescriptor to examine its attributes:
const obj = {
    foo: "bar"
};
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
// This will return the following:
// { value: "bar", writable: true, enumerable: true, configurable: true }

// This exposes the three attributes of a property:
// Writable
// Controls whether the value of the property can be changed.
// Enumerable
// Controls whether the property will be included when the properties of the object
// are enumerated (with for...in, Object.keys, or the spread operator).
// Configurable
// Controls whether the property can be deleted from the object or have its
// attributes modified.

// We can control property attributes with Object.defineProperty, which allows you
// to create new properties or modify existing ones (as long as the property is configurable).

// For example, if we want to make the foo property of obj read-only, we can use
// Object.defineProperty:

// Object.defineProperty(obj, 'foo', {
//     writable: false
// });
// Now if we try to assign a value to foo, we get an error:
obj.foo = 3;
// TypeError: Cannot assign to read only property 'foo' of [object Object]

// We can also use Object.defineProperty to add a new property to an object. This is
// especially useful for attribute properties because, unlike with data properties, there’s
// no other way to add an accessor property after an object has been created. Let’s add a
// color property to o (we won’t bother with symbols or validation this time):
Object.defineProperty(obj, 'color', {
    get: function () {
        return this.color;
    },
    set: function (value) {
        this.color = value;
    },
});
// To create a data property, you provide the value property to Object.defineProp
// erty. We’ll add name and greet properties to obj:
Object.defineProperty(obj, 'name', {
    value: 'Cynthia',
});
Object.defineProperty(obj, 'greet', {
    value: function () {
        return `Hello, my name is ${this.name}!`;
    }
});
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
console.log(obj);

// One common use of Object.defineProperty is making properties not enumerable
// in an array. We’ve mentioned before that it’s not wise to use string or symbol properties
// in an array (because it is contrary to the use of an array), but it can be useful if
// done carefully and thoughtfully. While the use of for...in or Object.keys on an
// array is also discouraged (instead prefer for, for...of, or Array.prototype.forE
// ach), you can’t prevent people from doing it. Therefore, if you add non-numeric
// properties to an array, you should make them non-enumerable in case someone
// (inadvisably) uses for..in or Object.keys on an array. Here’s an example of adding
// sum and avg methods to an array:
const arr = [3, 1.5, 9, 2, 5.2];
arr.sum = function () {
    return this.reduce((a, x) => a + x);
};
arr.avg = function () {
    return this.sum() / this.length;
};
Object.defineProperty(arr, 'sum', {
    enumerable: false
});
Object.defineProperty(arr, 'avg', {
    enumerable: false
});

// We could also do this in one step per property:
const arr1 = [3, 1.5, 9, 2, 5.2];
Object.defineProperty(arr1, 'sum', {
    value: function () {
        return this.reduce((a, x) => a + x);
    },
    enumerable: false
});
Object.defineProperty(arr1, 'avg', {
    value: function () {
        return this.sum() / this.length;
    },
    enumerable: false
});

// Lastly, there is also a Object.defineProperties (note the plural) that takes an object
// that maps property names to property definitions. So we can rewrite the previous
// example as:
// const arr2 = [3, 1.5, 9, 2, 5.2];
// Object.defineProperties(arr1,
//         sum: {
//             value: function () {
//                 return this.reduce((a, x) => a + x);
//             },
//             enumerable: false
//         }),
//     avg: {
//         value: function () {
//             return this.sum() / this.length;
//         },
//         enumerable: false
//     })
// );