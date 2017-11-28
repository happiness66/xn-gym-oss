$(function() {
    var code = getQueryString('code');
    var kind = getQueryString('kind');
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
    if (kind == "D") {
        coachField = coachFieldD;
    } else {
        coachField = coachFieldB;
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
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "待审批",
            "1": "审批通过",
            "2": "审批不通过",
            "3": "已上架",
            "4": "已下架"
        },
        search: true,
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
        field: "pdf",
        type: "img",
        title: kind == "D" ? "证件照" : "教练资格证",
        required: true,
        readonly: true,
    }, {
        field: "idPhoto",
        type: "img",
        title: "证件照",
        required: true,
        readonly: true,
    }, {
        title: "图文详述",
        field: "description",
        type: "textarea",
        readonly: true
    }, {
        title: "信用额度(元)",
        field: "creditAmount",
        // required: true,
        mumber: true,
        afterSet: function(v, data) {
            if (v == undefined) {
                $("#creditAmount").val("")
            }
        },
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v);
            }
        },
        help: "审核通过时，信用额度为必填项；<br>审核不通过时，不用填写。"
            // readonly: false
    }, {
        title: "审核说明",
        field: "remark",
        maxlength: 255
    }];
    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '1';
                data.approver = getUserName();
                if (data.creditAmount == "") {
                    data.creditAmount == ""
                } else {
                    data.creditAmount = parseFloat(data.creditAmount).toFixed(2) * 1000;
                };
                if (data.creditAmount == "") {
                    toastr.warning("审核通过时，信用额度必须填写");
                    return "";
                } else {
                    reqApi({
                        code: '622092',
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                };

            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '0';
                data.approver = getUserName();
                data.code = code;
                reqApi({
                    code: '622092',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '622096',
        buttons: buttons
    }
    buildDetail(options);
    if (kind == "D") {
        $("#idPhoto").parent().css("display", "none");
    }
});