// Process

// Every running Node program has access to a variable called process that allows it to
// get information about—and control—its own execution. For example, if your application
// encounters an error so severe that it’s inadvisable or senseless to continue executing
// (often called a fatal error), you can immediately stop execution by calling
// process.exit. You can also provide a numeric exit code, which is used by scripts to
// determine whether or not your program exited successfully. Conventionally, an exit
// code of 0 has indicated “no error,” and a nonzero exit code indicates an error. Consider
// a script that processes .txt files in a subdirectory data: if there are no files to process,
// there’s nothing to do, so the program exits immediately, but it’s not an error. On
// the other hand, if the subdirectory data doesn’t exist, we will consider this a more
// serious problem, and the program should exit with an error. Here’s how that program
// might look:
// const fs = require('fs');
// fs.readdir('data', function (err, files) {
//     if (err) {
//         console.error("Fatal error: couldn't read data directory.");
//         process.exit(1);
//     }
//     const txtFiles = files.filter(f => /\.txt$/i.test(f));
//     if (txtFiles.length === 0) {
//         console.log("No .txt files to process.");
//         process.exit(0);
//     }
//     // process .txt files...
// });

// The process object also gives you access to an array containing the command-line
// arguments passed to the program. When you execute a Node application, you can
// provide optional command-line arguments. For example, we could write a program
// that takes multiple filenames as command-line arguments, and print out the number
// of lines of text in each file. We might invoke the program like this:
//      $ node linecount.js file1.txt file2.txt file3.txt

// The command-line arguments are contained in the process.argv array.2 Before we
// count the lines in our files, let’s print out process.argv so we know what we’re getting:

// console.log(process.argv);

// Along with file1.txt, file2.txt, and file3.txt, you’ll see a couple of extra elements at the
// beginning of the array:
['node',
    '/home/jdoe/linecount.js',
    'file1.txt',
    'file2.txt',
    'file3.txt'
];
// The first element is the interpreter, or program that interpreted the source file (node,
// in our case). The second element is the full path to the script being executed, and the
// rest of the elements are any arguments passed to the program. Because we don’t need
// this extra information, we’ll just use Array.slice to get rid of it before counting the
// lines in our files:
const fs = require('fs');
const filenames = process.argv.slice(2);
let counts = filenames.map(f => {
    try {
        const data = fs.readFileSync(f, {
            encoding: 'utf8'
        });
        return `${f}: ${data.split('\n').length}`;
    } catch (err) {
        return `${f}: couldn't read file`;
    }
});
console.log(counts.join('\n'));

// process also gives you access to environment variables through the object pro
// cess.env. Environment variables are named system variables that are primarily used
// for command-line programs. On most Unix systems, you can set an environment
// variable simply by typing export VAR_NAME=some value (environment variables are
// traditionally all caps). On Windows, you use set VAR_NAME=some value. Environment
// variables are often used to configure the behavior of some aspect of your program
// (without your having to provide the values on the command line every time
// you execute the program).

// For example, we might want to use an environment variable to control whether or
// not our program logs debugging information or “runs silently.” We’ll control our
// debug behavior with an environment variable DEBUG, which we’ll set to 1 if we want to
// debug (any other value will turn debugging off):
const debug = process.env.DEBUG === "1" ?
    console.log :
    function () {};
debug("Visible only if environment variable DEBUG is set!");
// In this example, we create a function, debug, that is simply an alias for console.log if
// the environment variable DEBUG is set, and a null function—a function that does nothing—
// otherwise (if we left debug undefined, we would generate errors when we tried
// to use it!).

// process.cwd tells you what the current working directory is, and pro
// cess.chdir allows you to change it. For example, if you wanted to print out the
// directory in which the program was started, then switch the current working directory
// to the directory where the program itself is located, you could do this:
console.log(`Current directory: ${process.cwd()}`);
process.chdir(__dirname);
console.log(`New current directory: ${process.cwd()}`);