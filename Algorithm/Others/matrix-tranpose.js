/* 

Given a two dimensional array, write a function called 'matrixTranspose' that returns 
a transposed version of that array.

Example: 
const twoDimArray = [['fred', 'barney'], 
                     [30, 40], 
                     [true, false]]
                      
console.table(matrixTranspose(twoDimArray)); // -> [['fred', 30, true], 
                                                    ['barney', 40, false]]

*/

const matrixTranspose = (matrix) => {
    const row = matrix.length;
    // Edge case for empty matrix:
    if (row === 0) return matrix;
    const col = matrix[0].length;
    // Create a new matrix size col * row with the value col and row get swapped
    return new Array(col)
      .fill(0)
      .map((e, r) => new Array(row).fill(0).map((e, c) => matrix[c][r]));
  };
  // const twoDimArray = [
  //   ['fred', 'barney'],
  //   [30, 40],
  //   [true, false],
  // ];
  
  // console.table(matrixTranspose(twoDimArray));
  /*
  
  Extension:
  Given an nxn matrix, write a function called 'matrixRotate' that rotates the matrix 90 degrees clockwise.
  If given an mxn matrix, return undefined.
  
  For example:  
  const matrix = [  [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]  ]
  
  console.table(matrixRotate(matrix)) // ->  [  [7, 4, 1],
                                                [8, 5, 2],
                                                [9, 6, 3]  ]
  
  BONUS: Rotate the matrix in place. In other words, the space complexity of the solution should be O(1).
  
  */
  
  const matrixRotate = (matrix) => {
    const N = matrix.length;
    if (N === 0) return matrix;
  
    // Go through each layer
    for (let x = 0; x < N / 2; x++) {
      // Go though each value in the layer
      for (let y = x; y < N - 1 - x; y++) {
        // Obtain top left value
        const topLeft = matrix[x][y];
        // Replace top left with bottom left
        matrix[x][y] = matrix[N - 1 - y][x];
        // Replace bottom left with bottom right
        matrix[N - 1 - y][x] = matrix[N - 1 - x][N - 1 - y];
        // Replace bottom right with top right
        matrix[N - 1 - x][N - 1 - y] = matrix[y][N - 1 - x];
        // Replace top right with top left
        matrix[y][N - 1 - x] = topLeft;
      }
    }
    return matrix;
  };
  // const matrix = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];
  
  // console.table(matrix);
  // console.table(matrixRotate(matrix));
  
  