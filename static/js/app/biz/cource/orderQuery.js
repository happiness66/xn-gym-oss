$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "订单编号",
        field: 'code'
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
        field: 'applyRealName',
        title: '下单人'
    }, {
        field: 'mobile',
        title: '联系方式',
        mobile: true,
        search: true
    }, {
        title: "课程名称",
        field: "orgCourseName"
    }, {
        field: 'coachRealName',
        title: '私教名称'
    }, {
        title: "上课地址",
        field: "orgCourse",
        formatter: function(v, data) {
            if (data.orgCourse.province == data.orgCourse.city && data.orgCourse.city == data.orgCourse.area) {
                data.orgCourse.city = "";
                data.orgCourse.area = "";
            } else if (data.orgCourse.province == data.orgCourse.city && data.orgCourse.city != data.orgCourse.area) {
                data.orgCourse.city = "";
            }
            var result = (data.orgCourse.province || "") + (data.orgCourse.city || "") + (data.orgCourse.area || "") + (data.orgCourse.address || "");
            return result || "-";
        }
    }, {
        field: 'price',
        title: '课程价格',
        formatter: moneyFormat
    }, {
        field: 'quantity',
        title: '购买数量'
    }, {
        field: 'amount',
        title: '订单总额',
        formatter: moneyFormat
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        title1: "下单时间",
        type1: "datetime",
        field1: "applyBeginDatetime",
        type1: "datetime",
        field2: "applyEndDatetime",
        type2: "datetime",
        formatter: dateTimeFormat,
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "2": "用户取消订单",
            "3": "平台取消订单",
            "5": "退款成功",
            "6": "退款失败",
            "7": "开始开课",
            "8": "待评价",
            "9": "已完成"
        },
        // key: 'courseOrder_status',
        search: true
    }];
    buildList({
        router: "order",
        columns: columns,
        pageCode: '622080',
        searchParams: {
            companyCode: OSS.company,
            statusList: [2, 3, 5, 6, 7, 8, 9]
        }
    });

});