// Constructing Regular Expressions

// Before we get into the complexities of the regex metalanguage, let’s talk about how
// they’re actually constructed and used in JavaScript. For these examples, we’ll be
// searching for a specific string, just as before—an overkill for regexes, but an easy way
// to understand how they’re used.
// Regexes in JavaScript are represented by the class RegExp. While you can construct a
// regex with the RegExp constructor, regexes are important enough to merit their own
// literal syntax. Regex literals are set off with forward slashes:
const re1 = /going/; // regex that can search for the word "going"
const re2 = new RegExp("going"); // equivalent object constructor
// There is a specific reason to use the RegExp constructor that we’ll cover later in this
// chapter, but except for that special case, you should prefer the more convenient literal
// syntax.

console.log(re1);
console.log(re2);