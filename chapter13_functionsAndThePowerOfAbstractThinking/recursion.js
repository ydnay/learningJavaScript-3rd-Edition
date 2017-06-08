// Recursion

// Another common and important way that functions are used is recursion. Recursion
// refers to a function that calls itself. This is a particularly powerful technique when the
// function does the same thing with progressively smaller sets of input.
// Let’s start with a contrived example: finding a needle in a haystack. If you were confronted
// with a real-life haystack and had to find a needle in it, a viable approach
// might be this:

// 1. If you can see the needle in the haystack, go to step 3.
// 2. Remove a piece of hay from the haystack. Go to step 1.
// 3. Done!

// Basically you’re whittling the haystack down until you find the needle; in essence, this
// is recursion. Let’s see how we would translate this example into code:
function findNeedle(haystack) {
    if(haystack.length === 0) return "no haystack here!";
    if(haystack.shift() === 'needle') return "found it!";
    return findNeedle(haystack); // haystack has one fewer element
}
findNeedle(['hay', 'hay', 'hay', 'hay', 'needle', 'hay', 'hay']);

// It’s important that a recursive function has a stopping condition; without it, it will keep
// recursing until the JavaScript interpreter decides the call stack is too deep (which will
// cause your program to crash). In our findNeedle function, we have two stopping
// conditions: we stop because we found the needle, or we stop because there is no haystack.
// Because we’re reducing the size of the haystack every time, it’s inevitable that
// we will eventually reach one of these stopping conditions.

// Let’s consider a more useful, time-honored example: finding the factorial of a number.
// The factorial of a number is the number multiplied by every number up to it and
// is denoted by an exclamation point after a number. So 4! would be 4 × 3 × 2 × 1 = 24.
// Here’s how we would implement this as a recursive function:
function fact(n) {
    if(n === 1) return 1;
    return n * fact(n-1);
}
// Here we have a stopping condition (n === 1), and every time we make the recursive
// call, we reduce the number n by one. So eventually we’ll get to 1 (this function will fail
// if you pass it 0 or a negative number, though of course we could add some error conditions
// to prevent that from happening).

console.log(fact(7));