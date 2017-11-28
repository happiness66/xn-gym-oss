$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var statusList = {
        "0": "待付款",
        "1": "付款成功",
        "4": "申请退款",
        "2": "用户取消订单",
        "3": "平台取消订单",
        "5": "退款成功",
        "6": "退款失败",
        "7": "活动开始",
        "8": "已完成"
    };

    var orderList = [];
    reqApi({
        code: "622040",
        json: {
            start: 0,
            limit: 1000,
            activityCode: code,
            updater: ""
        },
        sync: true
    }).then(function(data) {
        $.each(data.list, function(i, d) {
            orderList.push({
                code: d.code,
                amount: d.amount,
                status: d.status,
                nickname: d.nickname,
                mobile: d.mobile,
                quantity: d.quantity,
                applyDatetime: d.applyDatetime,
                activityTitle: d.activityTitle,
                holdPlace: d.holdPlace,
                price: d.price
            });
        });
    });
    var start = {
        elem: '#startDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,

        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: '#endDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            start.max = datas;
        }
    };

    var fields = [{
        field: 'updater',
        type: 'hidden',
        value: getUserName()
    }, {
        title: '标题',
        field: 'title',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '缩略图',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view,
        single: true
    }, {
        title: "广告图",
        field: "advPic",
        type: 'img',
        required: true,
        readonly: view
    }, {
        title: "广告语",
        field: "slogan",
        required: true,
        readonly: view,
        maxlength: 255
    }, {
        title: '单价',
        field: 'amount',
        required: true,
        amount: true,
        readonly: view
    }, {
        field: "holdPlace",
        title: "活动地点",
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: start,
        readonly: view,
        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: end,
        readonly: view,
        required: true
    }, {
        title: "联系方式",
        field: "contact",
        tm: true,
        readonly: view,
        required: true
    }, {
        title: "总人数",
        field: "totalNum",
        number: true,
        readonly: view,
        required: true
    }, {
        title: '图文详述',
        field: 'description',
        required: true,
        type: 'textarea',
        readonly: view
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 255,
        readonly: view
    }];
    var viewList = [{
        title: "剩余人数",
        field: "remainNum",
        readonly: true,
    }, {
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "截止报名",
            "3": "下架",
            "4": "开始活动",
            "5": "结束活动"
        }
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        },
        readonly: true
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }, {
        title: '订单列表',
        field: 'order',
        type: 'o2m',
        readonly: true,
        columns: [{
            field: 'code',
            title: '订单号'
        }, {
            field: 'nickname',
            title: '下单人'
        }, {
            field: 'mobile',
            title: '联系方式'
        }, {
            field: 'activityTitle',
            title: '活动标题'
        }, {
            title: "活动地点",
            field: "holdPlace"
        }, {
            field: 'quantity',
            title: '预约人数'
        }, {
            field: 'amount',
            title: '订单总额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            formatter: function(v, data) {
                return statusList[v]
            }
        }, {
            field: 'applyDatetime',
            title: '下单时间',
            formatter: dateTimeFormat
        }],
        useData: orderList
    }]
    if (view) {
        fields = fields.concat(viewList)
    }

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622021',
        addCode: '622010',
        editCode: '622012',
        view: view
    });

});