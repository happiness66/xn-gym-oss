$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '下单人',
        type: "select",
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
        field: 'realName',
        title: '下单人'
    }, {
        title: "联系方式",
        field: "mobile",
        search: true
    }, {
        title: "私教名称",
        field: "coach",
        formatter: function(v, data) {
            return data.coach.realName;
        }
    }, {
        field: 'price',
        title: '私课价格',
        formatter: moneyFormat
    }, {
        title: "上课地址",
        field: "address"
    }, {
        field: 'skDatetime',
        title: '开课时间',
        formatter: function(v, data) {
            return dateTimeFormat(data.skDatetime) + "~" + dateTimeFormat(data.xkDatetime)
        }
    }, {
        field: 'quantity',
        title: '预约人数',
    }, {
        title: "订单总额",
        field: "amount",
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        // key: 'pOrder_status',
        data: {
            "0": "未支付",
            "1": "付款成功",
            "2": "已接单",
            "3": "上课",
            "4": "待填表",
            "5": "已下课",
            "6": "用户取消",
            "7": "私教取消",
            "8": "已完成"
        },
        search: true
    }, {
        title: "下单说明",
        field: 'applyNote'
    }];
    buildList({
        columns: columns,
        pageCode: '622130',
        searchParams: {
            companyCode: OSS.company,
            type: "0"
        }
    });

});