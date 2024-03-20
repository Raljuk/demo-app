import { Grid } from "../components/Game/types";
import { RANDOM_COEFFICIENT } from "./constants";

export const generateRandomGrid = (size: number) => {
    const grid: Grid = {};

    for (let x = 0; x < size; x++) {
        grid[x] = grid[x] || {};

        for (let y = 0; y < size; y++) {
            grid[x][y] = {
                x,
                y,
                mined: Math.random() > RANDOM_COEFFICIENT,
                opened: false,
                flag: false,
                near: 0,
            }
        }
    }

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            grid[x][y].near = calcNear(x, y, grid);
        }
    }

    return grid;
}

export const calcNear = (x: number, y: number, grid: Grid) => {
    const size = Object.keys(grid).length;

    if (outBounds(x,y, size)) {
        return 0;
    }

    let i = 0;

    for (let offsetX = -1; offsetX <= 1; offsetX++) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
            if (outBounds(offsetX+x, offsetY+y, size)){
                continue;
            }

            i += +grid[offsetX+x][offsetY+y].mined;
        }
    }

    return i;
}

export const outBounds = (x: number, y: number, size: number) => {
    return x < 0 || y < 0 || x >= size || y >= size;
}
