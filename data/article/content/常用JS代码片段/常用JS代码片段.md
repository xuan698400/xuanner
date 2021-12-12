# 常用工具
从地址栏中获取参数
```
function getParamFromUrl(name, defaultStr) {
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
结合模版和对象渲染
```
function renderObj(template, obj, customRenderCallback) {
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
列表渲染
```
function renderList(template, list, customRenderCallback) {
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
中文地址栏编码
```
function encode(url) {
    return encodeURIComponent(url);
};
```
中文地址栏解码
```
function decode(url) {
    return decodeURIComponent(url);
};
```
字符串是否包含另一个
```
function isContain(str1, str2, ignoreCase) {
    var s1 = ignoreCase ? str1.toLowerCase() : str1;
    var s2 = ignoreCase ? str2.toLowerCase() : str2;
    return s1.indexOf(s2) !== -1;
}
```
# 日期工具
判断是否是润年
```
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}
```