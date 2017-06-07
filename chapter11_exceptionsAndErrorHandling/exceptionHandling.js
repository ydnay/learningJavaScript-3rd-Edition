// To safeguard against this unanticipated error, we can wrap our code in a try...catch
// statement:
const email = null; // whoops

try {
    const validatedEmail = validateEmail(email);
    if(validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Valid email: ${validatedEmail}`);
    }
} catch(err) {
    console.error(`Error: ${err.message}`);
}

// Throwing Errors
// When you call throw, the current function immediately stops executing (so, in our
// example, account.transfer won’t get called, which is what we want).
function billPay(amount, payee, account) {
    if(amount > account.balance)
        throw new Error('insufficient funds');
    account.transfer(payee, amount);
}