// Function Replacements

// This is my favorite feature of regexes, which often allows you to break down a very
// complex regex into some simpler regexes.

// Let’s consider again the practical example of modifying HTML elements. Imagine
// you’re writing a program that converts all <a> links into a very specific format: you
// want to preserve the class, id, and href attributes, but remove everything else. The
// problem is, your input is possibly messy. The attributes aren’t always present, and
// when they are, you can’t guarantee they’ll be in the same order. So you have to consider
// the following input variations (among many):
const html =
    `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
    `<A href='/foo' Class="foo">Foo</a>\n` +
    `<a href="/foo">Foo</a>\n` +
    `<a onclick="javascript:alert('foo!')" href="/foo">Foo</a>`;
// By now, you should be realizing that this is a daunting task to accomplish with a
// regex: there are just too many possible variations! However, we can significantly
// reduce the number of variations by breaking this up into two regexes: one to recognize
// <a> tags, and another to replace the contents of an <a> tag with only what you
// want.

// Let’s consider the second problem first. If all you had was a single <a> tag, and you
// wanted to discard all attributes other than class, id, and href, the problem is easier.
// Even still, as we saw earlier, this can cause problems if we can’t guarantee the
// attributes come in a particular order. There are multiple ways to solve this problem,
// but we’ll use String.prototype.split so we can consider attributes one at a time:
function sanitizeATag(aTag) {
    // get the parts of the tag...
    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    // parts[1] are the attributes of the opening <a> tag
    // parts[2] are what's between the <a> and </a> tags
    const attributes = parts[1]
        // then we split into individual attributes
        .split(/\s+/);
    return '<a ' + attributes
        // we only want class, id, and href attributes
        .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
        // joined by spaces
        .join(' ')
        // close the opening <a> tag
        +
        '>'
        // add the contents
        +
        parts[2]
        // and the closing tag
        +
        '</a>';
}
// This function is longer than it needs to be, but we’ve broken it down for clarity. Note
// that even in this function, we’re using multiple regexes: one to match the parts of the
// <a> tag, one to do the split (using a regex to identify one or more whitespace characters),
// and one to filter only the attributes we want. It would be much more difficult to
// do all of this with a single regex.

// Now for the interesting part: using sanitizeATag on a block of HTML that might
// contain many <a> tags, among other HTML. It’s easy enough to write a regex to
// match just the <a> tags:
html.match(/<a .*?>(.*?)<\/a>/ig);
// But what do we do with it? As it happens, you can pass a function to String.proto
// type.replace as the replacement parameter. So far, we’ve only be using strings as the
// replacement parameter. Using a function allows you to take special action for each
// replacement. Before we finish our example, let’s use console.log to see how it works:
html.replace(/<a .*?>(.*?)<\/a>/ig, function (m, g1, offset) {
    console.log(`<a> tag found at ${offset}. contents: ${g1}`);
});
// The function you pass to String.prototype.replace receives the following arguments
// in order:
// • The entire matched string (equivalent to $&).
// • The matched groups (if any). There will be as many of these arguments as there
// are groups.
// • The offset of the match within the original string (a number).
// • The original string (rarely used).
// The return value of the function is what gets replaced in the returned string. In the
// example we just considered, we weren’t returning anything, so undefined will be
// returned, converted into a string, and used as a replacement. The point of that example
// was the mechanics, not the actual replacement, so we simply discard the resultant
// string.

// Now back to our example…. We already have our function to sanitize an individual
// <a> tag, and a way to find <a> tags in a block of HTML, so we can simply put them
// together:
html.replace(/<a .*?<\/a>/ig, function (m) {
    return sanitizeATag(m);
});
// We can simplify this even further—considering that the function sanitizeATag
// matches exactly what String.prototype.replace expects, we can rid ourselves of
// the anonymous function, and use sanitizeATag directly:
console.log(html.replace(/<a .*?<\/a>/ig, sanitizeATag));
// Hopefully the power of this functionality is clear. Whenever you find yourself faced
// with a problem involving matching small strings within a bigger string, and you need
// to do processing on the smaller strings, remember that you can pass a function to
// String.prototype.replace!
