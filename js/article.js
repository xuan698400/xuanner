function Article() {
    /**
     * 所有文章
     *
     * @type {Array}
     */
    this.allArticles = [];

    /**
     * 过滤过后的文章
     *
     * @type {Array}
     */
    this.filterArticles = [];
}

Article.prototype = {
    constructor: Article,

    /**
     * 加载文章数据
     * @param callback 加载完成回调
     */
    loadData: function (callback) {
        var _this = this;
        $.get('data/article/article.json', function (articles) {
            _this.allArticles = articles;
            for (var i in _this.allArticles) {
                _this.filterArticles.push(_this.allArticles[i]);
            }
            _this.sortByCreateTime();
            if (callback) {
                callback();
            }
        });
    },

    /**
     * 根据文件标题获取文章
     * @param title 文章标题
     * @returns {*}
     */
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

    /**
     * 根据文件标题获取文章
     * @param id 文章ID
     * @returns {*}
     */
    getById: function (id) {
        var _this = this;
        for (var i in _this.allArticles) {
            var article = _this.allArticles[i];
            if (article.id === id) {
                return article;
            }
        }
        return null;
    },

    /**
     * 根据文件创建时间倒叙
     */
    sortByCreateTime: function () {
        var _this = this;
        _this.allArticles = _this.allArticles.sort(function (a, b) {
            return a.createTime < b.createTime ? 1 : -1
        });
    },

    /**
     *  根据tag列表，过滤匹配的文章
     *
     * @param tagsStr tag列表，多一个逗号分割
     */
    filterByTag: function (tagsStr) {
        //其中tag支持多个，逗号分隔
        this.filterArticles = [];
        for (var i in this.allArticles) {
            var article = this.allArticles[i];
            if (this.isTagsContain(tagsStr, article.tags)) {
                this.filterArticles.push(article);
            }
        }
    },

    /**
     * 根据搜索关键字，过滤匹配的文章
     *
     * @param searchKey 搜索关键字
     */
    filterBySearchKey: function (searchKey) {
        this.filterArticles = [];
        for (var i in this.allArticles) {
            var article = this.allArticles[i];
            if (article['summary'].indexOf(searchKey) >= 0
                || article['tags'].indexOf(searchKey) >= 0
                || article['title'].indexOf(searchKey) >= 0) {
                this.filterArticles.push(article);
            }
        }
    },

    /**
     * 判断两个标签列表是否有交集
     *
     * @param tagsStr1 标签列表1，多一个逗号分割
     * @param tagsStr2 标签列表2，多一个逗号分割
     * @returns {boolean}
     */
    isTagsContain: function (tagsStr1, tagsStr2) {
        //tagsStr1和tagsStr2都是支持多个tag，逗号分割
        if (!tagsStr1 || !tagsStr2) {
            return false;
        }
        var tags1 = tagsStr1.split(',');
        var tags2 = tagsStr2.split(',');
        for (var i in tags1) {
            var t = tags1[i];
            for (var j in tags2) {
                if (t === tags2[j]) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * 获取指定文章的所有标签
     *
     * @param articles
     * @returns {Array}
     */
    getAllTags: function () {
        var articles = this.allArticles;

        var allTags = [];
        for (var i in articles) {
            var articleTags = articles[i].tags.split(',');
            if (articleTags) {
                for (var j in articleTags) {
                    if (!BW.isItemInArray(articleTags[j], allTags)) {
                        allTags.push(articleTags[j]);
                    }
                }
            }
        }
        return allTags;
    },

    /**
     * 构建过滤文章的html文本
     *
     * @returns {*}
     */
    buildRenderHtml: function () {
        var _this = this;
        var template = '<div class="article-item">' +
            '                <a class="article-item-title font-1">{title}</a>' +
            '                <p class="article-item-content font-3">{summary}</p>' +
            '                <div class="article-item-bottom font-4"><p>发布时间：{createTime}</p>{tags}</div>' +
            '            </div>';
        return BW.renderList(template, this.filterArticles, function (k, v) {
            if (k === '{tags}') {
                return _this.buildTagsHtml(v);
            }
            return v;
        });
    },

    /**
     * 构建tag的html文本
     *
     * @param tagStr
     * @returns {string}
     */
    buildTagsHtml: function (tagStr) {
        if (!tagStr) {
            return '';
        }
        var tags = tagStr.split(',');
        var tagsHtml = '';
        for (var i = 0, n = tags.length; i < n; i++) {
            tagsHtml += '<p class="article-item-bottom-tag">' + tags[i] + '</p>';
        }
        return tagsHtml;
    }

};