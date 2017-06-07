// Let’s look at a simple example—a generator that returns all the colors of the rainbow:
function* rainbow() { // the asterisk marks this as a generator
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}

// Now let’s see how we call this generator. Remember that when you call a generator,
// you get back an iterator. We’ll call the function, and then step through the iterator:
const it = rainbow();
it.next(); // { value: "red", done: false }
it.next(); // { value: "orange", done: false }
it.next(); // { value: "yellow", done: false }
it.next(); // { value: "green", done: false }
it.next(); // { value: "blue", done: false }
it.next(); // { value: "indigo", done: false }
it.next(); // { value: "violet", done: false }
it.next(); // { value: undefined, done: true }

// Because the rainbow generator returns an iterator, we can also use it in a
// for... of loop:
for (let color of rainbow()) {
    console.log(color);
}