// Function Variables

// Let’s start with the most comprehensible item on that list: aliasing a function. Imagine
// you have a function with an incredibly long name and you want to use it multiple
// times within a few lines, and it’s getting exhausting typing it, and it results in code
// that’s very hard to read. Because a function is just a data type like any other, you can
// create a new variable with a shorter name:

function addThreeSquareAddFiveTakeSquareRoot(x) {
// this is a very silly function, isn't it?
    return Math.sqrt(Math.pow(x + 3, 2) + 5);
}

// before
const answer = (addThreeSquareAddFiveTakeSquareRoot(5) +
        addThreeSquareAddFiveTakeSquareRoot(2)) /
    addThreeSquareAddFiveTakeSquareRoot(7);

// after
const f = addThreeSquareAddFiveTakeSquareRoot;
const answer1 = (f(5) + f(2)) / f(7);

// This is a completely contrived example, of course, and something you don’t really see
// that often. Where it does come up, however, is in namespacing, which is common in
// Node development (see Chapter 20). For example:
const Money = require('math-money'); // require is a Node function to

// import a library
const oneDollar = Money.Dollar(1);

// or, if we don't want to have to say "Money.Dollar" everywhere:
const Dollar = Money.Dollar;
const twoDollars = Dollar(2);

// note that oneDollar and twoDollars are instances of the same type

// In this case, we aren’t so much aliasing Dollar as shortening it from Money.Dollar to
// simply Dollar, which seems a reasonable enough thing to do.