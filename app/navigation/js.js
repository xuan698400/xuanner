function Nav() {
    this.datas = [];
    this.renderDatas = [];
}

Nav.prototype = {
    constructor: Nav,
    init: function () {
        var _this = this;
        this.loadData(function () {
            _this.render();
            _this.initClick();
            _this.initSearch();
        });
    },
    loadData: function (callback) {
        var _this = this;
        $.get('data.json', function (datas) {
            _this.datas = datas;
            _this.renderDatas = datas;
            if (callback) {
                callback();
            }
        });
    },
    render: function () {
        var _this = this;
        var contentObj = $('#content');
        contentObj.html('');
        for (var i = 0, n = _this.renderDatas.length; i < n; i++) {
            var groupData = _this.renderDatas[i];
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
    initSearch: function () {
        var _this = this;
        $("#search").bind('input propertychange', function () {
            _this.renderDatas = [];
            var keyword = $("#search").val();

            for (var i = 0, n = _this.datas.length; i < n; i++) {
                var group = _this.datas[i];
                var groupItems = group.groupItems;

                var filterGroup = {};
                filterGroup.groupTitle = group.groupTitle;
                filterGroup.groupItems = [];

                for (var j = 0, m = groupItems.length; j < m; j++) {
                    var groupItem = groupItems[j];

                    var b1 = ('' !== keyword) && !_this.isContain(groupItem.title, keyword, true);
                    var b2 = ('' !== keyword) && !_this.isContain(groupItem.desc, keyword, true);

                    if (b1 && b2) {
                        continue;
                    }

                    filterGroup.groupItems.push(groupItem);
                }
                _this.renderDatas.push(filterGroup);
            }
            _this.render();
            _this.initClick();
        })
    },
    initClick: function () {
        $('.nav-group-item').on('click', function () {
            window.open($(this).data('url'));
        });
    },
    isContain: function (str1, str2, ignoreCase) {
        var s1 = ignoreCase ? str1.toLowerCase() : str1;
        var s2 = ignoreCase ? str2.toLowerCase() : str2;
        return s1.indexOf(s2) !== -1;
    }
};

$(function () {
    var nav = new Nav();
    nav.init();
});