// Maps

// We have user objects we want to map to roles
const u1 = { name: 'Cynthia' };
const u2 = { name: 'Jackson' };
const u3 = { name: 'Olive' };
const u4 = { name: 'James' };

// Let's create a map
const userRoles = new Map();

// Let's use the map & set() method to assign users to roles
userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin');
    // poor James...we don't assign him a role

// get() method
userRoles.get(u2); // "User"

// If we call a key that isn't in the map, it will return undefined
// Also we can use the has() method to determine if a map contains a key.
userRoles.has(u1); // true
userRoles.get(u1); // "User"
userRoles.has(u4); // false
userRoles.get(u4); // undefined

// If we call set() on a key that's already in the map, its value will be replaced
userRoles.get(u1); // 'User'
userRoles.set(u1, 'Admin');
userRoles.get(u1); // 'Admin'

// the size property returns the number of entries in the map
userRoles.size; // 3

// These 3 methods return an iterable object
// which can be iterated by a for...of loop

// to get the keys in the map
for(let u of userRoles.keys())
    console.log(u.name);

// to return the values
for(let r of userRoles.values())
    console.log(r);

// to get the entires as arrays where the first elem is the key & the second the val
for(let ur of userRoles.entries())
    console.log(`${ur[0].name}: ${ur[1]}`);

// note that we can use destructuring to make
// this iteration even more natural:
for(let [u, r] of userRoles.entries())
    console.log(`${u.name}: ${r}`);

// the entries() method is the default iterator for
// a Map, so you can shorten the previous example to:
for(let [u, r] of userRoles)
    console.log(`${u.name}: ${r}`);

// If we need an array (instead of an iterable object)
[...userRoles.values()]; // [ "User", "User", "Admin" ]

// To delete a single entry
userRoles.delete(u2);
userRoles.size; // 2

// TO remove all entries from a map
userRoles.clear();
userRoles.size; // 0