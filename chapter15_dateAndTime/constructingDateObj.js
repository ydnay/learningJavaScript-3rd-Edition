// Constructing Date Objects

// The Date object can be constructed in four ways. Without any arguments (as we’ve
// seen already), it simply returns a Date object representing the current date. We can
// also provide a string that JavaScript will attempt to parse, or we can specify a specific
// (local) date down to the millisecond. Here are examples:

// all of the below are interpreted with respect to local time
new Date(); // current date

// note that months are zero-based in JavaScript: 0=Jan, 1=Feb, etc.
new Date(2015, 0); // 12:00 A.M., Jan 1, 2015
new Date(2015, 1); // 12:00 A.M., Feb 1, 2015
new Date(2015, 1, 14); // 12:00 A.M., Feb 14, 2015
new Date(2015, 1, 14, 13); // 3:00 P.M., Feb 14, 2015
new Date(2015, 1, 14, 13, 30); // 3:30 P.M., Feb 14, 2015
new Date(2015, 1, 14, 13, 30, 5); // 3:30:05 P.M., Feb 14, 2015
new Date(2015, 1, 14, 13, 30, 5, 500); // 3:30:05.5 P.M., Feb 14, 2015

// creates dates from Unix Epoch timestamps
new Date(0); // 12:00 A.M., Jan 1, 1970 UTC
new Date(1000); // 12:00:01 A.M., Jan 1, 1970 UTC
new Date(1463443200000); // 5:00 P.M., May 16, 2016 UTC

// use negative dates to get dates prior to the Unix Epoch
new Date(-365 * 24 * 60 * 60 * 1000); // 12:00 A.M., Jan 1, 1969 UTC

// parsing date strings (defaults to local time)
new Date('June 14, 1903'); // 12:00 A.M., Jun 14, 1903 local time
new Date('June 14, 1903 GMT-0000'); // 12:00 A.M., Jun 14, 1903 UTC

// Constructing Dates on the Server

// If you’re constructing dates on the server, I recommend always either using UTC or
// explicitly specifying the time zone. If you are able to use UTC
// dates, you can construct them with the Date object’s UTC method:
const d = new Date(Date.UTC(2016, 4, 27)); // May 27, 2016 UTC
console.log(d);
// If you need to construct dates on the server that are in a specific time zone (and don’t
// want to do the time zone conversion by hand), you can use moment.tz to construct
// Date instances using a specific time zone:
// passing an array to Moment.js uses the same parameters as JavaScript's Date
// constructor, including zero-based moths (0=Jan, 1=Feb, etc.). toDate()
// converts back to a JavaScript Date object.
// const d = moment.tz([2016, 3, 27, 9, 19], 'America/Los_Angeles').toDate();

// Constructing Dates in the Browser

// Generally, JavaScript’s default behavior is appropriate in the browser. The browser
// knows from the operating system what time zone it’s in, and users generally like to
// work in local time. If you’re building an app that needs to handle dates in other time
// zones, then you’ll want to use Moment.js to handle the conversion and display of
// dates in other time zones.

// Transmitting Dates

// We’ve been talking about “transmitting” very vaguely, though: what exactly do we
// mean? The surest way to ensure that dates are transmitted safely in JavaScript is using
// JavaScript Object Notation (JSON). The JSON specification doesn’t actually specify a
// data type for dates, which is unfortunate, because it prevents symmetric parsing of
// JSON:
const before = {
    d: new Date()
};
console.log(before.d instanceof Date); // true
const json = JSON.stringify(before);
const after = JSON.parse(json);
console.log(after.d instanceof Date); // false
console.log(typeof after.d); // "string"
// So the bad news is that JSON can’t seamlessly and symmetrically handle dates in Java‐
// Script. The good news is that the string serialization that JavaScript uses is always
// consistent, so you can “recover” a date:
after.d = new Date(after.d);
console.log(after.d instanceof Date); // true
// No matter what time zone was originally used to create the date, when it is encoded
// as JSON, it will be in UTC, and when the JSON-encoded string is passed to the Date
// constructor, the date will be displayed in the local time zone.

// The other safe way to pass dates between client and server is to simply use the
// numeric value of the date:
const before1 = { d: new Date().valueOf() };
console.log(typeof before1.d); // "number"
const json1 = JSON.stringify(before);
const after1 = JSON.parse(json1);
console.log(typeof after1.d); // "number"
const d1 = new Date(after1.d);
console.log(d1);