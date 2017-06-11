// The Period Metacharacter and Escaping

// In regex, the period is a special character that means “match anything” (except newlines).
// Very often, this catch-all metacharacter is used to consume parts of the input
// that you don’t care about. Let’s consider an example where you’re looking for a single
// five-digit zip code, and then you don’t care about anything else on the rest of the line:
const input = "Address: 333 Main St., Anywhere, NY, 55532. Phone: 555-555-2525.";
const match = input.match(/\d{5}.*/);

// You might find yourself commonly matching a literal period, such as the periods in a
// domain name or IP address. Likewise, you may often want to match things that are
// regex metacharacters, such as asterisks and parentheses. To escape any special regex
// character, simply prefix it with a backslash:
const equation = "(2 + 3.5) * 7";
const match1 = equation.match(/\(\d \+ \d\.\d\) \* \d/);

console.log(match);
console.log(match1);

// A True Wildcard

// Because the period matches any character except newlines, how do you match any
// character including newlines? (This comes up more often than you might think.)
// There are lots of ways to do this, but probably the most common is [\s\S]. This
// matches everything that’s whitespace…and everything that’s not whitespace. In short,
// everything.

// Grouping

// So far, the constructs we’ve learned about allow us to identify single characters (repetition
// allows us to repeat that character match, but it’s still a single-character match).
// Grouping allows us to construct subexpressions, which can then be treated like a single
// unit.

// Let’s look at some examples. Imagine you’re trying to match domain names, but only .com, .org, 
// and .edu:
const text = "Visit oreilly.com today!";
const match2 = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);

// Another advantage of groups is that you can apply repetition to them. Normally, repetition
// applies only to the single character to the left of the repetition metacharacter.
// Groups allow you to apply repetition to whole strings. Here’s a common example. If
// you want to match URLs, and you want to include URLs that start with http://,
// https://, and simply // (protocol-independent URLs), you can use a group with a zeroor-
// one (?) repetition:
const html = '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n' +
    '<link rel="stylesheet" href="https://secure.com/securestuff.css">\n' +
    '<link rel="stylesheet" href="//anything.com/flexible.css">';
const matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);

// Look like alphabet soup to you? It does to me too. But there’s a lot of power packed
// into this example, and it’s worth your while to slow down and really consider it. We
// start off with a noncapturing group: (?:https?)?. Note there are two zero-or-one
// repetition metacharacters here. The first one says “the s is optional.” Remember that
// repetition characters normally refer only to the character to their immediate left. The
// second one refers to the whole group to its left. So taken all together, this will match
// the empty string (zero instances of https?), http, or https. Moving on, we match
// two slashes (note we have to escape them: \/\/). Then we get a rather complicated
// character class. Obviously domain names can have letters and numbers in them, but
// they can also have dashes (but they have to start with a letter, and they can’t end with
// a dash).

console.log(match2);
console.log(matches);

// Lazy Matches, Greedy Matches
// What separates the regex dilettantes from the pros is understanding lazy versus
// greedy matching. Regular expressions, by default, are greedy, meaning they will match
// as much as possible before stopping. Consider this classic example.
// You have some HTML, and you want to replace, for example, <i> text with <strong>
// text. Here’s our first attempt:
const input1 = "Regex pros know the difference between\n" +
    "<i>greedy</i> and <i>lazy</i> matching.";
input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');
// The $1 in the replacement string will be replaced by the contents of the group (.*) in
// the regex (more on this later).

// Go ahead and try it. You’ll find the following disappointing result: 
// "Regex pros know the difference between 
// <i> greedy </i> and <i>lazy</i> matching."

console.log(input1);

// To understand what’s going on here, think back to how the regex engine works: it
// consumes input until it satisfies the match before moving on. By default, it does so in
// a greedy fashion: it finds the first <i> and then says, “I’m not going to stop until I see
// an </i> and I can’t find any more past that.” Because there are two instances of </i>, it
// ends at the second one, not the first.

// There’s more than one way to fix this example, but because we’re talking about greedy
// versus lazy matching, we’ll solve it by making the repetition metacharacter (*) lazy
// instead. We do so by following it with a question mark:
input1.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</strong>');

// The regex is exactly the same except for the question mark following the * metacharacter.
// Now the regex engine thinks about this regex this way: “I’m going to stop as
// soon as I see an </i>.” So it lazily stops matching every time it sees an </i> without
// scanning further to see if it could match later. While we normally have a negative
// association with the word lazy, that behavior is what we want in this case.
// All of the repetition metacharacters—*, +, ?, {n}, {n,} and {n,m}—can be followed
// with a question mark to make them lazy (though in practice, I’ve only ever used it for
// * and +).

// Replacing Groups

// One of the benefits grouping brings is the ability to make more sophisticated replacements.
// Continuing with our HTML example, let’s say that we want to strip out everything
// but the href from an <a> tag:
let html1 = '<a class="nope" href="/yep">Yep</a>';
html1 = html1.replace(/<a .*?(href=".*?").*?>/, '<a $1>');

// Just as with backreferences, all groups are assigned a number starting with 1. In the
// regex itself, we refer to the first group with \1; in the replacement string, we use $1.
// Note the use of lazy quantifiers in this regex to prevent it from spanning multiple <a>
// tags. This regex will also fail if the href attribute uses single quotes instead of double
// quotes.

// Now we’ll extend the example. We want to preserve the class attribute and the href
// attribute, but nothing else:
let html2 = '<a class="yep" href="/yep" id="nope">Yep</a>';
html2 = html2.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');

// Note in this regex we reverse the order of class and href so that href always occurs
// first. The problem with this regex is that class and href always have to be in the
// same order and (as mentioned before) it will fail if we use single quotes instead of
// double. We’ll see an even more sophisticated solution in the next section.
// In addition to $1, $2, and so on, there are also $‘ (everything before the match), $&
// (the match itself), and $’ (everything after the match). If you want to use a literal dollar
// sign, use $$:
const input2 = "One two three";
input2.replace(/two/, '($`)'); // "One (One ) three"
input2.replace(/\w+/g, '($&)'); // "(One) (two) (three)"
input2.replace(/two/, "($')"); // "One ( three) three"
input2.replace(/two/, "($$)"); // "One ($) three"

// These replacement macros are often neglected, but I’ve seen them used in very clever
// solutions, so don’t forget about them!

console.log(html1);
console.log(html2);