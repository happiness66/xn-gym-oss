$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

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
        title: "价格",
        field: "price",
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'quantity',
        title: '预约人数',
        readonly: true
    }, {
        title: "活动开始时间",
        field: "activityBeginDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "活动结束时间",
        field: "activityEndDatetime",
        formatter: dateTimeFormat,
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
        title: "违约金",
        field: 'penalty',
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v)
            } else {
                $("#penalty").parent().css("display", "none");
            }
        }
    }, {
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "2": "用户取消订单",
            "3": "平台取消订单",
            "5": "退款成功",
            "6": "退款失败",
            "7": "活动开始",
            "8": "已完成",
            "0": "待付款",
            "1": "付款成功",
            "4": "申请退款"
        }
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: function(v, data) {
            if (v && v != "") {
                return dateTimeFormat(v)
            } else {
                $("#payDatetime").parent().css('display', 'none');
            }
        },
        readonly: true
    }, {
        title: "下单说明",
        field: "applyNote",
        readonly: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '622041'
    });

});