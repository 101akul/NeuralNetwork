function sigmoid(x) {
  let temp = (1 + Math.exp(-x));
  return 1 / temp;
}

function dsigmoid(y) {
  return y * (1 - y);
}

class NeuralNetwork {
  constructor(input, hidden, output) {
    this.inputNodes = input;
    this.hiddenNodes = hidden;
    this.outputNodes = output;

    this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);

    this.weightsIH.randomize();
    this.weightsHO.randomize();

    this.biasH = new Matrix(this.hiddenNodes, 1);
    this.biasO = new Matrix(this.outputNodes, 1);

    this.biasH.randomize();
    this.biasO.randomize();

    this.learnR = 0.1;

  }

  feedforward(inputs) {
    let input = Matrix.toMatrix(inputs);

    let hidden = Matrix.product(this.weightsIH, input);
    hidden.add(this.biasH);
    NeuralNetwork.activation(hidden);

    let output = Matrix.product(this.weightsHO, hidden);
    output.add(this.biasO);
    NeuralNetwork.activation(output);

    return Matrix.toArr(output);

  }

  static activation(m) {
    m.map(sigmoid);
  }

  train(input_arr, target_arr) {
    let inputs = Matrix.toMatrix(input_arr);
    let hidden = Matrix.product(this.weightsIH, inputs);
    hidden.add(this.biasH);
    NeuralNetwork.activation(hidden);

    let outputs = Matrix.product(this.weightsHO, hidden);
    outputs.add(this.biasO);
    NeuralNetwork.activation(outputs);

    let targets = Matrix.toMatrix(target_arr);

    //calculate the gradient/ the output error
    let outputError = Matrix.subtract(targets, outputs);
    let outGradient = Matrix.map(outputs, dsigmoid);
    outGradient.multiply(outputError);
    outGradient.multiply(this.learnR);

    //calculate delta based on sigmoid func
    let hiddenT = Matrix.transpose(hidden);
    let weightsHOd = Matrix.product(outGradient, hiddenT);

    this.weightsHO.add(weightsHOd);
    this.biasO.add(outGradient);

    let weightsHOt = Matrix.transpose(this.weightsHO);
    let hiddenError = Matrix.product(weightsHOt, outputError);

    let hidGradient = Matrix.map(hidden, dsigmoid);
    hidGradient.multiply(hiddenError);
    hidGradient.multiply(this.learnR);

    //calculate input to hidden delta
    let inputT = Matrix.transpose(inputs);
    let weightsIHd = Matrix.product(hidGradient, inputT);

    this.weightsIH.add(weightsIHd);
    this.biasH.add(hidGradient);
  }
}
