$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        type: "hidden"
    }, {
        title: '参数值',
        field: 'cvalue',
        required: true,
        maxlength: 30
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '802026',
        editCode: '802020'
    });
});