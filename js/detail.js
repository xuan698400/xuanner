$(function () {

    var load_and_refresh_article_detail = function () {
        //从浏览器地址参数获取文章标题
        var articleName = BW.decode(BW.decode(BW.getParamFromUrl('articleName', '')));
        var tags = BW.decode(BW.decode(BW.getParamFromUrl('tags', '')));
        var createTime = BW.decode(BW.decode(BW.getParamFromUrl('createTime', '')));

        //渲染文章标题
        $('.article-detail-title').html(articleName);
        $('.article-detail-info-time').html('发布于：' + createTime);
        $('.article-detail-info-tags').html(render_tags(tags));

        //加载文章内容并渲染
        $.get('data/article/content/' + articleName + '/' + articleName + '.md', function (content) {

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
            // marked.setOptions({
            //     highlight: function (code) {
            //         return hljs.highlightAuto(code).value;
            //     }
            // });
            $('.article-detail-content').html(marked(content));
        });
    };

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

    var init = function () {
        load_and_refresh_article_detail();
    };
    init();
});