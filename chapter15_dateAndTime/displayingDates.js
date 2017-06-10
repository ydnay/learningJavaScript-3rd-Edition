// const moment = require('moment-timezone');

// Displaying Dates

// Formatting dates for display is often one of the most frustrating problems for beginners.
// JavaScript’s built-in Date object includes only a handful of prepackaged date formats,
// and if they don’t meet your needs, it can be painful to do the formatting
// yourself. Fortunately, Moment.js excels in this area, and if you are particular about
// how dates are displayed, then I recommend you use it.

// To format a date with Moment.js, use its format method. This method takes a string
// with metacharacters that are replaced with the appropriate component of the date.
// For example, the string "YYYY" will be replaced with the four-digit year. Here are
// some examples of date formatting with the Date object’s built-in methods, and the
// more robust Moment.js methods:

const d = new Date(Date.UTC(1930, 4, 10));
// these show output for someone in Los Angeles
console.log(d.toLocaleFormat()); // "5/9/1930 4:00:00 PM"
console.log(d.toLocaleDateString()); // "5/9/1930"
console.log(d.toLocaleTimeString()); // "4:00:00 PM"
console.log(d.toTimeString()); // "17:00:00 GMT-0700 (Pacific Daylight Time)"
console.log(d.toUTCString()); // "Sat, 10 May 1930, 00:00:00 GMT"
// moment(d).format("YYYY-MM-DD"); // "1930-05-09"
// moment(d).format("YYYY-MM-DD HH:mm"); // "1930-05-09 17:00
// moment(d).format("YYYY-MM-DD HH:mm Z"); // "1930-05-09 17:00 -07:00
// moment(d).format("YYYY-MM-DD HH:mm [UTC]Z"); // "1930-05-09 17:00 UTC-07:00
// moment(d).format("dddd, MMMM [the] Do, YYYY"); // "Friday, May the 9th, 1930"
// moment(d).format("h:mm a"); // "5:00 pm"

// This example shows how inconsistent and inflexible the built-in date formatting
// options are. In JavaScript’s favor, these built-in formatting options do attempt to provide
// formatting that’s appropriate for the user’s locale. If you need to support date formatting
// in multiple locales, this is an inexpensive but inflexible way to do it.