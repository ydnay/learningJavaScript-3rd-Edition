// Consider a generator that can carry
// on a conversation:
function* interrogate() {
    const name = yield 'What is your name?';
    const color = yield 'What is your favorite color?';
    return `${name}'s favorite color is ${color}.`;
}

const it = interrogate();
it.next(); // { value: "What is your name?", done: false }
it.next('Ethan'); // { value: "What is your favorite color?", done: false }
it.next('orange'); // { value: "Ethan's favorite color is orange.", done: true }

// Generators and return
// The yield statement by itself doesn’t end a generator, even if it’s the last statement in
// the generator. Calling return from anywhere in the generator will result in done
// being true, with the value property being whatever you returned. For example:
function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}
const it1 = count();
it1.next(); // { value: 'a', done: false }
it1.next(); // { value: 'b', done: false }
it1.next(); // { value: 'c', done: true }

// will print out "a" and "b", but not "c"
for (let l of abc()) {
    console.log(l);
}

// I recommend that you do not use return to provide a meaningful
// value in a generator. If you expect a useful value out of a generator,
// you should use yield; return should only be used to stop the generator
// early. For this reason, I generally recommend not providing
// a value at all when you call return from a generator.