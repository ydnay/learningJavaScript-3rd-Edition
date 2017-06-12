// Child Processes

// The child_process module allows your app to run other programs, whether it be
// another Node program, an executable, or a script in another language.

// The child_process module exposes three primary functions: exec, execFile, and
// fork. As with fs, there are synchronous versions of these functions (execSync,
// execFileSync, and forkSync). exec and execFile can run any executable supported
// by your operating system. exec invokes a shell (which is what underlies your operating
// system’s command line; if you can run it from the command line, you can run it
// from exec). execFile allows you to execute an executable directly, which offers
// slightly improved memory and resource use, but generally requires greater care.
// Lastly, fork allows you to execute other Node scripts (which can also be done with
// exec).

// For demonstration purposes, we’ll execute the command dir, which displays a directory
// listing (while Unix users are more familiar with ls, dir is aliased to ls on most
// Unix systems):
const exec = require('child_process').exec;
exec('dir', function (err, stdout, stderr) {
    if (err) return console.error('Error executing "dir"');
    stdout = stdout.toString(); // convert Buffer to string
    console.log(stdout);
    stderr = stderr.toString();
    if (stderr !== '') {
        console.error('error:');
        console.error(stderr);
    }
});
// Because exec spawns a shell, we don’t need to provide the path to where the dir executable
// lives. If we were invoking a specific program that’s not generally available
// from your system’s shell, you would need to provide a full path to the executable.

// exec takes an optional options object, which allows us to specify things like the
// working directory, environment variables, and more. See the official documentation
// for more information.