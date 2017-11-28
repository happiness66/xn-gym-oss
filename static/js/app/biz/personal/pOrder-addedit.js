$(function() {
    var kind = getQueryString('kind') || "";
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var coachFieldB = {
        title: "私教名称",
        field: "coach",
        formatter: function(v, data) {
            if (data.coach.realName) {
                return data.coach.realName;
            } else if (data.coach.mobile) {
                return data.coach.mobile;
            }
        },
        readonly: true
    };
    var coachFieldD = {
        title: "达人名称",
        field: "coach",
        formatter: function(v, data) {
            if (data.coach.realName) {
                return data.coach.realName;
            } else if (data.coach.mobile) {
                return data.coach.mobile;
            }
        },
        readonly: true
    };
    var statusDataB = {
        "0": "未支付",
        "1": "付款成功",
        "2": "已接单",
        "3": "上课",
        "4": "待填表",
        "5": "已下课",
        "6": "用户取消",
        "7": "私教取消",
        "8": "已完成"
    };
    var statusDataD = {
        "0": "未支付",
        "1": "付款成功",
        "2": "已接单",
        "3": "上课",
        "4": "待填表",
        "5": "已下课",
        "6": "用户取消",
        "7": "达人取消",
        "8": "已完成"
    };
    if (kind == "D") {
        coachField = coachFieldD;
        statusData = statusDataD;
    } else {
        coachField = coachFieldB;
        statusData = statusDataB;
    };
    var sizeDataList;
    reqApi({
        code: "622131",
        json: {
            code: code,
            updater: ""
        },
        sync: true
    }).then(function(data) {
        sizeDataList = data.sizeDataList;
    });

    var fields = [{
        field: 'realName',
        title: '下单人',
        readonly: true
    }, {
        title: "联系方式",
        field: "mobile",
        readonly: true
    }, coachField, {
        field: 'price',
        title: '私课价格',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'skDatetime',
        title: '开课时间',
        formatter: function(v, data) {
            return dateTimeFormat(data.skDatetime) + "~" + dateTimeFormat(data.xkDatetime);
        },
        readonly: true
    }, {
        title: "上课地址",
        field: "address",
        readonly: true
    }, {
        field: 'quantity',
        title: '预约人数',
        readonly: true
    }, {
        title: "订单总额",
        field: "amount",
        formatter: moneyFormat
    }, {
        title: "违约金",
        field: 'penalty',
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v)
            } else {
                $("#penalty").parent().css("display", "none");
            }
        }
    }, {
        title: "违约金",
        field: 'coachPenalty',
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v)
            } else {
                $("#coachPenalty").parent().css("display", "none");
            }
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: statusData,
        readonly: true
    }, {
        title: "下单时间",
        field: "applyDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "下单说明",
        field: 'applyNote',
        readonly: true
    }, {
        title: "备注",
        field: "remark",
        readonly: true
    }, {
        title: "会员电子档案",
        type: "title"
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622131',
        view: view
    });

    var html = '<table id="table" class="xxtable" cellspacing="0" cellpadding="0"><tr><td>日期</td><td id="RQ" colspan="2"></td><td>场地</td><td id="CD" colspan="3"></td></tr>' +
        '<tr><td rowspan="2">上课课程内容</td><td>类别</td><td id="LB"></td><td>课时</td><td id="KS"></td><td>运动强度</td><td id="YD"></td> </tr><tr>' +
        '<td>上课具体内容</td> <td id="SKNR" colspan="5"></td></tr><tr><td>个人身体基本情况</td><td>伤病史</td><td id="SBS"></td><td>伤病史情况</td><td id="SBSQK" colspan="3"></td> </tr>' +
        '<tr><td rowspan="11" style="line-height: 30px;">个<br>人<br>运<br>动<br>能<br>力</td><td>颈部</td><td id="JB" colspan="5"></td></tr>' +
        '<tr><td>肩部</td><td id="JBB" colspan="5"></td></tr><tr><td>心肺</td><td id="XF" colspan="5"></td></tr><tr><td>核心</td><td id="HX" colspan="5"></td></tr><tr>' +
        '<td>左臂</td><td id="ZB" colspan="5"></td></tr><tr><td>右臂</td><td id="YB" colspan="5"></td></tr>' +
        '<tr><td>臀部</td><td id="TB" colspan="5"></td></tr>' +
        '<tr><td>左腿</td><td id="ZT" colspan="5"></td></tr>' +
        '<tr><td>右腿</td><td id="YT" colspan="5"></td></tr>' +
        '<tr><td>协调</td><td id="XT" colspan="5"></td></tr>' +
        '<tr><td>上课教练</td><td id="JL"></td><td>学员课程完成度(%)</td><td id="WCD"></td><td>学员表现(十分制)</td><td id="BX"></td>' +
        '</tr><tr><td>备注</td><td id="BZ" colspan="6"></td></tr></table>';

    if (kind == "D") {
        $("#form-info").find('.form-title').css("display", "none");
        html = "";
    } else {
        $("#form-info").find('.form-title').after(html);
    }
    for (var i = 0, length = sizeDataList.length; i < length; i++) {
        $("#" + sizeDataList[i].ckey).text(sizeDataList[i].cvalue)
    }

});