function setup() {
  createCanvas(500,500);
  background(0);

  var neural = new NeuralNetwork(2, 3, 5);
  var array = [1,2];
  neural.feedforward(array);
}

function draw() {
  // put drawing code here
}