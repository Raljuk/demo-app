import { Grid } from './types';

export const generateGrid = (size: number, totalMines: number = 0): Grid => {
  const grid = createEmptyGrid(size);

  placeMines(grid, totalMines);

  if (totalMines) {
    setNear(grid);
  }

  return grid;
};

function createEmptyGrid(size: number): Grid {
  const grid: Grid = {};

  for (let x = 0; x < size; x++) {
    grid[x] = grid[x] || {};

    for (let y = 0; y < size; y++) {
      grid[x][y] = {
        x,
        y,
        mined: false,
        opened: false,
        near: 0,
      };
    }
  }
  
  return grid;
}

function placeMines(grid: Grid, totalMines: number): void {
  const size = Object.values(grid).length;
  let minesPlaced = 0;

  while (minesPlaced < totalMines) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (!grid[x][y].mined) {
      grid[x][y].mined = true;
      minesPlaced++;
    }
  }
}

export const setNear = (grid: Grid): void => {
  const size = Object.values(grid).length;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid[x][y].near = calcNear(x, y, grid);
    }
  }
};

export const calcNear = (x: number, y: number, grid: Grid): number => {
  const size = Object.keys(grid).length;

  if (isOutBounds(x, y, size)) {
    return 0;
  }

  let i = 0;

  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      if (isOutBounds(offsetX + x, offsetY + y, size)) {
        continue;
      }

      i += +grid[offsetX + x][offsetY + y].mined;
    }
  }

  return i;
};

export const isOutBounds = (x: number, y: number, size: number): boolean => {
  return x < 0 || y < 0 || x >= size || y >= size;
};
