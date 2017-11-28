$(function() {
    var code = getQueryString('code');


    var fields = [{
        title: '类型',
        field: 'type',
        hidden: true,
    }, {
        title: '种类',
        field: 'parentKey',
        required: true,
        type: 'select',
        listCode: '807706',
        params: {
            type: 0
        },
        keyName: 'dkey',
        valueName: 'dvalue',
        readonly: !!code
    }, {
        title: '字典键',
        field: 'dkey',
        required: true,
        maxlength: 15,
        readonly: !!code
    }, {
        title: '字典值',
        field: 'dvalue',
        required: true,
        maxlength: 15
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        editCode: '807702',
        detailCode: '807707'
    });

});