// Alternation

// Imagine you have an HTML page stored in a string, and you want to find all tags that
// can reference an external resource (<a>, <area>, <link>, <script>, <source>, and
// sometimes, <meta>). Furthermore, some of the tags may be mixed case (<Area>,
// <LINKS>, etc.). Regular expression alternations can be used to solve this problem:
const html = 'HTML with <a href="/one">one link</a>, and some JavaScript.' +
    '<script src="stuff.js"></script>';
const matches = html.match(/area|a|link|script|source/ig); // first attempt

console.log(matches);

// Matching HTML

// In the previous example, we perform a very common task with regexes: matching
// HTML. Even though this is a common task, I must warn you that, while you can generally
// do useful things with HTML using regexes, you cannot parse HTML with
// regexes. Parsing means to completely break something down into its component
// parts. Regexes are capable of parsing regular languages only (hence the name).

// To have a solution that works in 100% of the cases, you would
// have to employ a parser. Consider the following example:
const html1 = '<br> [!CDATA[[<br>]]';
const matches1 = html1.match(/<br>/ig);

console.log(matches1);

// Character Sets

// Character sets provide a compact way to represent alternation of a single character
// (we will combine it with repetition later, and see how we can extend this to multiple
// characters). Let’s say, for example, you wanted to find all the numbers in a string. You
// could use alternation:
const beer99 = "99 bottles of beer on the wall " +
    "take 1 down and pass it around -- " +
    "98 bottles of beer on the wall.";
const matches2 = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);

// How tedious! And what if we wanted to match not numbers but letters? Numbers and
// letters? Lastly, what if you wanted to match everything that’s not a number? That’s
// where character sets come in. At their simplest, they provide a more compact way of
// representing single-digit alternation. Even better, they allow you to specify ranges.
// Here’s how we might rewrite the preceding:
const m1 = beer99.match(/[0123456789]/g); // okay
const m2 = beer99.match(/[0-9]/g); // better!

// You can even combine ranges. Here’s how we would match letters, numbers, and
// some miscellaneous punctuation (this will match everything in our original string
// except whitespace):
const match = beer99.match(/[\-0-9a-z.]/ig);

// Another very powerful feature of character sets is the ability to negate character sets.
// Negated character sets say “match everything but these characters.” To negate a character
// set, use a caret (^) as the first character in the set:
const match1 = beer99.match(/[^\-0-9a-z.]/);
// This will match only the whitespace in our original string (if we wanted to match only
// whitespace, there are better ways to do it, which we’ll learn about shortly).

console.log(matches2);
console.log(m1);
console.log(m2);
console.log(match);
console.log(match1);

// Named Character Sets

// Probably the most commonly used of these abbreviations is the whitespace set (\s).
// For example, whitespace is often used to line things up, but if you’re trying to parse it
// programmatically, you want to be able to account for different amounts of whitespace:
const stuff =
    'hight: 9\n' +
    'medium: 5\n' +
    'low: 2\n';
const levels = stuff.match(/:\s*[0-9]/g);
// (The * after the \s says “zero or more whitespace,” which we’ll learn about shortly.)

// Don’t overlook the usefulness of the negated character classes (\D, \S, and \W); they
// represent a great way of getting rid of unwanted cruft. For example, it’s a great idea to
// normalize phone numbers before storing in a database. People have all kinds of fussy
// ways of entering phone numbers: dashes, periods, parentheses, and spaces. For
// searching, keying, and identification, wouldn’t it be nice if they were just 10-digit
// numbers? (Or longer if we’re talking about international phone numbers.) With \D,
// it’s easy:
const messyPhone = '(505) 555-1515';
const neatPhone = messyPhone.replace(/\D/g, '');

// Similarly, I often use \S to make sure there’s data in required fields (they have to have
// at least one character that’s not whitespace):
const field = ' something ';
const valid = /\S/.test(field);

console.log(levels);
console.log(neatPhone);
console.log(valid);

// Repetition

// Repetition metacharacters allow you to specify how many times something matches.
// Consider our earlier example where we were matching single digits. What if, instead,
// we wanted to match numbers (which may consist of multiple contiguous digits)? We
// could use what we already know and do something like this:
const match2 = beer99.match(/[0-9][0-9][0-9]|[0-9][0-9]|[0-9]/);

// Notice how we again have to match the most specific strings (three-digit numbers)
// before we match less specific ones (two-digit numbers). This will work for one-, two-,
// and three-digit numbers, but when we add four-digit numbers, we’d have to add to
// our alternation. Fortunately, there is a better way:
const match3 = beer99.match(/[0-9]+/);
// Note the + following the character group: this signals that the preceding element
// should match one or more times. “Preceding element” often trips up beginners. The
// repetition metacharacters are modifiers that modify what comes before them. They do
// not (and cannot) stand on their own.

console.log(match2);
console.log(match3);