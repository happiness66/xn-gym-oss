$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var statusList = {
        "0": "待付款",
        "1": "付款成功",
        "4": "申请退款",
        "2": "用户取消订单",
        "3": "平台取消订单",
        "5": "退款成功",
        "6": "退款失败",
        "7": " 开始",
        "8": "待评价",
        "9": "已完成"
    };

    var orderList = [];
    reqApi({
        code: "622080",
        json: {
            start: 0,
            limit: 1000,
            orgCourseCode: code,
            updater: ""
        },
        sync: true
    }).then(function(data) {
        $.each(data.list, function(i, d) {
            orderList.push({
                code: d.code,
                amount: d.amount,
                status: d.status,
                applyRealName: d.applyRealName,
                mobile: d.mobile,
                quantity: d.quantity,
                orgCourseName: d.orgCourseName,
                applyDatetime: d.applyDatetime,
                coachRealName: d.coachRealName,
                price: d.price,
                province: d.orgCourse.province,
                city: d.orgCourse.city,
                area: d.orgCourse.area,
                address: d.orgCourse.address

            });
        });
    });


    var fields = [{
        field: 'updater',
        type: 'hidden',
        value: getUserName()
    }, {
        field: 'name',
        title: '课程名称',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        field: 'coachUser',
        title: '私教名称',
        type: "select",
        listCode: "622097",
        params: {
            status: "1"
        },
        keyName: "userId",
        valueName: "realName",
        required: true,
        readonly: view
    }, {
        field: "skStartDatetime",
        title: "开始上课时间",
        type: "datetime",
        formatter: dateTimeFormat,
        required: true,
        readonly: view
    }, {
        field: "skEndDatetime",
        title: "下课时间",
        type: "datetime",
        formatter: dateTimeFormat,
        required: true,
        readonly: view
    }, {
        field: 'totalNum',
        title: '课程总人数',
        required: true,
        number: true,
        readonly: view
    }, {
        title: "地址",
        field: "province",
        type: "citySelect",
        readonly: view,
        required: true
    }, {
        field: 'address',
        title: '详细地址',
        required: true,
        readonly: view
    }, {
        field: 'contact',
        title: '联系方式',
        tm: true,
        required: true,
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
        title: '单价',
        field: 'price',
        required: true,
        amount: true,
        readonly: view
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
        formatter: function(v, data) {
            if (v) {
                return v
            } else {
                $("#remainNum").parent().css("display", "none");
            }
        },
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'course_status',
        readonly: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "ui_location",
        readonly: true,
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
            title: "订单编号",
            field: 'code'
        }, {
            field: 'applyRealName',
            title: '下单人'
        }, {
            field: 'mobile',
            title: '联系方式'
        }, {
            title: "课程名称",
            field: "orgCourseName"
        }, {
            field: 'coachRealName',
            title: '私教名称'
        }, {
            title: "上课地址",
            field: "province",
            formatter: function(v, data) {
                if (data.province == data.city && data.city == data.area) {
                    data.city = "";
                    data.area = "";
                } else if (data.province == data.city && data.city != data.area) {
                    data.city = "";
                }
                var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
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
            formatter: dateTimeFormat
        }, {
            field: 'status',
            title: '状态',
            formatter: function(v, data) {
                return statusList[v];
            }
        }],
        useData: orderList
    }];
    if (view) {
        fields = fields.concat(viewList)
    }
    var options = {
        fields: fields,
        code: code,
        addCode: '622050',
        editCode: "622052",
        detailCode: '622061',
        beforeSubmit: function(data) {
            var skStartDate = data.skStartDatetime.split(' '),
                skEndDate = data.skEndDatetime.split(' ');
            if (skStartDate[0] != skEndDate[0]) {
                toastr.warning("上课时间必须是同一天");
                return '';
            } else if (skStartDate[1] >= skEndDate[1]) {
                toastr.warning("开始时间必须小于结束时间");
                return '';
            } else {
                return data;
            }
        },
        view: view
    };
    buildDetail(options);
});