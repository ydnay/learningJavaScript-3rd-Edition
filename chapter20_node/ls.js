// You can list the files in a directory with fs.readdir:

const fs = require('fs');
fs.readdir(__dirname, function (err, files) {
    if (err) return console.error('Unable to read directory contents');
    console.log(`Contents of ${__dirname}:`);
    console.log(files.map(f => '\t' + f).join('\n'));
});
// The fs module contains many more filesystem functions; you can delete files
// (fs.unlink), move or rename files (fs.rename), get information about files and
// directories (fs.stat), and much more. Consult the Node API documentation for
// more information.