$(function() {
    var toUser = getQueryString('userId');
    var kind = getQueryString('kind');
    var coachFieldB = {
        title: "私教名称",
        field: "coach",
        formatter: function(v, data) {
            return data.coach.realName;
        }
    };
    var coachFieldD = {
        title: "达人名称",
        field: "coach",
        formatter: function(v, data) {
            return data.coach.realName;
        }
    }
    if (kind == "D") {
        coachField = coachFieldD
    } else {
        coachField = coachFieldB
    };
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
        field: "mobile"
    }, coachField, {
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
            return dateTimeFormat(data.skDatetime) + "~" + dateTimeFormat(data.skDatetime);
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
        key: 'pOrder_status',
        formatter: Dict.getNameForList('pOrder_status'),
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
            toUser: toUser
        }
    });
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');

    $('#backBtn').on('click', function() {
        if (kind == "B") {
            window.location.href = "./personalTrainer.html"
        }
        if (kind == "D") {
            window.location.href = "./doyen.html"
        }
    });

});