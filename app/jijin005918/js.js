function JiJin() {
    this.renderDatas = [];
}

JiJin.prototype = {
    constructor: JiJin,
    init: function () {
        var _this = this;
        this.loadData(function () {
            _this.render();
        });
    },
    loadData: function (callback) {
        var _this = this;
        $.get('data.json', function (datas) {
            _this.renderDatas = datas;
            if (callback) {
                callback();
            }
        });
    },
    render: function () {
        var _this = this;
        var contentObj = $('#dataTable');
        contentObj.html('');
        contentObj.append('<tr>\n' +
            '        <th>日期</th>\n' +
            '        <th>净值(元/份)</th>\n' +
            '        <th>操作类型</th>\n' +
            '        <th>操作金额(元)</th>\n' +
            '        <th>操作份额(份)</th>\n' +
            '        <th>备注</th>\n' +
            '    </tr>');

        var template = '<tr class="{sign}">\n' +
            '        <td>{date}</td>\n' +
            '        <td>{unitPrice}</td>\n' +
            '        <td>{opType}</td>\n' +
            '        <td>{amount}</td>\n' +
            '        <td>{num}</td>\n' +
            '        <td>{remark}</td>\n' +
            '    </tr>';
        var dataHtml = _this.renderList(template, _this.renderDatas);
        contentObj.append(dataHtml);
    },
    renderList: function (template, list, customRenderCallback) {
        if (!list) {
            return;
        }
        var result = '';
        for (var i = 0, n = list.length; i < n; i++) {
            result += this.renderObj(template, list[i], customRenderCallback);
        }
        return result;
    },
    renderObj: function (template, obj, customRenderCallback) {
        var regex = /\{(.+?)\}/g;
        var vars = template.match(regex);
        if (vars) {
            for (var i = 0, n = vars.length; i < n; i++) {
                var attr = vars[i].replace('{', '').replace('}', '');
                var attrs = attr.split('.');

                var v = obj;
                for (var j = 0, m = attrs.length; j < m; j++) {
                    v = v[attrs[j]];
                }
                template = template.replace(vars[i], customRenderCallback ? customRenderCallback(vars[i], v) : v);
            }
        }
        return template;
    }
};

$(function () {
    new JiJin().init();
});