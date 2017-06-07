//the finally block, which gets called whether or not there is an error.
try {
    console.log('this line is executed...');
throw new Error('whoops');
    console.log('this line is not...');
} catch(err) {
    console.log('there was an error...');
} finally {
    console.log('...always executed');
    console.log('perform cleanup here');
}