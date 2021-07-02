$(function () {
    var currentTag = '个人生活';
    var allArticles = [];

    var render_tags = function (tagStr) {
        if (!tagStr) {
            return '';
        }

        var tags = tagStr.split(',');
        var result = '';
        for (var i = 0, n = tags.length; i < n; i++) {
            result += '<p class="article-item-bottom-tag">' + tags[i] + '</p>';
        }
        return result;
    };

    var load_articles = function (callback) {
        $.get('data/article/article.json', function (articles) {
            callback(articles);
        });
    };

    var refresh_articles = function (articles) {
        var articleList = $('.article-list');
        articleList.html('');
        var template = '<div class="article-item">' +
            '                <p class="article-item-title font-1">{title}</p>' +
            '                <p class="article-item-content font-3">{summary}</p>' +
            '                <div class="article-item-bottom font-4"><p>时间：{createTime}</p>{tags}</div>' +
            '            </div>';
        var content = render_list(template, articles, function (k, v) {
            if (k === '{tags}') {
                return render_tags(v);
            }
            return v;
        });
        articleList.html(content);
    };

    var filter_articles_by_currentTag = function (articles) {
        var filterArticles = [];
        for (var i in articles) {
            var article = articles[i];
            var tagStr = article.tags;
            if (tagStr) {
                var tags = tagStr.split(',');
                for (var j in tags) {
                    if (tags[j] === currentTag) {
                        filterArticles.push(article);
                    }
                }
            }
        }
        return filterArticles;
    };

    var initNav = function () {
        var allA = $('.nav').find('a');
        allA.click(function () {
            allA.removeClass('select');
            $(this).addClass('select');

            //更新当前tag
            currentTag = $(this).html();
            //根据当前tag过了文章
            var filterArticles = filter_articles_by_currentTag(allArticles);
            //更新页面数据
            refresh_articles(filterArticles);
        });
    };

    var init = function () {
        initNav();
        //加载所有文章
        load_articles(function (articles) {
            allArticles = articles;
            //根据当前tag过了文章
            var filterArticles = filter_articles_by_currentTag(allArticles);
            //更新页面数据
            refresh_articles(filterArticles);
        });
    };

    init();
});