$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '参数键',
        field: 'ckey',
        type: "hidden",
        required: true,
        readonly: true,
    }, {
        title: '参数值',
        field: 'cvalue',
        required: true,
        number: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622916',
        editCode: '622911'
    });
});