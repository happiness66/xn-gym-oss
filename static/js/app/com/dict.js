SYJDictCache = {};
Dict = {};
Dict.findName = function(data, key, k, v) {
    k = k || 'dkey';
    v = v || 'dvalue';
    data = data || [];
    var i = 0,
        len = data.length,
        res;
    for (; i < len; i++) {
        var item = data[i];
        if (item[k] == key) {
            res = item[v];
            break;
        }
    }
    return res;
};
Dict.findObj = function(data, key, k) {
    k = k || 'dkey';
    data = data || [];
    var i = 0,
        len = data.length,
        res;
    for (; i < len; i++) {
        var item = data[i];
        if (item[k] == key) {
            res = item;
            break;
        }
    }
    return res;
};

Dict.getName = function(type, key) {
    var res;
    reqApi({
        code: '807706',
        cache: true,
        sync: true,
        json: {
            parentKey: type
        }
    }).then(function(data) {
        res = key ? (Dict.findName(data, key) || '-') : data;
    });
    return res;

}

Dict.getName2 = function(type, code, key) {
    var res;
    reqApi({
        code: code || '807706',
        cache: true,
        sync: true,
        json: {
            parentKey: type,
        }
    }).then(function(data) {
        res = key ? (Dict.findName(data, key) || '-') : data;
    });
    return res;
}

Dict.getNameForList = function(type, code) {
    var res;
    reqApi({
        code: code || '807706',
        cache: true,
        sync: true,
        json: {
            parentKey: type
        }
    }).then(function(data) {
        res = function(key) {
            return key != undefined ? Dict.findName(data, key) : '-';
        }
    });
    return res;
}