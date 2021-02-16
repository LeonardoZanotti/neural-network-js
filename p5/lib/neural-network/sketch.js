var okError = 0.04;
var train = true;

function setup() {
  createCanvas(500,500);
  background(0);

  neuralNetwork = new NeuralNetwork(2, 3, 1);
  // let input = [1,2];
  // let output = [0, 1];
  // neuralNetwork.train(input, output);

  // XOR
  dataset = {
    inputs:
      [
        [1, 1],
        [1, 0],
        [0, 1],
        [0, 0]
      ],
    outputs:
      [
        [0],
        [1],
        [1],
        [0]
      ]
  }
}

function draw() {
    if (train) {
      for (let i = 0; i <  10000; i++) {
        let index = floor(random(4));
        neuralNetwork.train(dataset.inputs[index], dataset.outputs[index]);
      }
      console.log(neuralNetwork.predict([0, 0])[0]);
      console.log(dataset.outputs[0][0] + okError);
      console.log(neuralNetwork.predict([1, 0])[0]);
      console.log(dataset.outputs[1][0] - okError);
      if (
        neuralNetwork.predict([0, 0])[0] < (dataset.outputs[0][0] + okError) &&
        neuralNetwork.predict([1, 0])[0] > (dataset.outputs[1][0] - okError)
      ) {
        train = false;
        console.log('Terminei de treinar.');
      }
    }
}