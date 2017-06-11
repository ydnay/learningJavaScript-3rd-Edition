// Anchoring

// Very often, you’ll care about things at the beginning or end of a string, or the entire
// string (as opposed to just a part of it). That’s where anchors come in. There are two
// anchors—^, which matches the beginning of the line, and $, which matches the end
// of the line:
const input = "It was the best of times, it was the worst of times";
const beginning = input.match(/^\w+/g); // "It"
const end = input.match(/\w+$/g); // "times"
const everything = input.match(/^.*$/g); // sames as input
const nomatch1 = input.match(/^best/ig);
const nomatch2 = input.match(/worst$/ig);

// There’s one more nuance to anchors that you need to be aware of. Normally, they
// match the beginning and end of the whole string, even if you have newlines in it. If
// you want to treat a string as multiline (as separated by newlines), you need to use the
// m (multiline) option:
const input1 = "One line\nTwo lines\nThree lines\nFour";
const beginnings = input1.match(/^\w+/mg); // ["One", "Two", "Three", "Four"]
const endings = input1.match(/\w+$/mg); // ["line", "lines", "lines", "Four"]

console.log(beginning, end, everything, nomatch1, nomatch2);
console.log(beginnings, endings);

// Word Boundary Matching

// One of the often-overlooked useful gems of regexes is word boundary matches. Like
// beginning and end-of-line anchors, the word boundary metacharacter, \b, and its
// inverse, \B, do not consume input. This can be a very handy property, as we’ll see
// shortly.

// A word boundary is defined where a \w match is either preceded by or followed by a
// \W (nonword) character, or the beginning or end of the string. Imagine you’re trying
// to replace email addresses in English text with hyperlinks (for the purposes of this
// discussion, we’ll assume email addresses start with a letter and end with a letter).
// Think of the situations you have to consider:
const inputs = [
    "john@doe.com", // nothing but the email
    "john@doe.com is my email", // email at the beginning
    "my email is john@doe.com", // email at the end
    "use john@doe.com, my email", // email in the middle, with comma afterward
    "my email:john@doe.com.", // email surrounded with punctuation
];
// It’s a lot to consider, but all of these email addresses have one thing in common: they
// exist at word boundaries. The other advantage of word boundary markers is that,
// because they don’t consume input, we don’t need to worry about “putting them back”
// in the replacement string:
const emailMatcher =
    /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9_-]+\.[a-z]+(?:\.[a-z]+)?\b/ig;
console.log(inputs.map(s => s.replace(emailMatcher, '<a href="mailto:$&">$&</a>')));

// In addition to using word boundary markers, this regex is using a lot of the features
// we’ve covered in this chapter: it may seem daunting at first glance, but if you take the
// time to work through it, you’re well on your way to regex mastery (note especially
// that the replacement macro, $&, does not include the characters surrounding the
// email address…because they were not consumed).

// Word boundaries are also handy when you’re trying to search for text that begins
// with, ends with, or contains another word. For example, /\bcount/ will find count
// and countdown, but not discount, recount, or accountable. /\bcount\B/ will only find
// countdown, /\Bcount\b/ will find discount and recount, and /\Bcount\B/ will only
// find accountable.

// Lookaheads

// If greedy versus lazy matching is what separates the dilettantes from the pros, lookaheads
// are what separate the pros from the gurus. Lookaheads—like anchor and word
// boundary metacharacters—don’t consume input. Unlike anchors and word boundaries,
// however, they are general purpose: you can match any subexpression without
// consuming it. As with word boundary metacharacters, the fact that lookaheads don’t
// match can save you from having to “put things back” in a replacement. While that can
// be a nice trick, it’s not required. Lookaheads are necessary whenever there is overlapping
// content, and they can simplify certain types of matching.

// A classic example is validating that a password matches some policy. To keep it simple,
// let’s say our password must contain at least one uppercase letter, number, and
// lowercase letter, and no nonletter, nonnumber characters. We could, of course, use
// multiple regexes:
function validPassword(p) {
    return /[A-Z]/.test(p) && // at least one uppercase letter
        /[0-9]/.test(p) && // at least one number
        /[a-z]/.test(p) && // at least one lowercase letters
        !/[^a-zA-Z0-9]/.test(p); // only letters and numbers
}

// Let’s say we want to combine that into one regular expression. Our first attempt fails:
function validPassword1(p) {
    return /[A-Z].*[0-9][a-z]/.test(p);
}

// Not only does this require the capital letter to come before the numbers to come
// before the two lowercase letters, but we haven’t tested for the invalid characters at all.
// And there’s really no sensible way to do it, either, because characters are consumed as
// the regex is processed.
// Lookaheads come to the rescue by not consuming input; essentially each lookahead is
// an independent regex that doesn’t consume any input. Lookaheads in JavaScript look
// like (?=<subexpression>). They also have a “negative lookahead”: (?!<subexpres
// sion>) will match only things that aren’t followed by the subexpression. Now we can
// write a single regex to validate our passwords:
function validPassword2(p) {
    return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?!.*[^a-zA-Z0-9])/.test(p);
}

// You might be looking at this soup of letters and characters and thinking that our
// multiregex function is better—or at least easier to read. And in this example, I would
// probably agree. However, it demonstrates one of the important uses of lookaheads
// (and negative lookaheads). Lookaheads definitely fall into the category of “advanced
// regex,” but are important for solving certain problems.

const goodPsw = 'Ulises31';
const badPsw = 'Ulises-31';
console.log(validPassword(goodPsw));
console.log(validPassword(badPsw));
console.log(validPassword1(goodPsw)); // check for an error, returns false
console.log(validPassword1(badPsw));
console.log(validPassword2(goodPsw));
console.log(validPassword2(badPsw));