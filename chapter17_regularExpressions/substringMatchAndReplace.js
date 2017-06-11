// Substring Matching and Replacing

// The essential job of a regex is to match a substring within a string, and optionally
// replace it. Regexes allow you to do this with incredible power and flexibility, so before
// we dive into it, let’s briefly cover the non-regex search and replace functionality of
// String.prototype, which is suitable for very modest search and replacement needs.

// If all you need to do is determine if a specific substring exists in a bigger string, the
// following String.prototype methods will suffice:
const input = "As I was going to Saint Ives";
input.startsWith("As"); // true
input.endsWith("Ives"); // true
input.startsWith("going", 9); // true -- start at index 9
input.endsWith("going", 14); // true -- treat index 14 as the end of the string
input.includes("going"); // true
input.includes("going", 10); // false -- starting at index 10
input.indexOf("going"); // 9
input.indexOf("going", 10); // -1
input.indexOf("nope"); // -1
// Note that all of these methods are case sensitive. So input.startsWith("as") would
// be false. If you want to do a case-insensitive comparison, you can simply convert the
// input to lowercase:
input.toLowerCase().startsWith("as"); // true

// Note that this doesn’t modify the original string; String.prototype.toLowerCase
// returns a new string and doesn’t modify the original string (remember that strings in
// JavaScript are immutable).
// If we want to go a step further and find a substring and replace it, we can use
// String.prototype.replace:
const input1 = "As I was going to Saint Ives";
const output = input1.replace("going", "walking");
console.log(output);
// Again, the original string (input) is not modified by this replacement; output now
// contains the new string with “going” replaced with “walking” (we could have assigned
// back to input, of course, if we really wanted input to change).

// Replacing with Regular Expressions

// The same String.prototype.replace method we saw before for simple string
// replacement also accepts a regex, but it can do a lot more. We’ll start with a simple
// example—replacing all four-letter words:
const input2 = "As I was going to Saint Ives";
const output1 = input2.replace(/\w{4,}/ig, '****'); // "As I was **** to **** ****"

console.log(output1);

// We’ll learn about much more sophisticated replacement methods later in this chapter.
