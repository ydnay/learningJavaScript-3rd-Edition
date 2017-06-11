const http = require('http');

const server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({
        platform: process.platform,
        nodeVersion: process.version,
        uptime: Math.round(process.uptime()),
    }));
});

const port = 7070;
server.listen(port, function () {
    console.log(`Ajax server started on port ${port}`);
});

// This creates a very simple server that reports the platform (“linux,” “darwin,” “win32,”
// etc.), the version of Node.js, and the server uptime.

// To start this server, simply run:
$ babel - node ajaxServer.js
// If you load http://localhost:7070 in a browser, you will see the output of the server.
// Now that we have a server, we can make an Ajax code from our sample HTML page
// (you can use the same one that we’ve been using through this chapter). We’ll start by
// adding a placeholder somewhere in the body that will receive the information:
/*
<div class="serverInfo">
    Server is running on <span data-replace="platform">???</span>
    with Node <span data-replace="nodeVersion">???</span>. It has
    been up for <span data-replace="uptime">???</span> seconds.
</div>
*/

// Now that we have a place to put the data that’s coming from the server, we can use
// XMLHttpRequest to perform an Ajax call. At the bottom of your HTML file (right
// before the closing </body> tag), add the following script:
/*
<script type="application/javascript;version=1.8">
    function refreshServerInfo() {
        const req = new XMLHttpRequest();
        req.addEventListener('load', function() {
            // TODO: put these values into HTML
            console.log(this.responseText);
        });
        req.open('GET', 'http://localhost:7070', true);
        req.send();
    }
    refreshServerInfo();
</script>
*/

// This script executes a basic Ajax call. We first create a new XMLHttpRequest object,
// and then we add a listener that listens for the load event (which is what will get called
// if the Ajax call was successful). For now, we just print the server response (which is in
// this.responseText) to the console. Then we call open, which is what actually establishes
// the connection to the server. We specify that it’s an HTTP GET request, which
// is the same method used when you visit a web page with your browser (there are also
// POST and DELETE methods, among others), and we provide the URL to the server.
// Finally, we call send, which actually executes the request. In this example, we’re not
// explicitly sending any data to the server, but we could.

// If you run this example, you’ll see the data that’s returned from the server show up on
// the console. Our next step is inserting this data into our HTML. We structured our
// HTML so that we could simply look for any element that has the data attribute
// replace, and replace that element’s contents with the data from the object that was
// returned. To accomplish this, we iterate over the properties that were returned from
// the server (using Object.keys), and if there are any elements with matching replace
// data attributes, we replace their contents:
req.addEventListener('load', function () {
    // this.responseText is a string containing JSON; we use
    // JSON.parse to convert it to an object
    const data = JSON.parse(this.responseText);
    // In this example, we only want to replace text within the <div>
    // that has class "serverInfo"
    const serverInfo = document.querySelector('.serverInfo');
    // Iterate over the keys in the object returned from the server
    // ("platform", "nodeVersion", and "uptime"):
    Object.keys(data).forEach(p => {
        // Find elements to replace for this property (if any)
        const replacements =
            serverInfo.querySelectorAll(`[data-replace="${p}"]`);
        // replace all elements with the value returned from the server
        for (let r of replacements) {
            r.textContent = data[p];
        }
    });
});

// Because refreshServerInfo is a function, we can call it at any time. In particular, we
// may wish to update the server info periodically (which is one reason we added the
// uptime field). For example, if we want to update the server five times a second (every
// 200 milliseconds), we can add the following code:
setInterval(refreshServerInfo, 200);
// By doing this, we will see the server uptime increase live in the browser!
