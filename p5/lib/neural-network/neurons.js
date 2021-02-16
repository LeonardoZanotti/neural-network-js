function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x, i, j) {
    return x * (1 - x);
}

class NeuralNetwork {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        // console.log(' ----- bias ----- ');
        this.bias_ih = new Matrix(this.h_nodes, 1)
        this.bias_ho = new Matrix(this.o_nodes, 1)
        this.bias_ho.randomize();
        this.bias_ih.randomize();
        // this.bias_ih.printTable('bias_ih');
        // this.bias_ho.printTable('bias_ho');

        // console.log(' ----- weight ----- ');
        this.weights_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weights_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();
        // this.weights_ih.printTable('weight_ih');
        // this.weights_ho.printTable('weight_ho');

        this.learning_rate = 0.1;
    }

    train(input, target) {
        // Feedforward
        // Input to hidden
        // console.log(' ----- input to hidden ----- ');
        let inputMatrix = Matrix.arrayToMatrix(input);
        // inputMatrix.printTable('inputMatrix');
        let hidden = Matrix.multiply(this.weights_ih, inputMatrix);
        // hidden.printTable('hidden');
        hidden = Matrix.add(hidden, this.bias_ih);
        // hidden.printTable('hidden add bias_ih');
        hidden.arrayMap(sigmoid);
        // hidden.printTable('hidden with sigmoid');

        // Hidden to output
        // console.log(' ----- hidden to output ----- ');
        let output = Matrix.multiply(this.weights_ho, hidden);
        // output.printTable('output (weight_ho x hidden)');
        output = Matrix.add(output, this.bias_ho);
        // output.printTable('output add bias_ho');
        output.arrayMap(sigmoid);
        // output.printTable('output with sigmoid');

        // Backpropagation
        // console.log(' ----- output to hidden ----- ');
        let targetMatrix = Matrix.arrayToMatrix(target);
        let output_error = Matrix.subtract(targetMatrix, output);
        let d_output = Matrix.arrayMap(output, dsigmoid);
        let gradient_O = Matrix.hadamard(output_error, d_output);
        let hidden_T = Matrix.transpose(hidden);
        // output_error.printTable('output error');
        // d_output.printTable('output derivade');
        // gradient_O.printTable('gradient O hadamard');
        gradient_O = Matrix.scalar_multiply(gradient_O, this.learning_rate);
        // gradient_O.printTable('gradient O with LR');
        // hidden_T.printTable('hidden transpose');
        this.bias_ho = Matrix.add(this.bias_ho, gradient_O);
        // this.bias_ho.printTable('bias_ho corrected');
        let weight_ho_deltas = Matrix.multiply(gradient_O, hidden_T);
        // weight_ho_deltas.printTable('weight_ho_deltas');
        this.weights_ho = Matrix.add(this.weights_ho, weight_ho_deltas);
        // this.weights_ho.printTable('weights_ho corrected');

        // console.log(' ----- hidden to input ----- ');
        let weight_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weight_ho_T, output_error);
        let d_hidden = Matrix.arrayMap(hidden, dsigmoid);
        let gradient_H = Matrix.hadamard(hidden_error, d_hidden);
        let inputMatrix_T = Matrix.transpose(inputMatrix);
        // hidden_error.printTable('hidden_error');
        // d_hidden.printTable('hidden derivade');
        // gradient_H.printTable('gradient H hadamard');
        gradient_H = Matrix.scalar_multiply(gradient_H, this.learning_rate);
        // gradient_H.printTable('gradient H with LR');
        // inputMatrix_T.printTable('inputMatrix transpose');
        this.bias_ih = Matrix.add(this.bias_ih, gradient_H);
        // this.bias_ih.printTable('bias_ih corrected');
        let weights_ih_deltas = Matrix.multiply(gradient_H, inputMatrix_T);
        // weights_ih_deltas.printTable('weight_ih_deltas');
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);
        // this.weights_ih.printTable('weights_ih corrected');
    }

    predict(input) {
        // Feedforward
        // Input to hidden
        // console.log(' ----- input to hidden ----- ');
        let inputMatrix = Matrix.arrayToMatrix(input);
        // inputMatrix.printTable('inputMatrix');
        let hidden = Matrix.multiply(this.weights_ih, inputMatrix);
        // hidden.printTable('hidden');
        hidden = Matrix.add(hidden, this.bias_ih);
        // hidden.printTable('hidden add bias_ih');
        hidden.arrayMap(sigmoid);
        // hidden.printTable('hidden with sigmoid');

        // Hidden to output
        // console.log(' ----- hidden to output ----- ');
        let output = Matrix.multiply(this.weights_ho, hidden);
        // output.printTable('output (weight_ho x hidden)');
        output = Matrix.add(output, this.bias_ho);
        // output.printTable('output add bias_ho');
        output.arrayMap(sigmoid);
        // output.printTable('output with sigmoid');
        output = Matrix.matrixToArray(output);
        
        return output;
    }
}