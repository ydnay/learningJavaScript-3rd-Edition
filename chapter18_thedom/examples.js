// JS in the Browser

// The DOM

// It’s an instructive exercise to write a function that traverses the entire DOM and prints
// it to the console, starting with document:
function printDOM(node, prefix) {
    console.log(prefix + node.nodeName);
    for (let i = 0; i < node.childNodes.length; i++) {
        printDOM(node.childNodes[i], prefix + '\t');
    }
}
printDOM(document, '');

// DOM "Get" Methods

// The first of these is document.getElementById. Every HTML element on a page may
// be assigned a unique ID, and document.getElementById can retrieve an element by
// its ID:
document.getElementById('content'); // <div id="content">...</div>

// document.getElementsByClassName returns a collection of elements that have the
// given class name:
const callouts = document.getElementsByClassName('callout');
console.log(callouts);

// And document.getElementsByTagName returns a collection of elements that have the
// given tag name:
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs);

// The best way to get the hang of CSS selectors is to load the sample HTML provided in
// this chapter in a browser, open the browser’s console, and try them out with querySe
// lectorAll. For example, in the console:
document.querySelectorAll('.callout');
// All of the examples in this section will produce at least one result with querySelectorAll.

// Manipulating DOM Elements

// Now that we know how to traverse, get, and query elements, what do we do with
// them? Let’s start with content modification. Each element has two properties, text
// Content and innerHTML, that allow you to access (and change) the element’s content.
// textContent strips out all HTML tags and provides text data only, whereas
// innerHTML allows you to create HTML (which results in new DOM nodes). Let’s see
// how we can access and modify the first paragraph in our example:
const para1 = document.getElementsByTagName('p')[0];
para1.textContent; // "This is a simple HTML file."
para1.innerHTML; // "This is a <i>simple</i> HTML file."
para1.textContent = "Modified HTML file"; // look for change in browser
para1.innerHTML = "<i>Modified</i> HTML file"; // look for change in browser

// Creating New DOM Elements

// We’ve already seen how to implicitly create new DOM nodes by setting an element’s
// innerHTML property. We can also explicitly create new nodes with document.crea
// teElement. This function creates a new element, but it doesn’t add it to the DOM;
// you’ll have to do that in a separate step. Let’s create two new paragraph elements; one
// will become the first paragraph in <div id="content">, and the other will become
// the last:
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent = "I was created dynamically!";
p2.textContent = "I was also created dynamically!";

// To add these newly created elements to the DOM, we’ll use the insertBefore and
// appendChild methods. We’ll need to get references to the parent DOM element (<div
// id="content">), and its first child:
const parent = document.getElementById('content');
const firstChild = parent.childNodes[0];

// Now we can insert the newly created elements:
parent.insertBefore(p1, firstChild);
parent.appendChild(p2);
// insertBefore takes the element to inset first, and then a “reference node,” which is
// the node to insert before. appendChild is very simple, appending the specified element
// as the last child.

// Styling Elements

// With that in place, we can find all <p> tags, and if they contain the word unique, add
// the highlight class. Every element has a property classList, which contains all of
// the classes (if any) the element has. classList has an add method that allows you to
// add further classes. We’ll be using this example later in this chapter, so we put it in a
// function called highlightParas:
function highlightParas(containing) {
    if (typeof containing === 'string')
        containing = new RegExp(`\\b${containing}\\b`, 'i');
    const paras = document.getElementsByTagName('p');
    console.log(paras);
    for (let p of paras) {
        if (!containing.test(p.textContent)) continue;
        p.classList.add('highlight');
    }
}
highlightParas('unique');

// And then if we want to remove the highlights, we can use classList.remove:
function removeParaHighlights() {
    const paras = document.querySelectorAll('p.highlight');
    for (let p of paras) {
        p.classList.remove('highlight');
    }
}
removeParaHighlights();

// Data Attributes

// HTML5 introduced data attributes, which allow you to add arbitrary data to HTML
// elements; this data isn’t rendered by the browser, but it does allow you to add information
// to elements that can easily be read and modified by JavaScript. Let’s modify
// our HTML by adding a button that we will eventually hook up to our highlightPa
// ras function, and another one that we’ll hook up to removeParaHighlights:
/*
<button data - action = "highlight" data - containing = "unique" >
        Highlight paragraphs containing "unique" 
    </button> 
    <button data - action = "removeHighlights" >
        Remove highlights 
    </button>
*/
// We’ve called our data attributes action and contains (the names are up to us), and
// we can use document.querySelectorAll to find all elements that have "highlight"
// as their action:
const highlightActions = document.querySelectorAll('[data-action="highlight"]');
// This introduces a new type of CSS selector. So far, we’ve seen selectors that can match
// specific tags, classes, and IDs. The square bracket syntax allows us to match elements
// by any attribute…in this case, a specific data attribute.

// Because we only have one button, we could have used querySelector instead of quer
// ySelectorAll, but this allows us to have multiple elements that are designed to trigger
// the same action (which is quite common: think about actions that you can access
// through a menu, link, or toolbar, all on the same page). If we take a look at one of the
// elements in highlightActions, we note that it has a dataset property:
highlightActions[0].dataset;
// DOMStringMap { containing: "unique", action: "highlight" }

// We can also modify or add data attributes with JavaScript. For example, if we wanted
// to highlight paragraphs with the word giraffe and indicate that we want case-sensitive
// matches, we might do this:
highlightActions[0].dataset.containing = "giraffe";
highlightActions[0].dataset.caseSensitive = "true";