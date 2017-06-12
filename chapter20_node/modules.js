// Core Modules, File Modules, and npm Modules

// Modules fall into three categories, core modules, file modules, and npm modules. Core
// modules are reserved module names that are provided by Node itself, such as fs and
// os (which we’ll discuss later in this chapter). File modules we’ve already seen: we create
// a file that assigns to module.exports, and then require that file. npm modules are
// just file modules that are located in a special directory called node_modules. When
// you use the require function, Node determines the type of module (listed in
// Table 20-1, pag 284) from the string you pass in.

// Some core modules, such as process and buffer, are global, are always available, and
// do not require an explicit require statement. (table 20.2 page 285)

// Finally, there are npm modules. npm modules are file modules with a specific naming
// convention. If you require some module x (where x is not a core module), Node will
// look in the current directory for a subdirectory called node_modules. If it finds it, it
// will look for x in that directory. If it doesn’t find it, it will go up to the parent directory,
// look for a module called node_modules there, and repeat the process until it
// finds the module or reaches the root. For example, if your project is located in /home/
// jdoe/test_project, and in your application file, you call require('x'), Node will look
// for the module x in the following locations (in this order):
// • /home/jdoe/test_project/node_modules/x
// • /home/jdoe/node_modules/x
// • /home/node_modules/x
// • /node_modules/x

// Customizing Modules with Function Modules

// Modules most commonly export objects, and sometimes a single function. There’s
// another very common pattern: a module that exports a function that’s intended to be
// invoked immediately. It’s the return value of that function (which can be a function
// itself) that’s intended to be used (in other words, you don’t use the function that’s
// returned; you invoke that function and use whatever it returns). This pattern is used
// when the module needs to be customized somehow or receive information about the
// enclosing context. Let’s consider the real-world npm package debug. When you
// import debug, it takes a string that will be used as a log prefix so logging for different
// parts of your program can be distinguished. It’s used like this:
const debug = require('debug')('main'); // note that we immediately call the
// function that the module returns
debug("starting"); // will log "main starting +0ms"
// if debugging is enabled

// It’s clear from this example that the debug module returns a function (because we
// immediately call it as a function)…and that function itself returns a function that
// “remembers” the string from the first function. In essence, we have “baked in” a value
// to that module. Let’s see how we might implement our own debug module:
let lastMessage;
module.exports = function (prefix) {
    return function (message) {
        const now = Date.now();
        const sinceLastMessage = now - (lastMessage || now);
        console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
        lastMessage = now;
    };
};
// This module is exporting a function that is designed to be called right away so that
// the value for prefix can be baked into the module. Note we also have another value,
// lastMessage, which is the timestamp of the last message that was logged; we use that
// to calculate the time between messages.

// This brings us to an important point: what happens when you import a module multiple
// times? For example, consider what happens if we import our home-grown debug
// module twice:
const debug1 = require('./debug')('one');
const debug2 = require('./debug')('two');
debug1('started first debugger!');
debug2('started second debugger!');
setTimeout(function () {
    debug1('after some time...');
    debug2('what happens?');
}, 200);
// You might expect to see something like this:
// one started first debugger! +0ms
// two started second debugger! +0ms
// one after some time... +200ms
// two what happens? +200ms
// But what you will actually see is this (plus or minus a few milliseconds):
// one started first debugger! +0ms
// two started second debugger! +0ms
// one after some time...

// As it turns out, Node only ever imports any given module once (every time a Node
// app is run). So even though we import our debug module twice, Node has “remembered”
// that we imported it before, and used the same instance. Thus, even though
// debug1 and debug2 are separate functions, they both share a reference to lastMes
// sage.
