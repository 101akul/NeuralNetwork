class Matrix {

  //constructor
  constructor(rows = 2, cols = 2) {
    //initializes cols and rows for the matrix
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    //initalizes the data of the matrix to a size and allocates everything to 0
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  //sets random values based upon
  randomize(min = -1, max = 1, int = false) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (int) {
          this.data[i][j] = Math.floor(Math.random() * (max - min) + min);
        } else {
          this.data[i][j] = Math.random() * (max - min) + min;
        }
      }
    }
  }

  //adds either element wise or scalar quanitity based on input
  add(num) {
    if (num instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += num.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += num;
        }
      }
    }
  }

  //multiplies either element wise or scalar quanitity based on input
  multiply(num) {
    if (num instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= num.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= num;
        }
      }
    }
  }

  //prints the table to the console
  print() {
    console.table(this.data);
  }

  //does the product multiplication of two matrices
  static product(m1, m2) {
    if (m1.col != m2.row) {
      console.log("col of A does not match row of b");
      return m;
    }

    let res = new Matrix(m1.rows, m2.cols);

    for (let i = 0; i < res.rows; i++) {
      for (let j = 0; j < res.cols; j++) {
        let tot = 0;
        for (let k = 0; k < m2.rows; k++) {
          tot += m1.data[i][k] * m2.data[k][j];
        }
        res.data[i][j] = tot;
      }
    }
    return res;
  }

  static multiply(m1, num) {
    let res = new Matrix(m1.rows, m1.cols);
    if (num instanceof Matrix) {
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          res.data[i][j] = m1.data[i][j] * num.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          res.data[i][j] = m1.data[i][j] * num;
        }
      }
    }
    return res;
  }

  static add(m1, num) {
    let res = new Matrix(m1.rows, m1.cols);
    if (num instanceof Matrix) {
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          res.data[i][j] = m1.data[i][j] + num.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          res.data[i][j] = m1.data[i][j] + num;
        }
      }
    }
    return res;
  }

  static transpose(m) {
    let res = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        res.data[j][i] = m.data[i][j];
      }
    }
    return res;
  }

  static subtract(a, b) {
    // Return a new Matrix a-b
    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }
  }
  static map(m, func) {
    let res = new Matrix(m.rows, m.cols);
    for (let i = 0; i < res.rows; i++) {
      for (let j = 0; j < res.cols; j++) {
        res.data[i][j] = func(m.data[i][j]);
      }
    }
    return res;
  }
  static toArr(m) {
    let arr = [];
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        arr.push(m.data[i][j])
      }
    }
    return arr;
  }
  static toMatrix(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < m.rows; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }
}
