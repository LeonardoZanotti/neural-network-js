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

    printTable() {
        console.table(this.data);
    }

    randomize() {
        this.arrayMap((element, i, j) => {
            return (Math.random() * 2 - 1);
        })
    }

    static arrayToMatrix(array) {
        let matrix = new Matrix(array.length, 1);

        matrix.arrayMap((element, i, j) => {
            return array[i];
        })

        return matrix;
    }

    arrayMap(func) {
        this.data = this.data.map((array, i) => {
            return array.map((element, j) => {
                return func(element, i, j);
            });
        });

        return this;
    }

    static add(a, b) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.arrayMap((element, i, j) => {
            return a.data[i][j] + b.data[i][j];
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