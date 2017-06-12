// Streams

// The concept of a stream is an important one in Node. A stream is an object that deals
// with data—as the name implies—in a stream (the word stream should make you
// think of flow, and because flow is something that happens over time, it makes sense
// that it would be asynchronous).
// Streams can be read streams, write streams, or both (called duplex streams). Streams
// make sense whenever the flow of data happens over time. Examples might be a user
// typing at a keyboard, or a web service that has back-and-forth communication with a
// client. File access, too, often uses streams (even though we can also read and write
// files without streams). We’ll use file streams to demonstrate how to create read and
// write streams, and how to pipe streams to one another.

// Check write.js and read.js

// In this example, we’re simply logging the file contents to the console (replacing newlines
// for neatness). You can put both of these examples in the same file: you can have
// a write stream writing to a file and a read stream reading it.
// Duplex streams are not as common, and are beyond the scope of this book. As you
// might expect, you can call write to write data to a duplex stream, as well as listen for
// data and end events.

// Because data “flows” through streams, it stands to reason that you could take the data
// coming out of a read stream and immediately write it to a write stream. This process
// is called piping. For example, we could pipe a read stream to a write stream to copy
// the contents of one file to another:
const fs = require('fs');
const rs = fs.createReadStream('stream.txt');
const ws = fs.createWriteStream('stream_copy.txt');
rs.pipe(ws);

// Note that in this example, we don’t have to specify encoding: rs is simply piping bytes
// from stream.txt to ws (which is writing them to stream_copy.txt); encoding only matters
// if we’re trying to interpret the data.
// Piping is a common technique for moving data. For example, you could pipe the contents
// of a file to a webserver’s response. Or you could pipe compressed data into a
// decompression engine, which would in turn pipe data out to a file writer.