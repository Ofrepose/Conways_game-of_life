import {ctx, canvas} from '../../App';

export default class GameOfLife {


    constructor() {
        this.cell_size = 20;
        this.dead_color = `lightblue`;
        this.alive_color = `#1bd9c4`;
        this.alive_color_two = "green";
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];
        this.active_array2 = [];
        this.inactive_array2 = [];

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                this.active_array[i] = [];
                this.active_array2[i] = [];
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = 0;
                    this.active_array2[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array;
            this.inactive_array2 = this.active_array2;

        };

        this.arrayRandomize = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
                    this.active_array2[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {



            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    let color2;
                    if (this.active_array[i][j] == 1) {
                        color = this.alive_color;
                    }
                    else
                        color = this.dead_color;

                    if(this.active_array2[i][j] == 1){
                        color2 = this.alive_color_two;
                    }else
                        color2 = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.strokeRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[row][col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {

            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;

        };

        this.updateCellValue = (row, col) => {

            const total = this.countNeighbours(row, col);
            if (total > 4 || total < 3) {
                return 0;
            }
            else if (this.active_array[row][col] === 0 && total === 3) {
                return 1;
            }

            else {
                return this.active_array[row][col];
            }

        };

        this.updateLifeCycle = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.updateCellValue(i, j);
                    this.inactive_array[i][j] = new_state;
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };

        this.cellAdd = (row, col) => {
            this.active_array[parseInt((Number(row)/20))][parseInt((Number(col)/20))] = 1;
            this.updateCellValue(parseInt((Number(row)/20)),parseInt((Number(col)/20)));
        }

    }
}