// Functions as Subroutines
// reusable subroutine (function) called printLeapYearStatus.
function printLeapYearStatus() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
    else if (year % 100 != 0) console.log(`${year} IS a leap year.`);
    else if (year % 400 != 0) console.log(`${year} is NOT a leap year.`);
    else console.log(`${year} IS a leap year.`);
}
printLeapYearStatus();

// Functions as Subroutines That Return a Value
// Our printLeapYearStatus is nice, but as we build out our program, we quickly grow
// out of logging things to the console. Now we want to use HTML for output, or write
// to a file, or use the current leap year status in other calculations, and our subroutine
// isn’t helping with that.
// Fortunately, it’s easy enough to rewrite (and rename!) our function so that it’s a subroutine
// that returns a value:
function isCurrentYearLeapYear() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) return false;
    else if (year % 100 != 0) return true;
    else if (year % 400 != 0) return false;
    else return true;
}
isCurrentYearLeapYear();

// Functions as…Functions
// Let’s consider a simple example:
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let colorIndex = -1;

function getNextRainbowColor0() {
    if (++colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
}
getNextRainbowColor0();

// Going back to our leap year problem for a moment, how can we take our leap year
// function and turn it into a pure function ? Easy:
function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    else if (year % 100 != 0) return true;
    else if (year % 400 != 0) return false;
    else return true;
}
isLeapYear();

// Our getNextRainbowColor function is a little bit trickier. We can eliminate the side
// effect by putting the external variables in a closure:
const getNextRainbowColor = (function () {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return function () {
        if (++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    };
})();

// Chances are, we’re calling it repeatedly—for example, in a browser to change the color 
// of an element every half-second (we will learn more about browser code in Chapter 18):
setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = getNextRainbowColor();
}, 500);

// This is the point we should stop and question whether a function with side effects is a 
// good idea. In this case, an iterator would probably be a better choice:
function getRainbowIterator() {
    const colors = ['red', 'orange', 'yellow', 'green',
        'blue', 'indigo', 'violet'
    ];
    let colorIndex = -1;
    return {
        next() {
            if (++colorIndex >= colors.length) colorIndex = 0;
            return {
                value: colors[colorIndex],
                done: false
            };
        }
    };
}

// Our function getRainbowIterator is now a pure function: it returns the same thing every time
// (an iterator), and it has no side effects. We have to use it differently, but it’s much safer:
const rainbowIterator = getRainbowIterator();
setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = rainbowIterator.next().value;
}, 500);