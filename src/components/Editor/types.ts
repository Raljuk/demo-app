export interface Grid {
    [key: number]: {
        [key: number]: CellData
    }
}

export interface CellData {
    x: number;
    y: number;
    mined: boolean;
    opened: boolean;
    flag: boolean;
    near: number;
}
