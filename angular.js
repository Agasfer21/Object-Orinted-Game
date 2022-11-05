class Angular{
    constructor(x,y){
            this.x = x
            this.y = y
            this.energy = 200
            this.multiply = 0
            this.directions = []
        }
        getNewCoordinates() {
            this.directions = [
                [this.x + 1, this.y - 1],
                [this.x +1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1 ,this.y - 1],
                [this.x + 1, this.y - 1],
                
    
                
               
            ]
        }
        chooseCell(char1, char2, char3) {
            this.getNewCoordinates()
            let found = []
    
            for (let i = 0; i < this.directions.length; i++) {
                let x = this.directions[i][0];
                let y = this.directions[i][1];
    
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char1) {
                        found.push(this.directions[i]);
                    }
                }
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char2) {
                        found.push(this.directions[i]);
                    }
                }
                if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                    if (matrix[y][x] == char3) {
                        found.push(this.directions[i]);
                    }
                }
    
            }
    
            return found;
        }
        mul() {
            this.multiply++
            var emptyCell = this.chooseCell(0)
            var newCell = random(emptyCell)
            if (newCell && this.multiply >= 15) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = 4
                var ang = new Angular(newX, newY)
               angularArr.push(ang)
                this.multiply = 0
            }
        }
        move() {
            this.energy--
            var emptyCells = this.chooseCell(0)
            var newCell = random(emptyCells)
            if (newCell && this.energy >= 0) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
            } else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
        eat() {
            var emptyCells = this.chooseCell(1, 2, 3)
            var newCell = random(emptyCells)
            if (newCell) {
                this.energy++
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (let i = 0; i < grassArr.length; i++) {
                    if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                        grassArr.splice(i, 1)
                    }
                }
                for (let i = 0; i < grassEaterArr.length; i++) {
                    if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                for (let i = 0; i < predatorArr.length; i++) {
                    if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                        predatorArr.splice(i, 1)
                    }
                }
            }
            else {
                this.move()
            }
        }
        die() {
            matrix[this.y][this.x] = 0
            for (var i in angularArr) {
                if (this.x == angularArr[i].x && this.y == angularArr[i].y) {
                    angularArr.splice(i, 1)
                    break
                }
            }
        }
    }