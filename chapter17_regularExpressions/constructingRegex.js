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

// Constructing Regexes Dynamically

// We started off this chapter by saying that you should prefer the regex literal over the
// RegExp constructor. In addition to having to type four fewer letters, we prefer the
// regex literal because we don’t have to escape backslashes as we do in JavaScript
// strings. Where we do need to use the RegExp constructor is when we want to construct
// regexes dynamically. For example, you might have an array of usernames you
// want to match in a string; there’s no (sensible) way to get those usernames into a
// regex literal. This is where the RegExp constructor comes in, because it constructs the
// regex from a string—which can be constructed dynamically. Let’s consider this
// example:
const users = ["mary", "nick", "arthur", "sam", "yvette"];
const text = "User @arthur started the backup and 15:15, " +
    "and @nick and @yvette restored it at 18:35.";
const userRegex = new RegExp(`@(?:${users.join('|')})\\b`, 'g');
text.match(userRegex); // [ "@arthur", "@nick", "@yvette" ]
// The equivalent literal regex in this example would be /@(?:mary|nick|arthur|sam|
// yvette)\b/g, but we’ve managed to construct it dynamically. Note that we have to
// use double backslashes before the b (word boundary metacharacter); the first backslash
// is to escape the second backslash in the string.