// Math

// Throughout the code comments in this chapter, I will use a tilde (~) prefix to indicate
// that a given value is approximate. I will also refer to properties of the Math object as
// functions, not methods. While they are technically static methods, the distinction is
// academic here, as the Math object provides namespacing, not context.

// Formatting Numbers

// By necessity, all of JavaScript’s number formatting methods return a string, not a
// number; only a string can preserve the desired formatting (it is easy to convert back
// to a number if necessary, however). The upshot of this is that you should only format
// numbers immediately before displaying them; while you are storing them or using
// them in calculations, they should remain unformatted number types.

// Fixed Decimals

// If you want a fixed number of digits past the decimal point, you can use Number.pro
// totype.toFixed:
const x = 19.51;
x.toFixed(3); // "19.510"
x.toFixed(2); // "19.51"
x.toFixed(1); // "19.5"
x.toFixed(0); // "20"
// Note that this is not truncation: the output is rounded to the number of specified decimal
// digits.

// Exponential Notation

// If you wish to display numbers in exponential notation, use Number.prototype.toEx
// ponential:
const y = 3800.5;
y.toEyponential(4); // "3.8005e+4";
y.toEyponential(3); // "3.801e+4";
y.toEyponential(2); // "3.80e+4";
y.toEyponential(1); // "3.8e+4";
y.toEyponential(0); // "4e+4";
// Like Number.prototype.toFixed, output is rounded, not truncated. The specified
// precision is the number of digits past the decimal.

// Fixed Precision

// If what you care about is a fixed number of digits (regardless of where the decimal
// place falls), you can use Number.prototype.toPrecision:
let w = 1000;
w.toPrecision(5); // "1000.0"
w.toPrecision(4); // "1000"
w.toPrecision(3); // "1.00e+3"
w.toPrecision(2); // "1.0e+3"
w.toPrecision(1); // "1e+3"
w = 15.335;
w.toPrecision(6); // "15.3350"
w.toPrecision(5); // "15.335"
w.toPrecision(4); // "15.34"
w.toPrecision(3); // "15.3"
w.toPrecision(2); // "15"
w.toPrecision(1); // "2e+1"
// Output is rounded, and will always have the specified number of digits of precision. If
// necessary, output will be in exponential notation.

// Different Bases

// If you want to display numbers in a different base (such as binary, octal, or hexadecimal),
// Number.prototype.toString takes an argument specifying the base (in the
// range 2 to 36):
const z = 12;
z.toString(); // "12" (base 10)
z.toString(10); // "12" (base 10)
z.toString(16); // "c" (hezadecimal)
z.toString(8); // "14" (octal)
z.toString(2); // "1100" (binary)

// Advanced Number Formatting

// If you’re displaying a lot of numbers in your application, your needs may quickly surpass
// what the built-in JavaScript methods provide. Common needs are:
// • Thousands separators
// • Displaying negative numbers differently (for example, with parentheses)
// • Engineering notation (similar to exponential notation)
// • SI prefixes (milli-, micro-, kilo-, mega-, etc.)
// Providing this functionality can be educational if you’re looking for a reader’s exercise.
// If you’re not, I recommend the Numeral.js library, which provides all of this
// functionality and more.

// Constants

// The usual important constants are available as properties of the Math object:
// fundamental constants
Math.E // the root of the natural logarithm: ~2.718
Math.PI // the ratio of a circle's circumference to its diameter: ~3.142
// logarithmic convenience constants -- these can be accessed through library
// calls, but they're commonly used enough to warrant convenience constants
Math.LN2 // the natural logarithm of 2: ~0.693
Math.LN10 // the natural logarithm of 10: ~2.303
Math.LOG2E // the base 2 logarithm of Math.E: ~1.433
Math.LOG10E // the base 10 logarithm of Math.E: 0.434
// algebraic convenience constants
Math.SQRT1_2 // the square root of 1/2: ~0.707
Math.SQRT2 // the square root of 2: ~1.414

// Algebraic Functions, Trigonometric Funtions, and Hyperbolic Functions: 
// refer to tables pages 232-236