// For example, Santa Claus might have a WeakSet called naughty so he can
// determine who to deliver the coal to:
const naughty = new WeakSet();

const children = [
    { name: 'Suzy' },
    { name: 'Derek' },
];

naughty.add(children[1]);

for(let child of children) {
    if(naughty.has(child))
        console.log(`Coal for ${child.name}!`);
    else
        console.log(`Presents for ${child.name}!`);
}