// Events

// Events are another old idea that’s gained traction in JavaScript. The concept of events
// is simple: an event emitter broadcasts events, and anyone who wishes to listen (or
// “subscribe”) to those events may do so. How do you subscribe to an event? A callback,
// of course. Creating your own event system is quite easy, but Node provides built-in
// support for it. If you’re working in a browser, jQuery also provides an event mechanism.
// To improve countdown, we’ll use Node’s EventEmitter. While it’s possible to
// use EventEmitter with a function like countdown, it’s designed to be used with a
// class. So we’ll make our countdown function into a Countdown class instead:
// const EventEmitter = require('events').EventEmitter;

// class Countdown extends EventEmitter {
//     constructor(seconds, superstitious) {
//         super();
//         this.seconds = seconds;
//         this.superstitious = !!superstitious;
//     }
//     go() {
//         const countdown = this;
//         return new Promise(function (resolve, reject) {
//             for (let i = countdown.seconds; i >= 0; i--) {
//                 setTimeout(function () {
//                     if (countdown.superstitious && i === 13)
//                         return reject(new Error("DEFINITELY NOT COUNTING THAT"));
//                     countdown.emit('tick', i);
//                     if (i === 0) resolve();
//                 }, (countdown.seconds - i) * 1000);
//             }
//         });
//     }
// }

// The Countdown class extends EventEmitter, which enables it to emit events. The go
// method is what actually starts the countdown and returns a promise. Note that inside
// the go method, the first thing we do is assign this to countdown. That’s because we
// need to use the value of this to get the length of the countdown, and whether or not
// the countdown is superstitious inside the callbacks. Remember that this is a special
// variable, and it won’t have the same value inside a callback. So we have to save the
// current value of this so we can use it inside the promises.

// The magic happens when we call countdown.emit('tick', i). Anyone who wants
// to listen for the tick event (we could have called it anything we wanted; “tick”
// seemed as good as anything) can do so. Let’s see how we would use this new,
// improved countdown:
// const c = new Countdown(5);
// c.on('tick', function (i) {
//     if (i > 0) console.log(i + '...');
// });
// c.go()
//     .then(function () {
//         console.log('GO!');
//     })
//     .catch(function (err) {
//         console.error(err.message);
//     });

// We still have one task left—we haven’t addressed the problem of a superstitious Count
// down instance continuing to count down past 13, even though it’s rejected the
// promise:
// const c1 = new Countdown(15, true)
//     .on('tick', function (i) { // note we can chain the call to 'on'
//         if (i > 0) console.log(i + '...');
//     });
// c1.go()
//     .then(function () {
//         console.log('GO!');
//     })
//     .catch(function (err) {
//         console.error(err.message);
//     });

// We still get all the ticks, all the way down to 0 (even though we don’t print it). Fixing
// this problem is a little involved because we have already created all the timeouts (of
// course, we could just “cheat” and immediately fail if a superstitious timer is created
// for 13 seconds or longer, but that would miss the point of the exercise). To solve this
// problem, once we discover we can’t continue, we’ll have to clear all of the pending
// timeouts:
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function (resolve, reject) {
            for (let i = countdown.seconds; i >= 0; i--) {
                timeoutIds.push(setTimeout(function () {
                    if (countdown.superstitious && i === 13) {
                        // clear all pending timeouts
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("DEFINITELY NOT COUNTING THAT"));
                    }
                    countdown.emit('tick', i);
                    if (i === 0) resolve();
                }, (countdown.seconds - i) * 1000));
            }
        });
    }
}

// const c1 = new Countdown(15, true)
//     .on('tick', function (i) { // note we can chain the call to 'on'
//         if (i > 0) console.log(i + '...');
//     });
// c1.go()
//     .then(function () {
//         console.log('GO!');
//     })
//     .catch(function (err) {
//         console.error(err.message);
//     });

// Promise Chaining

// One of the advantages of promises is that they can be chained; that is, when one
// promise is fulfilled, you can have it immediately invoke another function that returns
// a promise…and so on. Let’s create a function called launch that we can chain to a
// countdown:
// function launch() {
//     return new Promise(function (resolve, reject) {
//         console.log("Lift off!");
//         setTimeout(function () {
//             resolve("In orbit!");
//         }, 2 * 1000); // a very fast rocket indeed
//     });
// }
// It’s easy to chain this function to a countdown:
const c = new Countdown(5, true)
    .on('tick', i => console.log(i + '...'));
// c.go()
//     .then(launch)
//     .then(function (msg) {
//         console.log(msg);
//     })
//     .catch(function (err) {
//         console.error("Houston, we have a problem....");
//     });
// One of the advantages of promise chains is that you don’t have to catch errors at every
// step; if there’s an error anywhere in the chain, the chain will stop and fall through to
// the catch handler. Go ahead and change the countdown to a 15-second superstitious
// countdown; you’ll find that launch is never called.

// Preventing Unsettled Promises

// Promises can simplify your asynchronous code and protect you against the problem
// of callbacks being called more than once, but they don’t protect you from the problem
// of promises that never settle (that is, you forget to call either resolve or reject).

// Let’s insert an artificial failure into our launch function. Let’s say our rocket is very
// experimental indeed, and fails approximately half the time:
function launch() {
    return new Promise(function (resolve, reject) {
        if (Math.random() < 0.5) return; // rocket failure
        console.log("Lift off!");
        setTimeout(function () {
            resolve("In orbit!");
        }, 2 * 1000); // a very fast rocket indeed
    });
}
// In this example, the way we’re failing is not very responsible: we’re not calling reject,
// and we’re not even logging anything to the console. We just silently fail half the time.
// If you run this a few times, you’ll see that sometimes it works, and sometimes it
// doesn’t…with no error message. Clearly undesirable.

// We can write a function that attaches a timeout to a promise:
function addTimeout(fn, timeout) {
    if (timeout === undefined) timeout = 1000; // default timeout
    return function (...args) {
        return new Promise(function (resolve, reject) {
            const tid = setTimeout(reject, timeout,
                new Error("promise timed out"));
            fn(...args)
                .then(function (...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function (...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    };
}
// If you’re saying “Whoa…a function that returns a function that returns a promise
// that calls a function that returns a promise…my head is spinning!”, I can’t blame you:
// to add a timeout to a promise-returning function is not trivial, and requires all of the
// preceding contortions. Completely understanding this function is left as an advanced
// reader’s exercise. Using this function, however, is quite easy: we can add a timeout to
// any function that returns a promise. Let’s say our very slowest rocket attains orbit in
// 10 seconds (isn’t future rocket technology great?), so we set a timeout of 11 seconds:
c.go()
    .then(addTimeout(launch, 4 * 1000))
    .then(function (msg) {
        console.log(msg);
    })
    .catch(function (err) {
        console.error("Houston, we have a problem: " + err.message);
    });
// Now our promise chain will always settle, even when the launch function behaves badly.