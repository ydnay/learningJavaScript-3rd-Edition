// Events

// The DOM API describes almost 200 events, and each browser further implements
// nonstandard events, so we certainly won’t discuss all events here, but we will cover
// what you need to know about them. Let’s start with a very easy-to-understand event:
// click. We’ll use the click event to hook up our “highlight” button to our
// highlightParas function:
const highlightActions1 = document.querySelectorAll('[data-action="highlight"]');
for (let a of highlightActions1) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        // highlightParas(a.dataset.containing); // function @ examples.js
    });
}
const removeHighlightActions =
    document.querySelectorAll('[data-action="removeHighlights"]');
for (let a of removeHighlightActions) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        // removeParaHighlights(); // function @ examples.js
    });
}
// Every element has a method named addEventListener that allows you to specify a
// function that will be called when that event occurs. That function takes a single argument,
// an object of type Event. The event object contains all the relevant information
// about the event, which will be specific to the type of event. For example, click events
// will have the properties clientX and clientY, which tell you the coordinates where
// the click occurred, as well as target, which is the element that raised the click event.

// Event Capturing and Bubbling

// Because HTML is hierarchical, events can be handled in multiple places. For example,
// if you click on a button, the button itself could handle the event, the button’s parent,
// parent’s parent, and so on. Because multiple elements have the opportunity to handle
// the event, the question becomes “in what order do elements get the opportunity to
// respond to the event?”

// There are essentially two options. One is to start at the most distant ancestor. This is
// called capturing. In our example, our buttons are children of <div id="content">
// which is, in turn, a child of <body>. Therefore, <body> has the opportunity to “capture”
// events destined for the buttons.

// The other option is to start at the element where the event occurred, and then walk
// up the hierarchy so all ancestors have a chance to respond. This is called bubbling.

// To see all of this in action, consider the following HTML:
// events.html

// If you click the button, this is what you will see on the console:
// capture: BODY
// capture: DIV
// capture: BUTTON
// bubble: BUTTON
// bubble: DIV
// bubble: BODY

// Here we clearly see the capture propagation followed by the bubble propagation. Note
// that on the element on which the event was actually raised, handlers will be called in
// the order they were added, whether they were capture or propagation events (if we
// reversed the order in which we added the capture and bubble event handlers, we
// would see the bubble called before the capture).

// Now let’s see what happens if we cancel propagation. Modify the example to cancel
// propagation on the <div> capture:
// addEventLogger(body, 'capture');
// addEventLogger(body, 'bubble');
// addEventLogger(div, 'capture', 'cancel');
// addEventLogger(div, 'bubble');
// addEventLogger(button, 'capture');
// addEventLogger(button, 'bubble');

// We now see that the propagation continues, but the event is marked as canceled:
// capture: BODY
// capture: DIV (canceled)
// capture: BUTTON (canceled)
// bubble: BUTTON (canceled)
// bubble: DIV (canceled)
// bubble: BODY (canceled)

// Now stop the propagation at the <button> capture:
// addEventLogger(body, 'capture');
// addEventLogger(body, 'bubble');
// addEventLogger(div, 'capture', 'cancel');
// addEventLogger(div, 'bubble');
// addEventLogger(button, 'capture', 'stop');
// addEventLogger(button, 'bubble');

// We see that propagation stops after the <button> element. The <button> bubble
// event still fires, even though the capture fired first and stopped the propagation. The
// <div> and <body> elements do not receive their bubbled events, however:
// capture: BODY
// capture: DIV (canceled)
// capture: BUTTON (canceled)
// bubble: BUTTON (canceled)

// Lastly, we stop immediately on the <button> capture:
// addEventLogger(body, 'capture');
// addEventLogger(body, 'bubble');
// addEventLogger(div, 'capture', 'cancel');
// addEventLogger(div, 'bubble');
// addEventLogger(button, 'capture', 'stop!');
// addEventLogger(button, 'bubble');

// Now we see that propagation stops totally at the <button> capture, and no further
// propagation occurs:
// capture: BODY
// capture: DIV (canceled)
// capture: BUTTON (canceled)

// Event Categories

// MDN has an excellent reference of all DOM events grouped into categories. Some
// commonly used event categories include:

// Drag events
    // Allow the implementation of a drag-and-drop interface with events like drag
    // start, drag, dragend, drop, and others.
// Focus events
    // Allow you to take action when a user interacts with editable elements (such as
    // form fields). focus is raised when a user “enters” a field (by clicking, pressing
    // Tab, or touching), and blur is raised when the user “leaves” a field (by clicking
    // somewhere else, pressing Tab, or touching elsewhere). The change event is raised
    // when a user makes a change to a field.
// Form events
    // When a user submits a form (by pressing a Submit button, or pressing Enter in
    // the right context), the submit event is raised on the form.
// Input device events
    // We’ve already seen click, but there are additional mouse events (mousedown,
    // move, mouseup, mouseenter, mouseleave, mouseover, mousewheel) and keyboard
    // events (keydown, keypress, keyup). Note that “touch” events (for touch-enabled
    // devices) take precedence over mouse events, but if touch events aren’t handled,
    // they result in mouse events. For example, if a user touches a button, and touch
    // events aren’t handled explicitly, a click event will be raised.
// Media events
    // Allow you to track a user’s interaction with HTML5 video and audio players
    // (pause, play, etc.).
// Progress events
    // Inform you about the browser’s progress loading content. The most common is
    // load, which fires once the browser has loaded the element and all its dependent
    // resources. error is also useful, allowing you to take action when an element is
    // unavailable (for example, a broken image link).
// Touch events
    // Touch events provide sophisticated support for devices that allow touch. Multiple
    // simultaneous touches are permitted (look for the touches property in the event),
    // enabling sophisticated touch handling, such as support for gestures (pinch,
    // swipe, etc.).