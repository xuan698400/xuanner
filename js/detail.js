$(function () {

    var load_and_refresh_article_detail = function (name) {
        //从浏览器地址参数获取文章标题
        var articleName = BW.decode(BW.decode(BW.getParamFromUrl('articleName', '')));

        //渲染文章标题
        $('.article-detail-title').html(articleName);

        //加载文章内容并渲染
        $.get('data/article/' + articleName + '/' + articleName + '.md', function (content) {
            //var converter = new showdown.Converter();
            //var html = converter.makeHtml(content);
            $('.article-detail-content').html(marked(content));
        });
    };

    var init_marked = function () {
        // var rendererMD = new marked.Renderer();
        // marked.setOptions({
        //     renderer: rendererMD,
        //     gfm: true,
        //     tables: true,
        //     breaks: false,
        //     pedantic: false,
        //     sanitize: false,
        //     smartLists: true,
        //     smartypants: false
        // });
        // var markdownString = '```js\n console.log("hello"); \n```';
        // marked.setOptions({
        //     highlight: function (code) {
        //         return hljs.highlightAuto(code).value;
        //     }
        // });

    };

    var init = function () {
        init_marked();
        load_and_refresh_article_detail();
    };
    init();
});