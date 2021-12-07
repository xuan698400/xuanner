function Nav() {
    this.datas = [];
}

Nav.prototype = {
    constructor: Nav,
    init: function () {
        var _this = this;
        this.loadData(function () {
            _this.render();
            _this.initClick();
        });
    },
    loadData: function (callback) {
        var _this = this;
        $.get('data.json', function (datas) {
            _this.datas = datas;
            if (callback) {
                callback();
            }
        });
    },
    render: function () {
        var _this = this;
        var contentObj = $('#content');
        contentObj.html('');
        for (var i = 0, n = _this.datas.length; i < n; i++) {
            var groupData = _this.datas[i];
            var groupDataHtml =
                '<div class="nav-group">' +
                '<div class="nav-group-title">' + groupData.groupTitle + '</div>' +
                '<div class="nav-group-items">' + _this.renderNavGroupItems(groupData.groupItems) + '</div>' +
                '</div>';

            contentObj.append(groupDataHtml);
        }
    },
    renderNavGroupItems: function (groupItems) {
        var groupItemsHtml = '';
        for (var i = 0, n = groupItems.length; i < n; i++) {
            var groupItem = groupItems[i];
            groupItemsHtml +=
                '<div class="nav-group-item" data-url="' + groupItem.url + '">' +
                '<p class="nav-group-item-main">' + groupItem.title + '</p>' +
                '<p class="nav-group-item-sub">' + groupItem.desc + '</p>' +
                '</div>';
        }

        return groupItemsHtml;
    },
    initClick: function () {
        $('.nav-group-item').on('click', function () {
            window.open($(this).data('url'));
        });
    }
};

$(function () {
    var nav = new Nav();
    nav.init();
});