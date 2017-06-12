// Filesystem Access

// const fs = require('fs');
// fs.writeFile('hello.txt', 'hello from Node!', function (err) {
//     if (err) return console.log('Error writing to file.');
// });

// This will create a file in the directory you’re in when you run write.js (assuming you
// have sufficient privileges in that directory, and there isn’t a directory or read-only file
// called hello.txt already). Whenever you invoke a Node application, it inherits its current
// working directory from where you run it from.

// Node provides a special variable, __dirname, which is always set to the directory in
// which the source file resides. For example, we can change our example to:
// const fs = require('fs');
// fs.writeFile(__dirname + '/hello.txt',
//     'hello from Node!',
//     function (err) {
//         if (err) return console.error('Error writing to file.');
//     });

// Now write.js will always create hello.txt in /home/<jdoe>/fs (where write.js is located).
// Using string concatenation to join __dirname and our filename isn’t very platformagnostic;
// this could cause problems on a Windows machine, for example. Node provides
// platform-independent pathname utilities in the module path, so we can rewrite
// this module to be more friendly on all platforms:
const fs = require('fs');
const path = require('path');
// fs.writeFile(path.join(__dirname, 'hello.txt'),
//     'hello from Node!',
//     function (err) {
//         if (err) return console.error('Error writing to file.');
//     });

// All of the functions in fs have synchronous equivalents (that end in “Sync”):
// fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'hello from Node!');

// With the synchronous versions, error handling is accomplished with exceptions, so to
// make our examples robust, we would wrap them in try/catch blocks. For example:
try {
    fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'hello from Node!');
} catch (err) {
    console.error('Error writing file.');
}

// Streams

// // We’ll start by creating a write stream and writing to it:
const ws = fs.createWriteStream('stream.txt', {
    encoding: 'utf8'
});
ws.write('line 1\n');
ws.write('line 2\n');
ws.end();

// Our write stream (ws) can be written to with the write method until we call end, at
// which point the stream will be closed, and further calls to write will produce an
// error. Because you can call write as many times as you need before calling end, a
// write stream is ideal for writing data over a period of time.

