// Pass a Function into a Function

// This is an easy enough exercise, but what if we then need a function that
// returns the sum of squares? We could, of course, simply write a new function called
// sumOfSquares…but what happens when we need the sum of cubes? This is where the
// ability to pass a function can be very helpful. Consider this implementation of sum:
function sum(arr, f) {
// if no function is supplied, use a "null function" that
// simply returns its argument unmodified
    if(typeof f != 'function') f = x => x;
    return arr.reduce((a, x) => a += f(x), 0);
}
sum([1, 2, 3]); // returns 6
sum([1, 2, 3], x => x*x); // returns 14
sum([1, 2, 3], x => Math.pow(x, 3)); // returns 36

// By passing an arbitrary function into sum, we can make it do…well, anything we
// want. Need the sum of square roots? No problem. Need the sum of the numbers
// taken to the 4.233 power? Simple. Note that we want to be able to call sum without
// doing anything special…meaning there is no function. Inside the function, the
// parameter f will have the value undefined, and if we tried to invoke it, it would cause
// an error. To prevent this, we turn anything that isn’t a function into the “null function,”
// which, in essence, does nothing. That is, if you pass it 5, it returns 5, and so on.
// There are more efficient ways we could have handled this situation (such as invoking
// a different function without the overhead of invoking the null function on every element),
// but it’s good practice to see “safe” functions created this way.

