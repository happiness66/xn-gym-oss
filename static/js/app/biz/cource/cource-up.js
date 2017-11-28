$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: "",
        field: "updater",
        value: getUserName(),
        hidden: true,
        required: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "ui_location",
        required: true,
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        required: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622061'
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                reqApi({
                    code: '622053',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            });
        }
    });
});