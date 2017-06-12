// Web Servers

// While Node is being used in many applications now, its original purpose was to provide
// a web server, so we would be remiss not to cover this usage.
// Those of you who have configured Apache—or IIS, or any other web server—may be
// startled at how easy it is to create a functioning web server. The http module (and its
// secure counterpart, the https module) exposes a createServer method that creates a
// basic web server. All you have to do is provide a callback function that will handle
// incoming requests. To start the server, you simply call its listen method and give it a
// port:
const http = require('http');
const server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
    res.end('Hello world!');
});
const port = 8080;
server.listen(port, function () {
    // you can pass a callback to listen that lets you know
    // the server has started
    console.log(`server startd on port ${port}`);
});
// If you run this program and visit http://localhost:8080 in a browser, you will see Hello
// world!. On the console, we’re logging all requests, which consist of a method (sometimes
// called a verb) and a URL path. You might be surprised to see two requests each time you
// go to that URL in the browser:
//      GET /
//      GET /favicon.ico
// Most browsers will request an icon that they can display in the URL bar or tab; the
// browser will do this implicitly, which is why we see it logged on the console.

// Most browsers will request an icon that they can display in the URL bar or tab; the
// browser will do this implicitly, which is why we see it logged on the console.
// At the heart of Node’s web server is the callback function that you provide, that will
// respond to all incoming requests. It takes two arguments, an IncomingMessage object
// (often abbreviated req) and a ServerRequest object (often abbreviated res). The
// IncomingMessage object contains all information about the HTTP request: what URL
// was requested, any headers that were sent, any data sent in the body, and more. The
// ServerResponse object contains properties and methods to control the response that
// will be sent back to the client (usually a browser). If you saw that we called req.end
// and wondered if req is a write stream, go to the head of the class. The ServerRes
// ponse object implements the writable stream interface, which is how you write data
// to the client. Because the ServerResponse object is a write stream, it makes it easy to
// send a file…we can just create a file read stream and pipe it to the HTTP response.
// For example, if you have a favicon.ico file to make your website look nicer, you could
// detect this request and send this file directly:
// const server = http.createServer(function (req, res) {
//     if (req.method === 'GET' && req.url === '/favicon.ico') {
//         const fs = require('fs');
//         fs.createReadStream('favicon.ico');
//         fs.pipe(res); // this replaces the call to 'end'
//     } else {
//         console.log(`${req.method} ${req.url}`);
//         res.end('Hello world!');
//     }
// });

// This a minimal web server, though not a very interesting one. With the information
// contained in IncomingRequest, you can expand this model to create any kind of website
// you wish.
// If you’re using Node to serve websites, you’ll probably want to look into using a
// framework such as Express or Koa that will take some of the drudgery out of building
// a web server from scratch.
