$(function() {

    var labelDict = Dict.getNameForList("label_kind");
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '私教名称'
    }, {
        field: 'mobile',
        title: '联系方式',
        mobile: true,
        search: true
    }, {
        title: "信用额度（元）",
        field: "creditAmount",
        amount: true,
        formatter: moneyFormat,
    }, {
        field: 'age',
        title: '年龄'
    }, {
        field: 'duration',
        title: '工作年限'
    }, {
        field: 'label',
        title: '标签',
        formatter: function(data) {
            if (data) {
                var arr = data.split('||'),
                    str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += labelDict(arr[i]) + "、";
                }
                return i && str.substr(0, str.length - 1) || "";
            }
        }
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        search: true,
        data: {
            "1": "热门",
            "0": "普通"
        }
    }, {
        field: 'orderNo',
        title: 'UI次序'
    }, {
        field: 'status',
        title: '资料状态',
        type: 'select',
        data: {
            "0": "待审批",
            "1": "审批通过",
            "2": "审批不通过",
            "3": "已上架",
            "4": "已下架"
        },
        search: true
    }, {
        field: 'uStatus',
        title: '用户状态',
        type: 'select',
        key: 'user_status',
        keyCode: "807706",
        formatter: Dict.getNameForList('user_status', "807706")
    }, {
        title: "审核人",
        field: "approver"
    }, {
        title: "审核时间",
        field: "approveDatetime",
        formatter: dateTimeFormat
    }, {
        title: "审核说明",
        field: "remark"
    }, ];
    buildList({
        columns: columns,
        pageCode: '622095',
        searchParams: {
            companyCode: OSS.company,
            type: "0"
        },
        beforeEdit: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords[0].status != 0) {
                toastr.info("不是待审批的状态");
                return;
            }
            //审批
            window.location.href = 'personalTrainer_check.html?&kind=B&code=' + selRecords[0].code;
        },
        beforeDetail: function(data) {
            window.location.href = 'personalTrainer_detail.html?&v=1&kind=B&code=' + data.code;
        }
    });
    //修改资料
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'personalTrainer_adddedit.html?&kind=0&code=' + selRecords[0].code;
    });
    //私教订单
    $('#orderBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "myOrder.html?kind=B&userId=" + selRecords[0].userId;
    });
    //上架
    $('#hotBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1 || selRecords[0].status == 4) {
            window.location.href = "personalTrainer_hot.html?code=" + selRecords[0].code;

        } else {
            toastr.warning("只有审批通过或者下架状态，才可以进行上架操作");
            return;
        }
    });
    //激活
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].uStatus != 0) {
            toastr.info("不是可以禁止登录的状态");
            return;
        }

        confirm("确定禁止该用户登录？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: "2"
                }
            }).then(function() {
                sucList();
            });
        }, function() {})
    });
    //注销
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].uStatus != 2) {
            toastr.info("不是可以允许登录的状态");
            return;
        }
        confirm("确定允许该用户登录？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: "0"
                }
            }).then(function() {
                sucList();
            });
        }, function() {})
    });
    //账户查询
    $('#accoutQueryBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../../member/member_account.html?kind=B&userId=" + selRecords[0].userId;
    });
    //课程查询 
    $('#courseQueryBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "personalTrainer_course.html?kind=B&code=" + selRecords[0].code;
    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 3) {
            toastr.info("只有上架状态，才可以下架");
            return;
        }

        confirm("确定下架？").then(function() {
            reqApi({
                code: '622250',
                json: {
                    code: selRecords[0].code
                }
            }).then(function() {
                sucList();
            });
        }, function() {})
    });
});