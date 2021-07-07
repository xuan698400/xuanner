function Article() {
    this.allArticles = [];
    this.renderArticles = [];
}

Article.prototype = {
    constructor: Article,
    init: function (callback) {
        this.loadAll(callback);
    },
    loadAll: function (callback) {
        var _this = this;
        $.get('data/article/article.json', function (articles) {
            _this.allArticles = articles;
            _this.sortByCreateTime();
            if (callback) {
                callback();
            }
        });
    },
    getByTitle: function (title) {
        var _this = this;
        for (var i in _this.allArticles) {
            var article = _this.allArticles[i];
            if (article.title === title) {
                return article;
            }
        }
        return null;
    },
    sortByCreateTime: function () {
        var _this = this;
        _this.allArticles = _this.allArticles.sort(function (a, b) {
            return a.createTime < b.createTime ? 1 : -1
        });
    },
    filterByTag: function (tag) {
        var _this = this;
        this.renderArticles = [];
        for (var i in _this.allArticles) {
            var article = _this.allArticles[i];
            var tagStr = article.tags;
            if (tagStr) {
                var tags = tagStr.split(',');
                for (var j in tags) {
                    if (tags[j] === tag) {
                        _this.renderArticles.push(article);
                    }
                }
            }
        }
    },
    filterBySearchKey: function (searchKey) {
        var _this = this;
        _this.renderArticles = [];
        for (var i in _this.allArticles) {
            var article = _this.allArticles[i];
            if (article['summary'].indexOf(searchKey) >= 0
                || article['tags'].indexOf(searchKey) >= 0
                || article['title'].indexOf(searchKey) >= 0) {
                _this.renderArticles.push(article);
            }
        }
    },
    getTagsHtml: function (tagStr) {
        if (!tagStr) {
            return '';
        }
        var tags = tagStr.split(',');
        var tagsHtml = '';
        for (var i = 0, n = tags.length; i < n; i++) {
            tagsHtml += '<p class="article-item-bottom-tag">' + tags[i] + '</p>';
        }
        return tagsHtml;
    },
    render: function () {
        var _this = this;
        var articleList = $('.article-list');
        articleList.html('');
        var template = '<div class="article-item">' +
            '                <a class="article-item-title font-1">{title}</a>' +
            '                <p class="article-item-content font-3">{summary}</p>' +
            '                <div class="article-item-bottom font-4"><p>发布时间：{createTime}</p>{tags}</div>' +
            '            </div>';
        var content = BW.renderList(template, this.renderArticles, function (k, v) {
            if (k === '{tags}') {
                return _this.getTagsHtml(v);
            }
            return v;
        });
        articleList.html(content);
    }
};

function IndexPage() {
    this.article = null;
    this.currentTag = '首页';
    this.searchKey = '';

}

IndexPage.prototype = {
    constructor: IndexPage,
    init: function () {
        var _this = this;
        _this.article = new Article();
        _this.article.init(function () {
            _this.renderByCurrentTag();
            _this.initNav();
            _this.initInput();
        });
    },
    initNav: function () {
        var _this = this;
        var allA = $('.nav').find('a');
        allA.click(function () {
            allA.removeClass('select');
            $(this).addClass('select');
            _this.currentTag = $(this).html();
            _this.renderByCurrentTag();
        });
    },
    initInput: function () {
        var _this = this;
        $(".search").on('input', function () {
            _this.searchKey = $(this).val();
            if (_this.searchKey && _this.searchKey !== '') {
                _this.renderBySearchKey();
            } else {
                _this.renderByCurrentTag();
            }
        });
    },
    initTitleClick: function () {
        var _this = this;
        $('.article-item-title').click(function () {
            var articleName = $(this).html();
            var article = _this.article.getByTitle(articleName);
            var tags = BW.encode(BW.encode(article.tags));
            var createTime = BW.encode(BW.encode(article.createTime));
            articleName = BW.encode(BW.encode(articleName));
            window.open('detail.html?articleName=' + articleName + '&tags=' + tags + '&createTime=' + createTime);
        });
    },
    renderByCurrentTag: function () {
        var _this = this;
        _this.article.filterByTag(_this.currentTag);
        _this.article.render();
        _this.initTitleClick();
    },
    renderBySearchKey: function () {
        var _this = this;
        _this.article.filterBySearchKey(_this.searchKey);
        _this.article.render();
        _this.initTitleClick();
    }
};


$(function () {
    var indexPage = new IndexPage();
    indexPage.init();
});