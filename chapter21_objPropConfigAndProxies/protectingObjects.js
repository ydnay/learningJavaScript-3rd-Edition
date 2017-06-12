// Protecting Objects: Freezing, Sealing, and Preventing Extension

// JavaScript’s flexible nature is very powerful, but it can get you into trouble. Because
// any code anywhere can normally modify an object in any way it wishes, it’s easy to
// write code that is unintentionally dangerous or—even worse—intentionally malicious.

// JavaScript does provide three mechanisms for preventing unintentional modifications
// (and making intentional ones more difficult): freezing, sealing, and preventing extension.
// Freezing prevents any changes to an object. Once you freeze an object, you cannot:
// • Set the value of properties on the object.
// • Call methods that modify the value of properties on the object.
// • Invoke setters on the object (that modify the value of properties on the object).
// • Add new properties.
// • Add new methods.
// • Change the configuration of existing properties or methods.

// In essence, freezing an object makes it immutable. It’s most useful for data-only
// objects, as freezing an object with methods will render useless any methods that modify
// the state of the object.

// To freeze an object, use Object.freeze (you can tell if an object is frozen by calling
// Object.isFrozen). For example, imagine you have an object that you use to store
// immutable information about your program (such as company, version, build ID, and
// a method to get copyright information):
const appInfo = {
    company: 'White Knight Software, Inc.',
    version: '1.3.5',
    buildId: '0a995448-ead4-4a8b-b050-9c9083279ea2',
    // this function only accesses properties, so it won't be
    // affected by freezing
    copyright() {
        return `© ${new Date().getFullYear()}, ${this.company}`;
    },
};
// Object.freeze(appInfo);
// Object.isFrozen(appInfo); // true
// appInfo.newProp = 'test';
// // TypeError: Can't add property newProp, object is not extensible
// delete appInfo.company;
// // TypeError: Cannot delete property 'company' of [object Object]
// appInfo.company = 'test';
// // TypeError: Cannot assign to read-only property 'company' of [object Object]
// Object.defineProperty(appInfo, 'company', {
//     enumerable: false
// });
// // TypeError: Cannot redefine property: company

// Sealing an object prevents the addition of new properties, or the reconfiguration or
// removal of existing properties. Sealing can be used when you have an instance of a
// class, as methods that operate on the object’s properties will still work (as long as
// they’re not attempting to reconfigure a property). You can seal an object with
// Object.seal, and tell if an object is sealed by calling Object.isSealed:
class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now(),
        });
    }
}
const log = new Logger("Captain's Log");
Object.seal(log);
Object.isSealed(log); // true
log.name = "Captain's Boring Log"; // OK
log.add("Another boring day at sea...."); // OK
log.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible
log.name = 'test'; // OK
delete log.name;
// TypeError: Cannot delete property 'name' of [object Object]
Object.defineProperty(log, 'log', {
    enumerable: false
});
// TypeError: Cannot redefine property: log

// Finally, the weakest protection, making an object nonextensible, only prevents new
// properties from being added. Properties can be assigned to, deleted, and reconfigured.
// Reusing our Logger class, we can demonstrate Object.preventExtensions and
// Object.isExtensible:
const log2 = new Logger("First Mate's Log");
Object.preventExtensions(log2);
Object.isExtensible(log2); // true
log2.name = "First Mate's Boring Log"; // OK
log2.add("Another boring day at sea...."); // OK
log2.newProp = 'test';

// TypeError: Can't add property newProp, object is not extensible
log2.name = 'test'; // OK
delete log2.name; // OK
Object.defineProperty(log2, 'log',
{ enumerable: false }); // OK
// I find that I don’t use Object.preventExtensions very often. If I want to prevent
// extensions to an object, I typically also want to prevent deletions and reconfiguration,
// so I usually prefer sealing an object.
// See Table 21-1 page 308
