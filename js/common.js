var render_obj = function (template, obj, customRenderCallback) {
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

var render_list = function (template, list, customRenderCallback) {
    if (!list) {
        return;
    }
    var result = '';
    for (var i = 0, n = list.length; i < n; i++) {
        result += render_obj(template, list[i], customRenderCallback);
    }
    return result;
};