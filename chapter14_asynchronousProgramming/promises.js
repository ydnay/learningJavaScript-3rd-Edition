// Promises

// Creating Promises
// Creating a promise is a straightforward affair: you create a new Promise instance with
// a function that has resolve (fulfill) and reject callbacks

// Let’s take our countdown function, parameterize it
// (so we’re not stuck with only a 5-second countdown), and have it return a promise
// when the countdown is up:
// function countdown(seconds) {
//     return new Promise(function (resolve, reject) {
//         for (let i = seconds; i >= 0; i--) {
//             setTimeout(function () {
//                 if (i > 0) console.log(i + '...');
//                 else resolve(console.log("GO!"));
//             }, (seconds - i) * 1000);
//         }
//     });
// }
// The promise will make sure that whoever is using your promise will only get a fulfillment
// or a rejection (currently, our function doesn’t have a rejection pathway).

// Using Promises
// Let’s see how we can use our countdown function. We could just call it and ignore the
// promise altogether: countdown(5). We’ll still get our countdown, and we didn’t have
// to fuss with the promise at all. But what if we want to take advantage of the promise?
// Here’s how we use the promise that’s returned:
// countdown(5).then(
//     function () {
//         console.log("countdown completed successfully");
//     },
//     function (err) {
//         console.log("countdown experienced an error: " + err.message);
//     }
// );
// In this example, we didn’t bother assigning the returned promise to a variable; we just
// called its then handler directly. That handler takes two callbacks: the first one is the
// fulfilled callback, and the second is the error callback. At most, only one of these
// functions will get called. Promises also support a catch handler so you can split up
// the two handlers (we’ll also store the promise in a variable to demonstrate that):
const p = countdown(20);
p.then(function () {
    console.log("countdown completed successfully");
});
p.catch(function (err) {
    console.log("countdown experienced an error: " + err.message);
});
// Let’s modify our countdown function to have an error condition. Imagine we’re superstitious,
// and we’ll have an error if we have to count the number 13.
function countdown(seconds) {
    return new Promise(function (resolve, reject) {
        for (let i = seconds; i >= 0; i--) {
            setTimeout(function () {
                if (i === 13) return reject(new Error("DEFINITELY NOT COUNTING THAT"));
                if (i > 0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds - i) * 1000);
        }
    });
}
// Clearly our countdown function needs some improvements. Normally, you wouldn’t
// want a function to keep working after it had settled (successfully or otherwise), and
// ours does. We’ve also already mentioned that the console logs aren’t very flexible.
// They don’t really give us the control we’d like.
