$(function() {
    var code = getQueryString('code');


    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        hidden: true
    }, {
        title: '参数键',
        field: 'ckey1',
        readonly: true,
        formatter: function(v, data) {
            return data.ckey
        }
    }, {
        title: '参数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }, {
        title: '备注',
        field: 'note',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '807716',
        editCode: '807711'
    });
});