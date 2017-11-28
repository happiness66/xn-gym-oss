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
        search: true,
        data: {
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过"
        }
    }, {
        field: 'commerRealName',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'comment',
        columns: columns,
        pageCode: "622145",
        searchParams: {
            companyCode: OSS.company,
            statusList: ["A", "B", "C"]
        }
    });
})