$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'location',
        title: '位置',
        type: 'select',
        required: true,
        data: {
            "1": "热门",
            "0": "普通"
        }
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
        detailCode: '622096'
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            data.code = code;
            confirm("确定上架?").then(function() {
                reqApi({
                    code: '622099',
                    json: data
                }).then(function() {
                    sucDetail();
                });
            }, function() {});

        }
    });
});