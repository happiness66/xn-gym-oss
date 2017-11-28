$(function() {
    var code = getQueryString('code');
    var isDetail = !!getQueryString('detail');

    var approveNoteField = {
        title: '审核意见',
        field: 'approveNote',
        maxlength: 255,
        required: true,
        readonly: false
    };

    var payList = [approveNoteField]

    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approveResult = '1';
                data.approveUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802752',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approveResult = '0';
                data.approveUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '802752',
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

    if (isDetail) {
        approveNoteField = {};
        payList = [{
            field: 'approveUser',
            title: '审核人',
            formatter: function(v, data) {
                if (v) {
                    return v
                } else {
                    $("#approveUser").parent().css("display", "none");
                    $("#approveDatetime").parent().css("display", "none");
                    $("#approveNote").parent().css("display", "none");
                    $("#payUser").parent().css("display", "none");
                    $("#payDatetime").parent().css("display", "none");
                    $("#payNote").parent().css("display", "none");
                }
            }
        }, {
            field: 'approveDatetime',
            title: '审核日期',
            formatter: dateTimeFormat
        }, {
            field: 'approveNote',
            title: '审核意见'
        }, {
            field: 'payUser',
            title: '回录人',
            formatter: function(v, data) {
                if (v == undefined) {
                    $("#payUser").parent().css("display", "none");
                    $("#payDatetime").parent().css("display", "none");
                    $("#payNote").parent().css("display", "none");
                } else if (v == "SYS_USER_ZWZJ") {
                    return "admin";
                } else {
                    return v
                }
            }
        }, {
            field: 'payDatetime',
            title: '回录时间',
            formatter: dateTimeFormat
        }, {
            field: 'payNote',
            title: '回录说明',
        }]
        buttons = "";
    }

    var fields = [{
        title: '编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: '账号',
        field: 'accountNumber',
        required: true
    }, {
        title: '户名',
        field: 'accountName',
        required: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        title: "手续费",
        field: "fee",
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v);
            } else {
                $("#fee").parent().css("display", "none");
            }
        }
    }, {
        field: 'channelType',
        title: '支付渠道',
        type: 'select',
        key: 'channel_type',
        keyCode: '802006',
        formatter: Dict.getNameForList('channel_type', '802006'),
        search: true
    }, {
        field: 'payCardInfo',
        title: '开户行'
    }, {
        field: 'payCardNo',
        title: '银行卡号'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        keyCode: '802006',
        formatter: Dict.getNameForList('withdraw_status', '802006'),
        search: true
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user.kind == '01') {
                return data.user.loginName;
            } else {
                return data.user.mobile;
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请日期',
        formatter: dateTimeFormat,
    }];


    fields = fields.concat(payList)

    var options = {
        fields: fields,
        code: code,
        detailCode: '802756',
        view: true,
        buttons: buttons
    };

    buildDetail(options);
});