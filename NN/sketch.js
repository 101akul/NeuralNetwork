let training_data = [{
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }
] 

function setup() {
  createCanvas(720, 1080);
  let xor = new NeuralNetwork(2, 2, 1);
  for (let i = 0; i < 50000; i++) {
		let data = random(training_data);
      xor.train(data.inputs, data.targets);
  }
  console.log(xor.feedforward([0, 0]));
  console.log(xor.feedforward([1, 0]));
  console.log(xor.feedforward([0, 1]));
  console.log(xor.feedforward([1, 1]));
}

function draw() {

  background(0, 255, 0);

}
