// Functions in an Array

// This is a pattern that hasn’t been used very much historically, but its usage is increasing,
// and it is extremely useful in certain circumstances. One application is the idea of
// a pipeline—that is, a set of individual steps we want to do frequently. The advantage of
// using arrays is that you can modify an array at any time. Need to take a step out? Just
// remove it from the array. Need to add a step? Just append something to the array.

// One example is graphics transformations.If you’ re building some kind of visualization
// software, there is often a“ pipeline” of transformations that you apply to many
// points.The following shows an example of common 2 D transforms:
const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI / 4;
const zoom = 2;
const offset = [1, -3];
const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta)
        };
    },
    function scale(p) {
        return {
            x: p.x * zoom,
            y: p.y * zoom
        };
    },
    function translate(p) {
        return {
            x: p.x + offset[0],
            y: p.y + offset[1]
        };
    },
];
// pipeline is now an array of functions for a specific 2D transform
// we can now transform a point:
const p = {
    x: 1,
    y: 1
};
let p2 = p;
for (let i = 0; i < pipeline.length; i++) {
    p2 = pipeline[i](p2);
}
// p2 is now p1 rotated 45 degrees (pi/4 radians) around the origin,
// moved 2 units farther from the origin, and translated 1 unit to the
// right and 3 units down

// This example is very basic for a graphics transformation, but hopefully it gives you a
// glimpse into the power of storing functions in an array. Note the syntax as we apply
// each function in the pipeline: pipeline[i] accesses element i of the pipeline, which
// evaluates to a function. Then the function is invoked (parentheses). The point is
// passed in, and then assigned back to itself. In this way, the point is the cumulative
// result of executing each step in the pipeline.

// Pipeline processing is not just found in graphics applications: it’s also popular in
// audio processing and many scientific and engineering applications. In reality, any
// time you have a series of functions you need to execute in a specified order, a pipeline
// is a useful abstraction.