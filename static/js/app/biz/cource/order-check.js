$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'applyRealName',
        title: '下单人',
        readonly: true
    }, {
        field: 'mobile',
        title: '手机号',
        readonly: true
    }, {
        title: "课程名称",
        field: "orgCourseName",
        readonly: true
    }, {
        field: 'coachRealName',
        title: '私教名称',
        readonly: true
    }, {
        title: "上课时间",
        field: "skStartDatetime",
        formatter: function(v, data) {
            return dateTimeFormat(data.orgCourse.skStartDatetime)
        },
        readonly: true
    }, {
        title: "下课时间",
        field: "skEndDatetime",
        formatter: function(v, data) {
            return dateTimeFormat(data.orgCourse.skEndDatetime)
        },
        readonly: true
    }, {
        title: "上课地址",
        field: "address",
        formatter: function(v, data) {
            return data.orgCourse.address;
        },
        readonly: true
    }, {
        title: "课程总人数",
        field: "totalNum",
        formatter: function(v, data) {
            return data.orgCourse.totalNum;
        },
        readonly: true
    }, {
        field: 'price',
        title: '课程价格',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'quantity',
        title: '购买数量',
        readonly: true
    }, {
        field: 'amount',
        title: '订单总额',
        formatter: moneyFormat,
        readonly: true
    }, {
        title: "下单时间",
        field: "applyDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        readonly: true,
        type: 'select',
        key: 'courseOrder_status'
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: '下单说明',
        field: 'applyNote',
        readonly: true
    }, {
        title: '审核说明',
        field: 'ramark',
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
                data.ramark = $("#remark").val();
                reqApi({
                    code: '622075',
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
                data.ramark = $("#remark").val();
                reqApi({
                    code: '622075',
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
        detailCode: '622081',
        buttons: buttons
    };
    buildDetail(options);
});