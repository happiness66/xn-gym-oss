$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var kind = getQueryString('kind') || "";
    var labelDict = Dict.getNameForList("label_kind");
    var coachFieldB = {
        title: "私教名称",
        field: "coach",
        formatter: function(v, data) {
            return data.realName;
        },
        readonly: true
    };
    var coachFieldD = {
        title: "达人名称",
        field: "coach",
        formatter: function(v, data) {
            return data.realName;
        },
        readonly: true
    };
    var pdfFieldD = {
        field: "pdf",
        type: "img",
        title: "证件照",
        readonly: true
    };
    var pdfFieldB = {
        field: "pdf",
        type: "img",
        title: "教练资格证",
        readonly: true
    };
    if (kind == "D") {
        coachField = coachFieldD;
        pdfField = pdfFieldD;
    } else {
        coachField = coachFieldB;
        pdfField = pdfFieldB;
    };
    var fields = [coachField, {
        field: 'mobile',
        title: '联系方式',
        readonly: true
    }, {
        field: 'age',
        title: '年龄',
        readonly: true
    }, {
        title: "性别",
        field: "gender",
        type: "select",
        data: {
            "1": "男",
            "0": "女"
        },
        readonly: true
    }, {
        field: 'duration',
        title: '工作年限',
        readonly: true
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
        },
        readonly: true
    }, {
        title: "等级",
        field: "star",
        formatter: function(v, data) {
            if (v == "0") {
                return "零级"
            } else if (v == "1") {
                return "一级"
            } else if (v == "2") {
                return "二级"
            } else if (v == "3") {
                return "三级"
            } else if (v == "4") {
                return "四级"
            } else if (v == "5") {
                return "五级"
            }
        }
    }, {
        title: "星星总数",
        field: "starNum"
    }, {
        title: "头像",
        field: 'pic',
        type: "img",
        readonly: true,
        single: true
    }, {
        title: "健身照片",
        field: 'advPic',
        type: "img",
        readonly: true
    }, {
        field: "pdf",
        type: "img",
        title: kind == "D" ? "证件照" : "教练资格证",
        required: true,
        readonly: view,
    }, {
        field: "idPhoto",
        type: "img",
        title: "证件照",
        required: true,
        readonly: view,
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
        readonly: true
    }, {
        field: 'uStatus',
        title: '用户状态',
        type: 'select',
        formatter: Dict.getNameForList('user_status', "807706"),
        readonly: true
    }, {
        title: kind == "D" ? "健身地址" : "工作地址",
        field: "address",
        readonly: true
    }, {
        title: "授课区域",
        field: "province1",
        type: "citySelect",
        readonly: true
    }, {
        title: "图文详述",
        field: "description",
        type: "textarea",
        readonly: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        }
    }, {
        field: 'orderNo',
        title: 'UI次序'
    }, {
        title: "信用额度（元）",
        field: "creditAmount",
        formatter: moneyFormat,
    }, {
        title: "审核人",
        field: "approver"
    }, {
        title: "审核时间",
        field: "approveDatetime",
        formatter: dateTimeFormat
    }, {
        title: "审核说明",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622096',
        view: view
    });
    if (kind == "D") {
        $("#idPhoto").parent().css("display", "none");
    }
});