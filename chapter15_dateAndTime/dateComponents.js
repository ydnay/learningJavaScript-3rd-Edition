// Date Components

// If you need to access individual components of a Date instance, there are methods for
// that:
const d = new Date(Date.UTC(1815, 9, 10));

// these are the results someone would see in Los Angeles
console.log(d.getMonth()); // 9 - October
console.log(d.getFullYear()); // 1815
console.log(d.getDate()); // 9
console.log(d.getDay()); // 1 - Monday
console.log(d.getHours()); // 17
console.log(d.getMinutes()); // 0
console.log(d.getSeconds()); // 0
console.log(d.getMilliseconds()); // 0
// there are allso UTC equivalents to the above:
console.log(d.getUTCMonth()); // 9 - October
console.log(d.getUTCDate()); // 10
console.log(d.getUTCFullYear()); // 1815
// ...etc.

// If you’re using Moment.js, you’ll find little need to work with individual components,
// but it’s good to know that they’re there.

// Comparing Dates

// For simple date comparisons—does date A come after date B or vice versa?—you can
// use JavaScript’s built-in comparison operators. Remember that Date instances store
// the date as a number, so the comparison operators simply work on the numbers:
const d1 = new Date(1996, 2, 1);
const d2 = new Date(2009, 4, 27);
console.log(d1 > d2); // false
console.log(d1 < d2); // true

// Date Arithmetic

// Because dates are just numbers, you can subtract dates to get the number of milliseconds
// between them:
const msDiff = d2 - d1; // 417740400000 ms
const daysDiff = msDiff / 1000 / 60 / 60 / 24; // 4834.96 days
console.log(daysDiff + " days");

// This property also makes it easy to sort dates using Array.prototype.sort:
const dates = [];
// create some random dates
const min = new Date(2017, 0, 1).valueOf();
const delta = new Date(2020, 0, 1).valueOf() - min;
for (let i = 0; i < 10; i++)
    dates.push(new Date(min + delta * Math.random()));
// dates are random and (probably) jumbled
// we can sort them (descending):
dates.sort((a, b) => b - a);
// or ascending:
dates.sort((a, b) => a - b);

// Moment.js brings many powerful methods for doing common date arithmetic, 
// allowing you to add or subtract arbitrary units of time:
// const m = moment(); // now
// m.add(3, 'days'); // m is now three days in the future
// m.subtract(2, 'years'); // m is now two years minus three days in the past
// m = moment(); // reset
// m.startOf('year'); // m is now Jan 1 of this year
// m.endOf('month'); // m is now Jan 31 of this year

// Moment.js also allows you to chain methods:
// const m1 = moment()
//     .add(10, 'hours')
//     .subtract(3, 'days')
//     .endOf('month');

// m is the end of the month you would be in if you
// traveled 10 hours into the future then 3 days back

// User-Friendly Relative Dates

// Very often, it’s nice to be able to present date information in a relative fashion: “three
// days ago” as opposed to a date. Moment.js makes this easy:
// moment().subtract(10, 'seconds').fromNow(); // a few seconds ago
// moment().subtract(44, 'seconds').fromNow(); // a few seconds ago
// moment().subtract(45, 'seconds').fromNow(); // a minute ago
// moment().subtract(5, 'minutes').fromNOw(); // 5 minutes ago
// moment().subtract(44, 'minutes').fromNOw(); // 44 minutes ago
// moment().subtract(45, 'minutes').fromNOw(); // an hour ago
// moment().subtract(5, 'hours').fromNOw(); // 4 hours ago
// moment().subtract(21, 'hours').fromNOw(); // 21 hours ago
// moment().subtract(22, 'hours').fromNOw(); // a day ago
// moment().subtract(344, 'days').fromNOw(); // 344 days ago
// moment().subtract(345, 'days').fromNOw(); // a year ago
// As you can see, Moment.js has chosen some arbitrary (but reasonable) breakpoints
// for when to switch to displaying a different unit. It’s a handy way to get user-friendly
// relative dates.