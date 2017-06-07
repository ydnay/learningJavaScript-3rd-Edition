// To fit the format of this book, we’ll use Lewis Carroll’s
// “Twinkle, Twinkle, Little Bat” from Alice’s Adventures in Wonderland (you can imagine
// a children’s book version with one line per page):
const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
];

// Now that we have our book array, we can get an iterator with its values method:
const it = book.values();

// Our book is
// only six pages long, so it’s easy to demonstrate how we can read it in its entirety:
it.next(); // { value: "Twinkle, twinkle, little bat!", done: false }
it.next(); // { value: "How I wonder what you"re at!", done: false }
it.next(); // { value: "Up above the world you fly,", done: false }
it.next(); // { value: "Like a tea tray in the sky.", done: false }
it.next(); // { value: "Twinkle, twinkle, little bat!", done: false }
it.next(); // { value: "How I wonder what you"re at!", done: false }
it.next(); // { value: undefined, done: true }
it.next(); // { value: undefined, done: true }
it.next(); // { value: undefined, done: true }

// First, let’s see how we can emulate a for...of loop with a while loop with our
// newfound understanding of iterators:
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}

// Note that iterators are distinct; that is, every time you create a new iterator, you’re
// starting at the beginning, and it’s possible to have multiple iterators that are at different
// places:
const it1 = book.values();
const it2 = book.values();
// neither iterator have started

// read two pages with it1:
it1.next(); // { value: "Twinkle, twinkle, little bat!", done: false }
it1.next(); // { value: "How I wonder what you"re at!", done: false }
// read one page with it2:
it2.next(); // { value: "Twinkle, twinkle, little bat!", done: false }
// read another page with it1:
it1.next(); // { value: "Up above the world you fly,", done: false }