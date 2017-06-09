// Generators

const fs = require('fs');

// Let’s revisit the central difficulty with async code: it’s harder to write than synchronous
// code. When we tackle a problem, our minds want to approach it in a synchronous
// fashion: step 1, step 2, step 3, and so on. However, that can have performance
// consequences, which is why async exists. Wouldn’t it be nice if you could have the
// performance benefits of async without the additional conceptual difficulty? That’s
// where generators can help us.
// Consider the “callback hell” example we used previously: reading three files, delaying
// for one minute, then writing the contents of the first three files out to a fourth file.
// How our human minds would like to write this is something like this pseudocode:
// dataA = read contents of 'a.txt'
// dataB = read contents of 'b.txt'
// dataC = read contents of 'c.txt'
// wait 60 seconds
// write dataA + dataB + dataC to 'd.txt'
// Generators enable us to write code that looks very much like this…but the functionality
// doesn’t come out of the box: we’ll have to do a little work first.
// The first thing we need is a way to turn Node’s error-first callbacks into promises.
// We’ll encapsulate that into a function called nfcall (Node function call):
function nfcall(f, ...args) {
    return new Promise(function (resolve, reject) {
        f.call(null, ...args, function (err, ...args) {
            if (err) return reject(err);
            resolve(args.length < 2 ? args[0] : args);
        });
    });
}
// This function is named after (and based on) the nfcall method in
// the Q promise library. If you need this functionality, you should
// probably use Q. It includes not only this method, but many more
// helpful promise-related methods as well. I present an implementation
// of nfcall here to demonstrate that there is no “magic.”

// Now we can convert any Node-style method that takes a callback to a promise. We’ll
// also need setTimeout, which takes a callback…but because it predates Node, it wasn’t
// hip to the error-first convention. So we’ll create ptimeout (promise timeout):
function ptimeout(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delay);
    });
}
// The next thing we’ll need is a generator runner. Recall that generators are not inherently
// asynchronous. But because generators allow the function to communicate to the
// caller, we can create a function that will manage that communication—and know
// how to handle asynchronous calls. We’ll create a function called grun (generator run):
function grun(g) {
    const it = g();
    (function iterate(val) {
        const x = it.next(val);
        if (!x.done) {
            if (x.value instanceof Promise) {
                x.value.then(iterate).catch(err => it.throw(err));
            } else {
                setTimeout(iterate, 0, x.value);
            }
        }
    })();
}
// Generators that call yield will pause until next is called on their iterator. This function 
// does so recursively. If the iterator returns a promise, it waits for the promise to be 
// fulfilled before resuming the iterator. On the other hand, if the iterator returns a simple 
// value, it immediately resumes the iteration. You may be wondering why we call setTimeout 
// instead of just calling iterate directly; the reason is that we gain a little efficiency by 
// avoiding synchronous recursion (asynchronous recursion allows the JavaScript engine to free 
// resources more quickly).

// Remember our “wouldn’t it be nice” pseudocode from earlier in this chapter? Now we
// can realize that:
// function* theFutureIsNow() {
//     const dataA = yield nfcall(fs.readFile, 'a.txt');
//     const dataB = yield nfcall(fs.readFile, 'b.txt');
//     const dataC = yield nfcall(fs.readFile, 'c.txt');
//     yield ptimeout(60 * 1000);
//     yield nfcall(fs.writeFile, 'd.txt', dataA + dataB + dataC);
// }
// It looks a lot better than callback hell, doesn’t it? It’s also neater than promises alone.
// It flows the way we think. Running it is simple:
// grun(theFutureIsNow);

// The problem (assuming there is a problem) is easy to solve. Promise provides a
// method called all, which resolves when all the promises in an array resolve…and
// will execute the asynchronous code in parallel if possible. All we have to do is modify
// our function to use Promise.all:
// function* theFutureIsNow() {
//     const data = yield Promise.all([
//         nfcall(fs.readFile, 'a.txt'),
//         nfcall(fs.readFile, 'b.txt'),
//         nfcall(fs.readFile, 'c.txt'),
//     ]);
//     yield ptimeout(60 * 1000);
//     yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
// }
// grun(theFutureIsNow);

// Exception Handling in Generator Runners

// Another important benefit of generator runners is that they enable exception handling
// with try/catch. Remember that exception handling is problematic with callbacks
// and promises; throwing an exception inside a callback cannot be caught from
// outside the callback. Generator runners, because they enable synchronous semantics
// while still preserving asynchronous execution, have a side benefit of working with
// try/catch. Let’s add a couple of exception handlers to our theFutureIsNow function:
function* theFutureIsNow() {
    let data;
    try {
        data = yield Promise.all([
            nfcall(fs.readFile, 'a.txt'),
            nfcall(fs.readFile, 'b.txt'),
            nfcall(fs.readFile, 'c.txt'),
        ]);
    } catch (err) {
        console.error("Unable to read one or more input files: " + err.message);
        throw err;
    }
    yield ptimeout(60 * 1000);
    try {
        yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
    } catch (err) {
        console.error("Unable to write output file: " + err.message);
        throw err;
    }
}
grun(theFutureIsNow);

// I’m not claiming that try...catch exception handling is inherently superior to catch
// handlers on promises, or error-first callbacks, but it is a well-understood mechanism
// for exception handling, and if you prefer synchronous semantics, then you will want
// to be able to use it for exception handling.