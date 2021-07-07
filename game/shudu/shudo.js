function ShuDu() {
    this.data = [];
}

ShuDu.prototype = {
    constructor: ShuDu,
    init: function () {
        this.initData();
        this.initThird(0, 0);
        this.initThird(3, 3);
        this.initThird(6, 6);

        var needFill = true;
        while (needFill) {
            needFill = !this.fillData();
        }
    },
    initData: function () {
        for (var i = 0; i < 9; i++) {
            this.data[i] = [];
            for (var j = 0; j < 9; j++) {
                this.data[i][j] = -1;
            }
        }
    },
    initThird: function (startI, startJ) {
        var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var randomNums = nums.sort(function () {
            return Math.random() - 0.5 > 0 ? -1 : 1
        });
        var count = 0;
        for (var i = startI, n = startI + 3; i < n; i++) {
            for (var j = startJ, m = startJ + 3; j < m; j++) {
                this.data[i][j] = randomNums[count];
                count++;
            }
        }
    },
    fillData: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.data[i][j] === -1) {
                    var num = this.findNum(i, j);
                    if (num !== -1) {
                        this.data[i][j] = num;
                    } else {
                        //填充失败
                        return false;
                    }
                }
            }
        }
        //填充成功
        return true;
    },
    findRowNums: function (i, j) {
        var rowNums = [];
        for (var mj = 0; mj < 9; mj++) {
            var rowNum = this.data[i][mj];
            if (rowNum !== -1) {
                rowNums.push(rowNum);
            }
        }
        return rowNums;
    },
    findColNums: function (i, j) {
        var colNums = [];
        for (var mi = 0; mi < 9; mi++) {
            var colNum = this.data[mi][j];
            if (colNum !== -1) {
                colNums.push(colNum);
            }
        }
        return colNums;
    },
    numIsInArray: function (num, array) {
        for (var i = 0, n = array.length; i < n; i++) {
            if (array[i] === num) {
                return true;
            }
        }
        return false;
    },
    findNum: function (i, j) {
        var rowNums = this.findRowNums(i, j);
        var colNums = this.findColNums(i, j);
        for (var num = 0; num < 9; num++) {
            if (!this.numIsInArray(num, rowNums) && !this.numIsInArray(num, colNums)) {
                return num;
            }
        }
        //未找到
        return -1;
    }
};

$(function () {
    var shudu = new ShuDu();
    shudu.init();
    console.log(shudu.data);
});