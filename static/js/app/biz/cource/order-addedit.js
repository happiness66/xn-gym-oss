$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'applyRealName',
        title: '下单人',
        readonly: true
    }, {
        field: 'mobile',
        title: '联系方式',
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
            if (data.orgCourse.province == data.orgCourse.city && data.orgCourse.city == data.orgCourse.area) {
                data.orgCourse.city = "";
                data.orgCourse.area = "";
            } else if (data.orgCourse.province == data.orgCourse.city && data.orgCourse.city != data.orgCourse.area) {
                data.orgCourse.city = "";
            }
            var result = (data.orgCourse.province || "") + (data.orgCourse.city || "") + (data.orgCourse.area || "") + (data.orgCourse.address || "");
            return result || "-";
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
        title: "违约金",
        field: "penalty",
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v);
            } else {
                $("#penalty").parent().css("display", "none");
            }
        }
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
        formatter: function(v, data) {
            if (v && v != "") {
                return dateTimeFormat(v)
            } else {
                $("#payDatetime").parent().css('display', 'none');
            }
        },
        readonly: true
    }, {
        title: '下单说明',
        field: 'applyNote',
        readonly: true
    }, {
        title: "备注",
        field: "remark",
        readonly: true,
        formatter: function(v, data) {
            if (v) {
                return v
            } else {
                $("#remark").parent().css('display', 'none');
            }
        }
    }];
    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: '622081'
    };
    buildDetail(options);

});