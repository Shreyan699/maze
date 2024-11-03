const rows = 20;
const cols = 20;
const grid = [];

for(let i = 0; i< rows; i++){
    const row = [];
    for(let j = 0; i < cols ; j++){
        row.push({
            visited: false,
            walls:{top: true,right: true,bottom:true,left: true}
        })
    }
    grid.push(row)
}

function getRandomNeighbour(grid,x,y){
    const neighbours = [];
    if(x>0 && !(grid[x-1][y].visited)) neighbours.push([x-1,y,'top']);
    if(y>0 && !(grid[x][y-1].visited)) neighbours.push([x,y-1,'left']);
    if(x<rows -1 && !(grid[x+1][y].visited)) neighbours.push([x+1,y,'bottom']);
    if(y<cols-1 && !(grid[x][y+1].visited)) neighbours.push([x,y+1,'right']);

    return neighbours.length ? neighbours[Math.floor(Math.random() * neighbours.length)] : null;
}

function removeWalls(current, next, direction) {
    // Adjust walls depending on the direction of the next cell relative to the current cell
    switch (direction) {
      case 'top':
        current.walls.top = false; // Remove the top wall of the current cell
        next.walls.bottom = false; // Remove the bottom wall of the next cell
        break;
      case 'right':
        current.walls.right = false; // Remove the right wall of the current cell
        next.walls.left = false; // Remove the left wall of the next cell
        break;
      case 'bottom':
        current.walls.bottom = false; // Remove the bottom wall of the current cell
        next.walls.top = false; // Remove the top wall of the next cell
        break;
      case 'left':
        current.walls.left = false; // Remove the left wall of the current cell
        next.walls.right = false; // Remove the right wall of the next cell
        break;
    }
  }

  function generateMaze(x, y) {
    const stack = []; // Stack to keep track of visited cells for backtracking
    grid[x][y].visited = true; // Mark the starting cell as visited
    stack.push([x, y]); // Push the starting cell onto the stack
  
    // Continue until all cells have been visited
    while (stack.length) {
      const [currentX, currentY] = stack[stack.length - 1]; // Get the current cell
      const currentCell = grid[currentX][currentY];
      const nextCellInfo = getRandomNeighbor(grid, currentX, currentY); // Get a random unvisited neighbor
  
      if (nextCellInfo) {
        // If there's an unvisited neighbor, move to it
        const [nextX, nextY, direction] = nextCellInfo;
        const nextCell = grid[nextX][nextY];
  
        removeWalls(currentCell, nextCell, direction); // Remove walls between the cells
        nextCell.visited = true; // Mark the next cell as visited
        stack.push([nextX, nextY]); // Push the next cell onto the stack
      } else {
        // If no unvisited neighbors, backtrack by popping the stack
        stack.pop();
      }
    }
  }


  const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / rows; // Size of each cell in pixels

// Function to draw the maze on the canvas
function drawMaze() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const cell = grid[x][y];
      const startX = y * cellSize; // Starting x-coordinate for this cell
      const startY = x * cellSize; // Starting y-coordinate for this cell

      ctx.beginPath(); // Begin a new path for each cell

      // Draw the top wall if it exists
      if (cell.walls.top) {
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + cellSize, startY);
      }
      // Draw the right wall if it exists
      if (cell.walls.right) {
        ctx.moveTo(startX + cellSize, startY);
        ctx.lineTo(startX + cellSize, startY + cellSize);
      }
      // Draw the bottom wall if it exists
      if (cell.walls.bottom) {
        ctx.moveTo(startX, startY + cellSize);
        ctx.lineTo(startX + cellSize, startY + cellSize);
      }
      // Draw the left wall if it exists
      if (cell.walls.left) {
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + cellSize);
      }

      ctx.stroke(); // Draw the path for the current cell walls
    }
  }
}

// Generate the maze and then draw it on the canvas
generateMaze(0, 0); // Start maze generation from the top-left cell
drawMaze(); // Draw the final maze