# 从地址栏中获取参数
```
var getParamFromUrl = function (name, defaultStr) {
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
```

# 根据html模型和js对象渲染
```
var renderObj = function (template, obj, customRenderCallback) {
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
```
```
var renderList = function (template, list, customRenderCallback) {
    if (!list) {
        return;
    }
    var result = '';
    for (var i = 0, n = list.length; i < n; i++) {
        result += renderObj(template, list[i], customRenderCallback);
    }
    return result;
};
```

# 中文地址栏编解码
```
var encode = function (url) {
    return encodeURIComponent(url);
};
```
```
var decode = function (url) {
    return decodeURIComponent(url);
};
```