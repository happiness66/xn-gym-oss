$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单号'
    }, {
        field: 'applyUser',
        title: '下单人',
        type: 'select',
        pageCode1: "805054",
        params: {
            kind: "f1",
            updater: ""
        },
        keyName: "userId",
        valueName: "nickname",
        search: true,
        visible: false
    }, {
        field: 'nickname',
        title: '下单人'
    }, {
        field: 'mobile',
        title: '联系方式'
    }, {
        field: 'activityTitle',
        title: '活动标题',
        search: true
    }, {
        title: "活动地点",
        field: "holdPlace"
    }, {
        title: "价格",
        field: "price",
        formatter: moneyFormat
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
        data: {
            "2": "用户取消订单",
            "3": "平台取消订单",
            "5": "退款成功",
            "6": "退款失败",
            "7": "活动开始",
            "8": "已完成"
        },
        search: true,
        type: 'select',
        // key: 'acOrder_status'
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        type1: 'datetime',
        title1: '下单时间',
        field1: 'applyBeginDatetime',
        field2: 'applyEndDatetime',
        search: true
    }, {
        title: '备注',
        field: 'remark'
    }];

    buildList({
        router: "order",
        columns: columns,
        pageCode: '622040',
        searchParams: {
            companyCode: OSS.company,
            statusList: [2, 3, 5, 6, 7, 8]
        },

    });
});