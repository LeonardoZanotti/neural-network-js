function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        console.log(' ----- bias ----- ');
        this.bias_ih = new Matrix(this.h_nodes, 1)
        this.bias_ho = new Matrix(this.o_nodes, 1)
        this.bias_ho.randomize();
        this.bias_ih.randomize();
        this.bias_ih.printTable();
        this.bias_ho.printTable();

        console.log(' ----- weight ----- ');
        this.weight_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weight_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weight_ih.randomize();
        this.weight_ho.randomize();
        this.weight_ih.printTable();
        this.weight_ho.printTable();
    }

    feedforward(input) {
        // Input to hidden
        console.log(' ----- input to hidden ----- ');
        let inputMatrix = Matrix.arrayToMatrix(input);
        inputMatrix.printTable();
        let hidden = Matrix.multiply(this.weight_ih, inputMatrix);
        hidden.printTable();
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.printTable();
        hidden.arrayMap(sigmoid);
        hidden.printTable();

        // Hidden to output
        console.log(' ----- hidden to output ----- ');
        let output = Matrix.multiply(this.weight_ho, hidden);
        output.printTable();
        output = Matrix.add(output, this.bias_ho);
        output.printTable();
        output.arrayMap(sigmoid);
        output.printTable();
    }
}