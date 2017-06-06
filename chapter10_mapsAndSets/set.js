// First, create a Set instance:
const roles = new Set();

// Now if we want to add a user role, we can do so with the add() method:
roles.add('User'); // Set [ 'User' ]

// To make this user an administrator, call add() again:
roles.add('Admin'); // Set [ 'User', 'Admin' ]

// Like Map, Set has a size property:
roles.size; // 2

// Here’s the beauty of sets: we don’t have to check to see if something is
// already in the set before we add it. If we add something that’s already in
// the set, nothing happens:
roles.add('User'); // Set [ 'User', 'Admin' ]
roles.size; // 2

// To remove a role, we simply call delete(), which returns true if the role was
// in the set and false otherwise:
roles.delete('Admin'); // true
roles; // Set [ 'User' ]
roles.delete('Admin'); // false