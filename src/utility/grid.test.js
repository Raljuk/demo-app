import { generateGrid } from './grid';

test('Should create empty grid', () => {
  const SIZE = 5;
  const grid = generateGrid(SIZE);

  expect(Object.values(grid).length).toBe(SIZE);
  expect(Object.values(grid[0]).length).toBe(SIZE);
  expect(grid[0][0]).toMatchObject({
    x: 0,
    y: 0,
    mined: false,
    opened: false,
    near: 0,
  });
});
