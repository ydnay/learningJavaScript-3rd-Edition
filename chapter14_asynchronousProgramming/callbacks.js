// Callbacks

// Let’ s start with a simple example, using setTimeout, a built - in function that delays
// execution some number of milliseconds:
console.log("Before timeout: " + new Date());

function f() {
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60 * 1000); // one minute
console.log("I happen after setTimeout!");
console.log("Me too!");

// In the previous example, for clarity, we used a named function to pass to setTimeout.
// Unless there were some compelling reason to have a named function, we would normally
// just use an anonymous function:
setTimeout(function () {
    console.log("After timeout: " + new Date());
}, 60 * 1000);
// setTimeout is a little bit problematic because the numeric timeout parameter is the
// last argument; with anonymous functions, especially if they’re long, it can get lost or
// look like it’s part of the function. This is common enough, however, that you’ll have
// to get used to seeing setTimeout (and its companion, setInterval) used with
// anonymous functions. Just remember that the last line contains the delay parameter.

// setInterval and clearInterval

// setInterval, which runs the callback at the specified interval forever, or until you
// call clearInterval. Here’s an example that runs every 5 seconds until the minute
// rolls over, or 10 times, whichever comes first:
const start = new Date();
let i = 0;
const intervalId = setInterval(function () {
    let now = new Date();
    if (now.getMinutes() !== start.getMinutes() || ++i > 10)
        return clearInterval(intervalId);
    console.log(`${i}: ${now}`);
}, 5 * 1000);
// We see here that setInterval returns an ID that we can use to cancel (stop) it later.
// There’s a corresponding clearTimeout that works the same way and allows you to
// stop a timeout before it runs.

// Scope and Asynchronous Execution

// Consider the example of a function called countdown. The intended
// purpose is to create a 5-second countdown:
function countdown() {
    let i; // note we declare let outside of the for loop
    // console.log("Countdown:");
    for (i = 5; i >= 0; i--) {
        setTimeout(function () {
            // console.log(i === 0 ? "GO!" : i);
        }, (5 - i) * 1000);
    }
}
countdown();
// The first time we saw this, we were using var; this time we’re using let, but it’s 
// declared outside of the for loop, so we have the same problem: the for loop executes 
// completely, leaving i with the value –1, and only then do the callbacks start 
// executing. The problem is, when they execute, i already has the value –1.

// Recall that we can solve this problem with an immediately invoked function expression
// (IIFE), or more simply by just moving the declaration of i into the for loop
// declaration:
function countdown1() {
    console.log("Countdown:");
    for (let i = 5; i >= 0; i--) { // i is now block-scoped
        setTimeout(function () {
            console.log(i === 0 ? "GO!" : i);
        }, (5 - i) * 1000);
    }
}
countdown1();
// The takeaway here is that you have to be mindful of the scope your callbacks are
// declared in: they will have access to everything in that scope (closure). And because
// of that, the value may be different when the callback actually executes. This principle
// applies to all asynchronous techniques, not just callbacks.

// Error-First Callbacks

// The convention that emerged was to use the first argument to a callback to
// receive an error object. If that error is null or undefined, there was no error.

// Whenever you’re dealing with an error-first callback, the first thing you should do is
// check the error argument and take appropriate action. Consider reading the contents
// of a file in Node, which adheres to the error-first callback convention:
const fs = require('fs');
const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function (err, data) {
    if (err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});
// The first thing we do in the callback is see if err is truthy. If it is, there was an issue
// reading the file, and we report that to the console and immediately return
// (console.error doesn’t evaluate to a meaningful value, but we’re not using the return
// value anyway, so we just combine it into one statement).

// Callback Hell

// While callbacks allow you to manage asynchronous execution, they have a practical
// drawback: they’re difficult to manage when you need to wait on multiple things
// before proceeding. Imagine the scenario where you’re writing a Node app that needs
// to get the contents of three different files, then wait 60 seconds before combining the
// contents of those files and writing to a fourth file:
const fs = require('fs');
fs.readFile('a.txt', function (err, dataA) {
    if (err) console.error(err);
    fs.readFile('b.txt', function (err, dataB) {
        if (err) console.error(err);
        fs.readFile('c.txt', function (err, dataC) {
            if (err) console.error(err);
            setTimeout(function () {
                fs.writeFile('d.txt', dataA + dataB + dataC, function (err) {
                    if (err) console.error(err);
                });
            }, 60 * 1000);
        });
    });
});

// This is what programmers refer to as “callback hell,” and it’s typified by a triangleshaped
// block of code with curly braces nested to the sky. Worse still is the problem of error 
// handling. In this example, all we’re doing is logging the errors, but if we tried
// throwing an exception, we’d be in for another rude surprise. Consider the following
// simpler example:
const fs = require('fs');

function readSketchyFile() {
    try {
        fs.readFile('does_not_exist.txt', function (err, data) {
            if (err) throw err;
        });
    } catch (err) {
        console.log('warning: minor issue occurred, program continuing');
    }
}
readSketchyFile();
// Glancing over this, it seems reasonable enough, and hooray for us for being defensive
// programmers and using exception handling. Except it won’t work. Go ahead and try
// it: the program will crash, even though we took some care to make sure this semiexpected
// error didn’t cause problems. That’s because try...catch blocks only work
// within the same function. The try...catch block is in readSketchyFile, but the
// error is thrown inside the anonymous function that fs.readFile invokes as a callback.
// Additionally, there’s nothing to prevent your callback from accidentally getting called
// twice—or never getting called at all. If you’re relying on it getting called once and
// exactly once, the language itself offers no protection against that expectation being
// violated.
// These are not insurmountable problems, but with the prevalence of asynchronous
// code, it makes writing bug-free, maintainable code very difficult, which is where
// promises come in.