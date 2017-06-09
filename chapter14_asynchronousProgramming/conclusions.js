// Conclusion
// Fully understanding the complexities involved in asynchronous programming—and
// the various mechanisms that have evolved for managing it—is critical to understanding
// modern JavaScript development. We’ve learned:
// • Asynchronous execution in JavaScript is managed with callbacks.
// • Promises do not replace callbacks; indeed, promises require then and catch
// callbacks.
// • Promises eliminate the problem of a callback getting called multiple times.
// • If you need a callback to be called multiple times, consider using events (which
// can be combined with a promise).
// • A promise cannot guarantee that it will settle; however, you can wrap it in a timeout
// to protect against this.
// • Promises can be chained, enabling easy composition.
// • Promises can be combined with generator runners to enable synchronous
// semantics without losing the advantages of asynchronous execution.
// • When writing generator functions with synchronous semantics, you should be
// careful to understand what parts of your algorithm can run in parallel, and use
// Promise.all to run those parts.
// • You shouldn’t write your own generator runner; use co or Koa.
// • You shouldn’t write your own code to convert Node-style callbacks to promises;
// use Q.
// • Exception handling works with synchronous semantics, as enabled by generator
// runners.
// If your only programming experience is with languages that have synchronous
// semantics, learning synchronous programming the JavaScript way can be daunting; it
// certainly was for me. However, it’s an essential skill in modern JavaScript projects.
// Conclusion