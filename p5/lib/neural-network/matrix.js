class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    // general functions
    printTable(text) {
        console.log(text);
        console.table(this.data);
    }

    randomize() {
        this.arrayMap((element, i, j) => {
            return (Math.random() * 2 - 1);
        })
    }

    arrayMap(func) {
        this.data = this.data.map((array, i) => {
            return array.map((element, j) => {
                return func(element, i, j);
            });
        });

        return this;
    }
    
    // static operations matrix x scalar
    static scalar_multiply(a, scalar) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.arrayMap((element, i, j) => {
            return a.data[i][j] * scalar;
        });

        return matrix;
    }

    // static operations matrix x matrix
    static adjustToBias(gradient, bias) {
        let matrix = new Matrix(bias.rows, bias.cols);

        matrix.arrayMap((element, i, j) => {
            return gradient.data[0][0];
        });

        return matrix;
    }

    static arrayMap(a, func) {
        let matrix = new Matrix(a.rows, a.cols);
        matrix.data = a.data;

        matrix.data = matrix.data.map((array, i) => {
            return array.map((element, j) => {
                return func(element, i, j);
            });
        });

        return matrix;
    }

    static transpose(a) {
        let matrix = new Matrix(a.cols, a.rows);

        matrix.arrayMap((element, i, j) => {
            return a.data[j][i];
        });

        return matrix;
    }

    static hadamard(a, b) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.arrayMap((element, i, j) => {
            return a.data[i][j] * b.data[i][j];
        });

        return matrix;
    }

    static arrayToMatrix(array) {
        let matrix = new Matrix(array.length, 1);

        matrix.arrayMap((element, i, j) => {
            return array[i];
        })

        return matrix;
    }

    static matrixToArray(matrix) {
        let array = [];

        matrix.arrayMap((element, i, j) => {
            array.push(element);
        })

        return array;
    }

    static add(a, b) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.arrayMap((element, i, j) => {
            return a.data[i][j] + b.data[i][j];
        });

        return matrix;
    }

    static subtract(a, b) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.arrayMap((element, i, j) => {
            return a.data[i][j] - b.data[i][j];
        });

        return matrix;
    }

    static multiply(a, b) {
        let matrix = new Matrix(a.rows, b.cols);

        matrix.arrayMap((element, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });

        return matrix;
    }
}