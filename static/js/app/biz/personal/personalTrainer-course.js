$(function() {
    var kind = getQueryString('kind') || "";
    var coachCode = getQueryString('code') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'price',
        title: '课程价格',
        formatter: moneyFormat
    }, {
        field: 'skStartDatetime',
        title: '开课时间',
        formatter: function(v, data) {
            return dateTimeFormat(v) + "~" + dateTimeFormat(data.skEndDatetime);
        }
    }, {
        title: "最多上课人数",
        field: "totalNum"
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        data: {
            "1": "已预订",
            "0": "未预订"
        },
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '622110',
        searchParams: {
            coachCode: coachCode,
            companyCode: OSS.company
        }
    });
    $('.tools .toolbar').html('<li style="display:block;" id="addCourseBtn"><span><img src="/static/images/t01.png"></span>新增</li><li style="display:block;" id="editCourseBtn"><span><img src="/static/images/t01.png"></span>修改</li><li style="display:block;" id="deleteCourseBtn"><span><img src="/static/images/t01.png"></span>删除</li><li style="display:block;" id="detailCourseBtn"><span><img src="/static/images/t01.png"></span>详情</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        if (kind == "B") {
            window.location.href = "./personalTrainer.html"
        }
        if (kind == "D") {
            window.location.href = "./doyen.html"
        }
    });
    $("#addCourseBtn").click(function() {
        window.location.href = "personalTrainer_courseAddedit.html?&kind=" + kind + "&coachCode=" + coachCode;
    });
    $("#editCourseBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.error("请选择记录");
            return;
        } else if (selRecords.length >= 2) {
            toastr.error("请选择一条记录");
            return;
        }
        if (selRecords[0].status == "1") {
            toastr.error("只有未被预订的课程才可以修改");
            return;
        }
        window.location.href = "personalTrainer_courseAddedit.html?&kind=" + kind + "&coachCode=" + coachCode + "&code=" + selRecords[0].code;
    });
    $("#deleteCourseBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.error("请选择记录");
            return;
        } else if (selRecords.length >= 2) {
            toastr.error("请选择一条记录");
            return;
        }
        confirm("确认是否删除该记录？").then(function() {

            reqApi({
                code: 622101,
                json: { code: selRecords[0].code }
            }).done(function(data) {
                sucList();
            });
        });

    });
    $("#detailCourseBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        } else if (selRecords.length >= 2) {
            toastr.info("请选择一条记录");
            return;
        }

        window.location.href = "personalTrainer_courseAddedit.html?&v=1&kind=" + kind + "&coachCode=" + coachCode + "&code=" + selRecords[0].code;
    });
});