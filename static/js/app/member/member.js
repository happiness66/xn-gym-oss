$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'nickname',
        title: '微信昵称',
    }, {
        field: 'userRefereeName',
        title: '推荐人'
    }, {
        field: 'userRefereeKind',
        title: '推荐人类型',
        type: "select",
        data: {
            "f2": "B端用户",
            "f1": "C端用户",
            "f3": "达人用户"
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        search: true,
        key: 'user_status',
        keyCode: "807706",
        formatter: Dict.getNameForList('user_status', "807706"),
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat
    }];

    buildList({
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: 'f1'
        },
        beforeDetail: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "member_addedit.html?userId=" + selRecords[0].userId;
        }
    });
    //账户查询
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "member_account.html?kind=C&userId=" + selRecords[0].userId;
    });
    //注销和激活
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var status = selRecords[0].status,
            toStatus,
            msg;
        status == 0 ? toStatus = 2 : toStatus = 0;
        msg = toStatus == 2 ? '确定注销该用户？' : "确定激活该用户？";
        confirm(msg).then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: toStatus
                }
            }).then(function() {
                sucList();
            });
        }, function() {})
    });
});