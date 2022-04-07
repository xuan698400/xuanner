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
            var total = 0;
            for (var i = 0, n = _this.renderDatas.length; i < n; i++) {
                var data = _this.renderDatas[i];
                var remark = '';
                if ('' !== data.date2) {
                    if ('做多' === data.opType) {
                        remark = (data.amount2 - data.amount) + '元';
                        total = total + parseInt(data.amount2 - data.amount);
                    }
                    if ('做空' === data.opType && '' !== data.date3) {
                        remark = parseInt((data.num2 - data.num) * data.unitPrice3) + '元（' + (data.num2 - data.num) + '份）';
                        total = total + parseInt((data.num2 - data.num) * data.unitPrice3);
                    }
                }
                data.remark = remark;
                if ('' !== data.remark) {
                    data.opType += '（已完结）';
                }

                //样式
                var sign = 'ing';
                console.log('' !== data.remark);
                console.log('做多' === data.opType);
                if ('' !== data.remark && '做多（已完结）' === data.opType) {
                    sign = 'done-in';
                }
                if ('' !== data.remark && '做空（已完结）' === data.opType) {
                    sign = 'done-out';
                }
                data.sign = sign;
            }

            //合计
            for (var i = 0, n = _this.renderDatas.length; i < n; i++) {
                var data = _this.renderDatas[i];
                if ('合计' === data.opType) {
                    data.remark = total + "元";
                }
            }

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
            '        <th>类型</th>\n' +
            '        <th>日期</th>\n' +
            '        <th>净值(元/份)</th>\n' +
            '        <th>金额(元)</th>\n' +
            '        <th>份额(份)</th>\n' +
            '        <th>结算日期</th>\n' +
            '        <th>结算净值(元/份)</th>\n' +
            '        <th>结算金额(元)</th>\n' +
            '        <th>结算份额(份)</th>\n' +
            '        <th>做空结算日期</th>\n' +
            '        <th>做空结算净值(元/份)</th>\n' +
            '        <th>结盈（单位：元）</th>\n' +
            '    </tr>');

        var template = '<tr class="{sign}">\n' +
            '        <td>{opType}</td>\n' +
            '        <td>{date}</td>\n' +
            '        <td>{unitPrice}</td>\n' +
            '        <td>{amount}</td>\n' +
            '        <td>{num}</td>\n' +
            '        <td>{date2}</td>\n' +
            '        <td>{unitPrice2}</td>\n' +
            '        <td>{amount2}</td>\n' +
            '        <td>{num2}</td>\n' +
            '        <td>{date3}</td>\n' +
            '        <td>{unitPrice3}</td>\n' +
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