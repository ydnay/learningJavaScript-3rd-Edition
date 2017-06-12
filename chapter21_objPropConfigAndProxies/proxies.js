// Proxies

// New in ES6 are proxies, which provide additional metaprogramming functionality
// (metaprogramming is the ability for a program to modify itself).
// An object proxy essentially has the ability to intercept and (optionally) modify
// actions on an object. Let’s start with a simple example: modifying property access.
// We’ll start with a regular object that has a couple of properties:
// const coefficients = {
//     a: 1,
//     b: 2,
//     c: 5,
// };

// Imagine that the properties in this object represent the coefficients in a mathematical
// equation. We might use it like this:
function evaluate(x, c) {
    return c.a + c.b * x + c.c * Math.pow(x, 2);
}

// So far, so good…we can now store the coefficients of a quadratic equation in an
// object and evaluate the equation for any value of x. What if we pass in an object with
// missing coefficients, though?
const coefficients = {
    a: 1,
    c: 3,
};
console.log(evaluate(5, coefficients)); // NaN

// We could solve the problem by setting coefficients.b to 0, but proxies offer us a
// better option. Because proxies can intercept actions against an object, we can make
// sure that undefined properties return a value of 0. Let’s create a proxy for our coeffi
// cients object:
const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        return target[key] || 0;
    },
});
// The first argument to the Proxy constructor is the target, or object that’s being proxied.
// The second argument is the handler, which specifies the actions to be intercepted.
// In this case, we’re only intercepting property access, denoted by the get function (this
// is distinct from a get property accessor: this will work for regular properties and get
// accessors). The get function takes three arguments (we’re only using the first two):
// the target, the property key (either a string or a symbol), and the receiver (the proxy
// itself, or something that derives from it).
// In this example, we simply check to see if the key is set on the target; if it’s not, we
// return the value 0. Go ahead and try it:
console.log(betterCoefficients.a); // 1
console.log(betterCoefficients.b); // 0
console.log(betterCoefficients.c); // 3
console.log(betterCoefficients.d); // 0
console.log(betterCoefficients.anything); // 0;

// We’ve essentially created a proxy for our coefficients object that appears to have an
// infinite number of properties (all set to 0, except the ones we define)!
// We could further modify our proxy to only proxy single lowercase letters:
const betterCoefficients1 = new Proxy(coefficients, {
    get(target, key) {
        if (!/^[a-z]$/.test(key)) return target[key];
        return target[key] || 0;
    },
});
console.log(betterCoefficients1.a); // 1
console.log(betterCoefficients1.b); // 0
console.log(betterCoefficients1.c); // 3
console.log(betterCoefficients1.d); // 0
console.log(betterCoefficients1.anything); // 0;

// Similarly, we can intercept properties (or accessors) being set with the set handler.
// Let’s consider an example where we have dangerous properties on an object. We want
// to prevent these properties from being set, and the methods from being called,
// without an extra step. The extra step we’ll use is a setter called allowDangerousOpera
// tions, which you have to set to true before accessing dangerous functionality:
const cook = {
    name: "Walt",
    redPhosphorus: 100, // dangerous
    water: 500, // safe
};
const protectedCook = new Proxy(cook, {
    set(target, key, value) {
        if (key === 'redPhosphorus') {
            if (target.allowDangerousOperations)
                return target.redPhosphorus = value;
            else
                return console.log("Too dangerous!");
        }
        // all other properties are safe
        target[key] = value;
    },
});
protectedCook.water = 550; // 550
protectedCook.redPhosphorus = 150; // Too dangerous!
protectedCook.allowDangerousOperations = true;
protectedCook.redPhosphorus = 150; // 150