$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'nickname',
        title: '下单人',
        readonly: true
    }, {
        field: 'mobile',
        title: '联系方式',
        readonly: true
    }, {
        field: 'activityTitle',
        title: '活动标题',
        readonly: true
    }, {
        title: "活动地点",
        field: "holdPlace",
        readonly: true
    }, {
        title: "活动方联系方式",
        field: "contact",
        readonly: true
    }, {
        title: "价格",
        field: "price",
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'quantity',
        title: '预约人数',
        readonly: true
    }, {
        title: "下单时间",
        field: "applyDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "订单总额",
        field: "amount",
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "4": "申请退款"
        }
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "下单说明",
        field: "applyNote",
        readonly: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 255
    }];

    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '1';
                data.updater = getUserName();
                data.orderCode = code;
                data.remark = $('#remark').val();
                reqApi({
                    code: '622035',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '0';
                data.updater = getUserName();
                data.orderCode = code;
                data.remark = $('#remark').val();
                reqApi({
                    code: '622035',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '622041',
        buttons: buttons
    };
    buildDetail(options);
});