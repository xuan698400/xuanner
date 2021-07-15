function ArticleDetail() {
    this.content = '';
    this.title = '';
    this.tagsStr = '';
    this.createTime = '';
    this.numConvert = [];
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
            smartypants: false,
        });
        $('.article-detail-left').html(marked(_this.content));
    },
    renderTitle: function () {
        var _this = this;

        var top = $('.article-detail-title').offset().top;
        var left = $('.article-detail-left').offset().left;
        $('.article-detail-nav-wrap').css('top', top).css('left', left + 800);

        var nav = [];

        var index = 1;
        _this.content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
            let title = match.replace('\n', '');
            let level = m1.length;

            //只处理一级二级标题
            if (level === 1) {
                nav.push({
                    title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
                    children: [],
                });
                index++;
            }
            if (level === 2) {
                var last = nav[nav.length - 1];
                if (last) {
                    last.children.push({
                        title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
                        children: []
                    });
                }
            }
        });

        //渲染
        var detailNav = $('.article-detail-nav');
        detailNav.html('');
        var h1Index = 0;
        var h2Index = 0;
        for (var i = 0, n = nav.length; i < n; i++) {
            var h1Item = nav[i];

            var selectClass = i === 0 ? 'article-detail-nav-select' : '';
            detailNav.append('<div  data-index="' + h1Index + '" class="article-detail-nav-h article-detail-nav-h1 ' + selectClass + '">' + _this.subText(h1Item.title) + '</div>');
            h1Index++;

            for (var j = 0, m = h1Item.children.length; j < m; j++) {
                var h2Item = h1Item.children[j];
                detailNav.append('<div data-index="' + h2Index + '" class="article-detail-nav-h article-detail-nav-h2">' + _this.subText(h2Item.title) + '</div>');
                h2Index++;
            }
        }
        _this.addTitleEvent();
    },
    addTitleEvent: function () {
        $('.article-detail-nav-h').on('click', function () {
            $('.article-detail-nav-h').removeClass('article-detail-nav-select');
            var selectObj = $(this);
            selectObj.addClass('article-detail-nav-select');
            var h = selectObj.hasClass('article-detail-nav-h1') ? 'h1' : 'h2';
            console.log(h);
            var topOffset = $(h).eq(selectObj.data('index')).offset().top;
            $('html,body').animate({scrollTop: topOffset}, 'slow');
        });
    },
    subText: function (text) {
        var _this = this;
        var max = 20;
        var replaceStr = '...';

        if (_this.getLength(text) > max) {
            return text.substring(0, max) + replaceStr;
        }
        return text;
    },
    getLength: function (text) {
        if (!text) {
            return 0;
        }
        var len = text.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
            if (text.charCodeAt(i) < 27 || text.charCodeAt(i) > 126) {
                reLen += 2;
            } else {
                reLen++;
            }
        }
        return reLen;
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
            _this.articleDetail.renderTitle();
        });
    }
};

$(function () {
    var detailPage = new DetailPage();
    detailPage.init();
});