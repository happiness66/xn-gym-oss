$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: '活动名称',
        maxlength: 255,
        search: true
    }, {
        title: "参与类型",
        field: "type",
        search: true,
        type: "select",
        data: {
            "0": "教练",
            "1": "达人"
        }
    }, {
        field: 'realName',
        title: '参与人名称',
        search: true
    }, {
        field: 'jionDatetime',
        title: '参与时间',
        formatter: dateTimeFormat
    }, {
        field: 'totalNum',
        title: '票数'
    }, {
        title: '投票时间',
        field: 'startDatetime',
        type: "datetime",
        field1: 'startDatetime',
        title1: '投票时间',
        type1: 'datetime',
        field2: 'endDatetime',
        type2: 'datetime',
        formatter: function(v, data) {
            return dateTimeFormat(v) + "~" + dateTimeFormat(data.endDatetime)
        },
        // search:true
    }, {
        title: "活动状态",
        field: "activityStatus",
        type: "select",
        data: {
            "0": "草稿",
            "1": "上架",
            "2": "截止投票",
            "3": "下架"
        },
        search: true
    }];

    buildList({
        columns: columns,
        pageCode: '622230',
        searchParams: {
            companyCode: OSS.company
        }
    });

});