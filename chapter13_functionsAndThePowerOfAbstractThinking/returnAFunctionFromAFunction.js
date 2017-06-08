// Return a Function from a Function

// Let’s consider our sum function from earlier that takes an optional function to operate
// on each element before summing it. Remember how we said we could create a separate
// function called sumOfSquares if we wanted to? Let’s consider the situation in
// which we need such a function. Specifically, a function that takes an array and a function
// is not good enough: we explicitly need a function that takes only an array and
// returns the sum of squares. (If you are wondering when such a circumstance might
// arise, consider an API that allows you to provide a sum function, but only accepts
// functions that take a single argument.)

// One approach would be to create a new function that simply calls our old function:
function sumOfSquares(arr) {
    return sum(arr, x => x*x);
}

// While this approach is fine, and may work if all we need is the one function, what if
// we need to be able to repeat this pattern over and over? A solution to our problem
// might be creating a function that returns a specialized function:
function newSummer(f) {
    return arr => sum(arr, f);
}

// This new function—newSummer—creates a brand new sum function that has only one
// argument, but uses a custom function. Let’s see how we might use it to get different
// kinds of summers:
const sumOfSquares1 = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares1([1, 2, 3]); // returns 14
sumOfCubes([1, 2, 3]); // returns 36

// This technique—where we have taken a function with multiple
// arguments and converted it to a function with a single argument—
// is called currying, after its developer, American mathematician
// Haskell Curry.

// The applications for returning a function from a function are often deep and complicated.
// If you want to see more examples of this, look at middleware packages for
// Express or Koa (popular JavaScript web development frameworks); more often than
// not, middleware is a function that returns a function.