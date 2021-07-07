$(function () {
    var currentTag = '首页';
    var searchKey = '';
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

    var refresh_articles = function (articlesUnSort) {
        var articles = sort_articles_by_createTime(articlesUnSort);
        var articleList = $('.article-list');
        articleList.html('');
        var template = '<div class="article-item">' +
            '                <a class="article-item-title font-1">{title}</a>' +
            '                <p class="article-item-content font-3">{summary}</p>' +
            '                <div class="article-item-bottom font-4"><p>发布时间：{createTime}</p>{tags}</div>' +
            '            </div>';
        var content = BW.renderList(template, articles, function (k, v) {
            if (k === '{tags}') {
                return render_tags(v);
            }
            return v;
        });
        articleList.html(content);
        init_title_click();
    };

    var get_articles_by_title = function (title) {
        for (var i in allArticles) {
            var article = allArticles[i];
            if (article.title === title) {
                return article;
            }
        }
        return null;
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

    var sort_articles_by_createTime = function (articles) {
        return articles.sort(function (a, b) {
            return a.createTime < b.createTime ? 1 : -1
        });
    };

    var filter_articles_by_searchKey = function (articles) {
        var filterArticles = [];
        for (var i in articles) {
            var article = articles[i];
            if (article['summary'].indexOf(searchKey) >= 0
                || article['tags'].indexOf(searchKey) >= 0
                || article['title'].indexOf(searchKey) >= 0) {
                filterArticles.push(article);
            }
        }
        return filterArticles;
    };

    var init_nav = function () {
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

    var init_input = function () {
        $(".search").on('input', function () {
            searchKey = $(this).val();
            var filterArticles;
            if (searchKey && searchKey !== '') {
                //根据关键子过滤
                filterArticles = filter_articles_by_searchKey(allArticles);
            } else {
                //根据当前tag过了文章
                filterArticles = filter_articles_by_currentTag(allArticles);
            }
            refresh_articles(filterArticles);
        });
    };

    var init_title_click = function () {
        $('.article-item-title').click(function () {
            var articleName = $(this).html();
            var article = get_articles_by_title(articleName);
            var tags = BW.encode(BW.encode(article.tags));
            var createTime = BW.encode(BW.encode(article.createTime));
            articleName = BW.encode(BW.encode(articleName));

            window.open('detail.html?articleName=' + articleName + '&tags=' + tags + '&createTime=' + createTime);
        });
    };

    var init = function () {
        init_nav();
        init_input();
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