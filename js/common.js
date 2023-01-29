BW = {};
BW.getParamFromUrl = function (name, defaultStr) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        if (defaultStr !== undefined) {
            return defaultStr;
        } else {
            return '';
        }
    }
};
BW.renderObj = function (template, obj, customRenderCallback) {
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
};

BW.renderList = function (template, list, customRenderCallback) {
    if (!list) {
        return;
    }
    var result = '';
    for (var i = 0, n = list.length; i < n; i++) {
        result += BW.renderObj(template, list[i], customRenderCallback);
    }
    return result;
};

BW.encode = function (url) {
    return encodeURIComponent(url);
};
BW.decode = function (url) {
    return decodeURIComponent(url);
};

/**
 * 字符串数组，用逗号拼接
 *
 * @param array
 * @returns {string}
 */
BW.joinArray = function (array) {
    var str = '';
    for (var i = 0, n = array.length; i < n; i++) {
        if (i > 0) {
            str += ',';
        }
        str += array[i];
    }
    return str;
};

/**
 * 从数组array删除needDeleteItem元素
 *
 * @param needDeleteItem
 * @param array
 * @returns {Array}
 */
BW.removeItemFromArray = function (deleteItem, array) {
    var newArray = [];
    for (var i in array) {
        var item = array[i];
        if (deleteItem !== item) {
            newArray.push(item);
        }
    }
    return newArray;
};

/**
 * 判断matchItem是否在数组array中
 *
 * @param matchItem
 * @param array
 * @returns {boolean}
 */
BW.isItemInArray = function (matchItem, array) {
    for (var i in array) {
        if (matchItem === array[i]) {
            return true;
        }
    }
    return false;
};