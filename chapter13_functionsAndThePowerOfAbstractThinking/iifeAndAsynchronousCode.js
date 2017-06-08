// IIFEs and Asynchronous Code

// For example, this will print out
// hello after 1.5 seconds:
setTimeout(function () {
    console.log("hello");
}, 1500);

// Now that we’re armed with that knowledge, here’s our countdown function:
var i;
for (i = 5; i >= 0; i--) {
    setTimeout(function () {
        console.log(i === 0 ? "go!" : i);
    }, (5 - i) * 1000);
}

// Before block-scoped variables, the way to solve this problem would have been to use
// another function. Using an additional function creates a new scope, and the value of i
// can be “captured” (in a closure) at each step. Consider first using a named function:
function loopBody(i) {
    setTimeout(function () {
        console.log(i === 0 ? "go!" : i);
    }, (5 - i) * 1000);
}
var j;
for (j = 5; j > 0; j--) {
    loopBody(j);
}

// Creating a named function for loops that you are only going to use once can get tedious,
// though. Enter IIFEs: they essentially create equivalent anonymous functions that
// are invoked immediately. Here’s how the previous example looks with an IIFE:
var k;
for (k = 5; k > 0; k--) {
    (function (k) {
        setTimeout(function () {
            console.log(k === 0 ? "go!" : k);
        }, (5 - k) * 1000);
    })(k);
}

// Block-scoped variables solve this problem for us without the extra hassle of requiring
// a function to create a new scope for us. This example is simplified greatly with the use
// of block-scoped variables:
for (let i = 5; i > 0; i--) {
    setTimeout(function () {
        console.log(i === 0 ? "go!" : i);
    }, (5 - i) * 1000);
}