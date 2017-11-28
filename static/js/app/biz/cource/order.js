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
            "0": "待付款",
            "1": "付款成功",
            "4": "申请退款"
        },
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '622080',
        searchParams: {
            companyCode: OSS.company,
            statusList: [0, 1, 4]
        }
    });
    //取消
    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">取消订单</li></ul>' +
                '</form>'
        });
        dw.showModal();
        buildDetail({
            fields: [{
                field: 'remark',
                title: '备注',
                maxlength: 255
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '确定',
                handler: function() {
                    var data = $('#popForm').serializeObject();
                    data.orderCode = selRecords[0].code;
                    data.updater = getUserName();
                    data.remark = $("#remark").val();
                    reqApi({
                        code: '622073',
                        json: data
                    }).done(function(data) {
                        toastr.info("操作成功");
                        $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                        setTimeout(function() {
                            dw.close().remove();
                        }, 500)
                    });

                }
            }, {
                title: '返回',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
    });
    //审批
    $('#checkBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        if (selRecords[0].status != 4) {
            toastr.warning("不是待审批的状态");
            return;
        }
        window.location.href = "order_check.html?code=" + selRecords[0].code;
    });
});