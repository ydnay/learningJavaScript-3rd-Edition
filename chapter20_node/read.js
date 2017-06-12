const fs = require('fs');
const path = require('path');
// fs.readFile(path.join(__dirname, 'hello.txt'), function (err, data) {
//     if (err) return console.error('Error reading file.');
//     console.log('Read file contents:');
//     console.log(data);
// });
// If you run this example, you may be unpleasantly surprised at the result:
/*
Read file contents:
<Buffer 68 65 6c 6c 6f 20 66 72 6f 6d 20 4e 6f 64 65 21>
*/
// If you convert those hex codes to their ASCII/Unicode equivalents, you’ll find it is
// indeed hello from Node!, but the program as it stands is not very friendly. If you
// don’t tell fs.readFile what encoding was used, it will return a buffer, which contains
// raw binary data. Although we didn’t explicitly specify an encoding in write.js, the
// default string encoding is UTF-8 (a Unicode encoding). We can modify read.txt to
// specify UTF-8 and get the result we expect:
// fs.readFile(path.join(__dirname, 'hello.txt'), {
//     encoding: 'utf8'
// }, function (err, data) {
//     if (err) return console.error('Error reading file.');
//     console.log('File contents:');
//     console.log(data);
// });

// All of the functions in fs have synchronous equivalents (that end in “Sync”):
const data = fs.readFileSync(path.join(__dirname, 'hello.txt'), {
    encoding: 'utf8'
});
console.log(data);

// Streams

// Similarly, we can create a read stream to read data as it arrives:
const rs = fs.createReadStream('stream.txt', {
    encoding: 'utf8'
});
rs.on('data', function (data) {
    console.log('>> data: ' + data.replace('\n', '\\n'));
});
rs.on('end', function (data) {
    console.log('>> end');
});
