$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'coachRealName',
        formatter: function(v, data) {
            if (data.type == "0") {
                return "私课教练：" + v;
            } else if (data.type == "1") {
                return "私课达人：" + v;
            } else {
                return "团课：" + data.courseName;
            }
        }
    }, {
        field: 'content',
        title: '评论内容',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "D": "被过滤"
        }
        // key: 'comment_status'
    }, {
        field: 'commerRealName',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "622145",
        searchParams: {
            companyCode: OSS.company,
            status: "D"
        },
        //审核
        beforeEdit: function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            window.location.href = 'comment_addedit.html?code=' + selRecords[0].code;
        }
    });

})