// JavaScript has a built-in Error object, which is convenient for any kind of
// error handling (exceptional or anticipated). When you create an instance of
// Error, you can provide an error message:
const err = new Error('invalid email');

// For the sake of simplicity, we’ll treat anything
// that has an at sign (@) in it as a valid email address
function validateEmail(email) {
    return email.match(/@/) ?
    email :
    new Error(`invalid email: ${email}`);
}

// To use this, we can use the typeof operator to determine if an instance of Error has
// been returned. The error message we provided is available in a property message:
const email = 'jane@doe.com';

const validatedEmail = validateEmail(email);
if(validatedEmail instanceof Error) {
    console.error(`Error: ${validatedEmail.message}`);
} else {
    console.log(`Valid email: ${validatedEmail}`);
}
// While this is a perfectly valid and useful way to use the Error instance, it is more
// often used in exception handling