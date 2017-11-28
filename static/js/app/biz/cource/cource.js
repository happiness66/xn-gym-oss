$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '课程名称',
        search: true
    }, {
        field: 'coachUser',
        title: '私教名称',
        type: "select",
        listCode: "622097",
        keyName: "userId",
        valueName: "realName",
        search: true
    }, {
        field3: "classDatetime",
        title3: "上课时间",
        type3: "date",
        formatter: dateFormat,
        search: true,
        visible: false
    }, {
        field: "beginClassDatetime",
        title: "上课时间",
        formatter: function(v, data) {
            return dateTimeFormat(data.skStartDatetime) + "~" + dateTimeFormat(data.skEndDatetime)
        }
    }, {
        field: 'totalNum',
        title: '课程总人数'
    }, {
        field: 'remainNum',
        title: '剩余人数'
    }, {
        field: 'address',
        title: '地址',
        formatter: function(v, data) {
            if (data.province == data.city && data.city == data.area) {
                data.city = "";
                data.area = "";
            } else if (data.province == data.city && data.city != data.area) {
                data.city = "";
            }
            var result = (data.province || "") + (data.city || "") + (data.area || "") + (data.address || "");
            return result || "-";
        },
    }, {
        field: 'contact',
        title: '联系方式',
        mobile: true,
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "ui_location",
        formatter: Dict.getNameForList("ui_location"),
        search: true
    }, {
        field: 'orderNo',
        title: 'UI次序'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'course_status',
        formatter: Dict.getNameForList('course_status'),
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '622060',
        searchParams: {
            companyCode: OSS.company
        },
        beforeDelete: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords[0].status != 0) {
                toastr.warning("该课程不是可以删除的状态");
                return;
            }
            confirm("确认是否删除该记录？").then(function() {
                reqApi({
                    code: '622051',
                    json: data
                }).done(function(data) {
                    sucList();
                });
            }, function() {});
        },
        beforeEdit: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords[0].status == 0 || selRecords[0].status == 3) {
                window.location.href = 'cource_addedit.html?code=' + selRecords[0].code;
            } else {
                toastr.warning('只有草稿和已下架的课程才可以修改');
                return;
            }
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.warning('该课程已上架');
            return;
        }
        window.location.href = "cource_up.html?code=" + selRecords[0].code;
    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确定下架该课程？").then(function() {
                reqApi({
                    code: '622054',
                    json: { "code": selRecords[0].code, updater: getUserName() }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            });

        } else {
            toastr.warning('不是可以下架的状态');
            return;
        }

    });
    //截止报名
    $('#stopBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            confirm("确定截止报名该课程？").then(function() {
                reqApi({
                    code: '622055',
                    json: { "code": selRecords[0].code, remark: '截止报名' }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        } else {
            toastr.warning("只有已上架的课程，才可以截止报名");
            return;
        }
    });
    //开始课程
    $('#beginBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            confirm("确定开始上课？").then(function() {
                reqApi({
                    code: '622056',
                    json: { "code": selRecords[0].code, updater: getUserName(), remark: '开始课程' }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        } else {
            toastr.warning("只有截止报名的状态才可以开始上课");
            return;
        }

    });
    //结束课程
    $('#endBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 4) {
            confirm("确定结束课程？").then(function() {
                reqApi({
                    code: '622057',
                    json: { "code": selRecords[0].code, updater: getUserName(), remark: '结束课程' }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        } else {
            toastr.warning("只有开始上课的状态才可以结束课程");
            return;
        }

    });
    //查看评论
    $('#commentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "comment.html?code=" + selRecords[0].code;
    });
});