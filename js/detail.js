function ArticleDetail() {
    this.content = '';
    this.title = '';
    this.tagsStr = '';
    this.createTime = '';
}

ArticleDetail.prototype = {
    constructor: ArticleDetail,
    init: function (callback) {
        var _this = this;
        _this.title = BW.decode(BW.decode(BW.getParamFromUrl('title', '')));
        _this.tagsStr = BW.decode(BW.decode(BW.getParamFromUrl('tagsStr', '')));
        _this.createTime = BW.decode(BW.decode(BW.getParamFromUrl('createTime', '')));
        _this.loadContent(callback);
    },
    loadContent: function (callback) {
        var _this = this;
        $.get('data/article/content/' + _this.title + '/' + _this.title + '.md', function (content) {
            _this.content = content;
            if (callback) {
                callback();
            }
        });
    },
    getTagsHtml: function () {
        var _this = this;
        if (!_this.tagsStr) {
            return '';
        }
        var tags = _this.tagsStr.split(',');
        var html = '';
        for (var i = 0, n = tags.length; i < n; i++) {
            html += '<p class="article-item-bottom-tag">' + tags[i] + '</p>';
        }
        return html;
    },
    render: function () {
        var _this = this;
        //
        $('.article-detail-title').html(_this.title);
        $('.article-detail-info-time').html('发布于：' + _this.createTime);
        $('.article-detail-info-tags').html(_this.getTagsHtml());
        //
        var rendererMD = new marked.Renderer();
        marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        $('.article-detail-content').html(marked(_this.content));
    }
};

function DetailPage() {
    this.articleDetail = null;
}

DetailPage.prototype = {
    constructor: DetailPage,
    init: function () {
        var _this = this;
        _this.articleDetail = new ArticleDetail();
        _this.articleDetail.init(function () {
            _this.articleDetail.render();
        });
    }
};

$(function () {
    var detailPage = new DetailPage();
    detailPage.init();
});