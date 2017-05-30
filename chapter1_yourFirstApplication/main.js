$(document).ready(function () { // JS code here
  'use strict'; // tells JS interpreter to treat the code rigorously
  paper.install(window); // install Paper.js in the global scope
  paper.setup(document.getElementById('mainCanvas')); // attahces Paper.js to the canvas
  // Here we are drawing the circles on the canvas ourselves
  // creates a circle obj (x, y, radius)
  var c = Shape.Circle(200, 200, 50);

  // c.fillColor = 'green'; // sets the fill color
  var c;
  for (var x = 25; x < 400; x += 50) {
    for (var y = 25; y < 400; y += 50) {
      c = Shape.Circle(x, y, 10);
      c.fillColor = 'green';
    }
  }

  // Here we create a black, center circle with the text 'hello world'
  var c = Shape.Circle(200, 200, 80);
  c.fillColor = 'black';
  var text = new PointText(200, 200);
  text.justification = 'center';
  text.fillColor = 'white';
  text.fontSize = 20;
  text.content = 'hello world';

  // Here we are handling user input to generate the circles
  var tool = new Tool();
  tool.onMouseDown = function (event) {
    var c = Shape.Circle(event.point, 20);
    c.fillColor = 'green';
  };

  paper.view.draw(); // tells Paper.js to draw something to the screen
  console.log('main.js loaded');
});
