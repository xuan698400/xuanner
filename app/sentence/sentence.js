function Sentence() {
    this.datas = [];
}

Sentence.prototype = {
    constructor: Sentence,
    init: function (dataUrl, callback) {
        this.loadData(dataUrl, callback);
    },
    loadData: function (dataUrl, callback) {
        var _this = this;
        $.get(dataUrl, function (datas) {
            _this.datas = datas;
            if (callback) {
                callback();
            }
        });
    },
    indexRender: function () {
        var _this = this;
        var sentenceObj = $('#sentence');
        sentenceObj.html('');
        var randomData = _this.randomGet(3);
        for (var i = 0, n = randomData.length; i < n; i++) {
            var data = randomData[i];
            var dataHtml = '<p class="info-box-item-text font-2">' + data.content + '</p>';
            sentenceObj.append(dataHtml);
        }
    },
    randomGet: function (num) {
        var _this = this;
        var size = _this.datas.length;
        var randomData = [];

        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * size);
            randomData.push(_this.datas[index]);
        }

        return randomData;
    },
    initRefreshBtn: function (idName) {
        var _this = this;
        $('#' + idName).on('click', function () {
            _this.indexRender();
        });
    },
    indexInitClick: function () {
        // $('.nav-group-item').on('click', function () {
        //     window.open($(this).data('url'));
        // });
    }
};