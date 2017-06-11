// Searching with Regular Expressions

// Once we have a regex, we have multiple options for using it to search in a string.
// To understand the options for replacement, we’re going to get a little preview of the
// regex metalanguage—using a static string here would be very boring. We’ll use the
// regex /\w{3,}/ig, which will match all words three letters or longer (case insensitive).
// Don’t worry about understanding this right now; that will come later in this
// chapter. Now we can consider the search methods available to us:
const input = "As I was going to Saint Ives";
const re = /\w{3,}/ig;

// starting with the string (input)
input.match(re); // ["was", "going", "Saint", "Ives"]
input.search(re); // 5 (the first three-letter word starts at index 5)

// starting with the regex (re)
console.log(re.test(input)); // true (input contains at least one three-letter word)
const re1 = /\w{3,}/ig;
console.log(re1.exec(input)); // ["was"] (first match)
console.log(re1.exec(input)); // ["going"] (exec "remembers" where it is)
console.log(re1.exec(input)); // ["Saint"]
console.log(re1.exec(input)); // ["Ives"]
console.log(re1.exec(input)); // null -- no more matches

// note that any of these methods can be used directly with a regex literal
input.match(/\w{3,}/ig);
input.search(/\w{3,}/ig);
/\w{3,}/ig.test(input);
/\w{3,}/ig.exec(input);
// ...
// Of these methods, RegExp.prototype.exec provides the most information, but you’ll
// find that it’s the one you use the least often in practice. I find myself using
// String.prototype.match and RegExp.prototype.test the most often.