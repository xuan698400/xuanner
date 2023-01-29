function Game() {
    this.games = [];
}

Game.prototype = {
    constructor: Game,
    init: function () {
        var _this = this;
        this.loadGames(function () {
            _this.render();
            _this.initClick();
        });
    },
    loadGames: function (callback) {
        var _this = this;
        $.get('game/game.json', function (games) {
            _this.games = games;
            if (callback) {
                callback();
            }
        });
    },
    render: function () {
        var _this = this;
        var gameItems = $('.game-box-items');
        gameItems.html('');
        var template = '<div class="box-item" data-url="{openUrl}">' +
            '                            <img src="{pic}"/>' +
            '                            <p>{name}</p>' +
            '                        </div>';
        var html = BW.renderList(template, _this.games);
        gameItems.html(html);
    },
    initClick: function () {
        $('.box-item').on('click', function () {
            window.open($(this).data('url'));
        });
    }
};


function App() {
    this.apps = [];
}

App.prototype = {
    constructor: App,
    init: function () {
        var _this = this;
        this.loadApps(function () {
            _this.render();
            _this.initClick();
        });
    },
    loadApps: function (callback) {
        var _this = this;
        $.get('app/app.json', function (apps) {
            _this.apps = apps;
            if (callback) {
                callback();
            }
        });
    },
    render: function () {
        var _this = this;
        var appItems = $('.app-box-items');
        appItems.html('');
        var template = '<div class="box-item" data-url="{openUrl}">' +
            '                            <img src="{pic}"/>' +
            '                            <p>{name}</p>' +
            '                        </div>';
        var html = BW.renderList(template, _this.apps);
        appItems.html(html);
    },
    initClick: function () {
        $('.box-item').on('click', function () {
            window.open($(this).data('url'));
        });
    }
};

function IndexPage() {
    this.game = null;
    this.app = null;
    this.article = null;
    this.currentTag = '首页';//支持多个逗号分隔
    this.searchKey = '';
}

IndexPage.prototype = {
    constructor: IndexPage,
    init: function () {
        var _this = this;
        //
        _this.article = new Article();
        _this.article.loadData(function () {
            _this.renderByCurrentTag();
            _this.initNav();
            _this.initInput();
            _this.renderTagSearch();
        });
        //
        _this.game = new Game();
        _this.game.init();
        //
        _this.app = new App();
        _this.app.init();
    },
    initNav: function () {
        var _this = this;
        var allA = $('.nav').find('a');
        allA.click(function () {
            allA.removeClass('select');
            $(this).addClass('select');
            _this.currentTag = $(this).data('tags');
            _this.renderByCurrentTag();
            _this.renderTagSearch();
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
            //var tags = BW.encode(BW.encode(article.tags));
            //var createTime = BW.encode(BW.encode(article.createTime));
            //articleName = BW.encode(BW.encode(articleName));
            //window.open('detail.html?title=' + articleName + '&tagsStr=' + tags + '&createTime=' + createTime);
            window.open('detail.html?id=' + article.id);
        });
    },
    initTagSearch: function () {
        var _this = this;
        $('.tag-search-item').on('click', function () {
            var clickTag = $(this).html();
            if (BW.isItemInArray(clickTag, _this.currentTag.split(','))) {
                //当前点击tag已选中，需要去掉
                $(this).removeClass('select');
                var newCurrentTag = BW.removeItemFromArray(clickTag, _this.currentTag.split(','));
                _this.currentTag = BW.joinArray(newCurrentTag);
                _this.renderByCurrentTag();
            } else {
                //当前点击tag未选中，需要加上
                $(this).addClass('select');
                _this.currentTag += ',' + clickTag;
                _this.renderByCurrentTag();
            }
        });
    },
    renderByCurrentTag: function () {
        this.article.filterByTag(this.currentTag);
        $('.article-list').html(this.article.buildRenderHtml());
        this.initTitleClick();
    },
    renderBySearchKey: function () {
        this.article.filterBySearchKey(this.searchKey);
        $('.article-list').html(this.article.buildRenderHtml());
        this.initTitleClick();
    },
    renderTagSearch: function () {
        var allTags = this.article.getAllTags();
        var tagSearchGroupObj = $('.tag-search-group');
        tagSearchGroupObj.html('');
        for (var i in allTags) {
            var select = '';
            if (BW.isItemInArray(allTags[i], this.currentTag.split(','))) {
                select = 'select';
            }
            tagSearchGroupObj.append('<div class="tag-search-item ' + select + '">' + allTags[i] + '</div>');
        }
        this.initTagSearch();
    }
};


$(function () {
    var indexPage = new IndexPage();
    indexPage.init();

    var sentence = new Sentence();
    sentence.init('app/sentence/sentence.json', function () {
        sentence.indexRender();
    });
    $('#sentenceRefreshBtn').on('click', function () {
        sentence.indexRender();
    });
});