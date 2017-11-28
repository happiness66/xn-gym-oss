$(function() {
    var coachCode = getQueryString('coachCode');
    var kind = getQueryString('kind');
    var code = getQueryString('code');
    var view = getQueryString('v');
    var maxPrice;
    reqApi({
        code: "622917",
        json: {
            ckey: "courseMaxPrice"
        },
        sync: true
    }).then(function(data) {
        maxPrice = data.cvalue;
    });
    var start = {
        elem: '#skStartDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            end.min = datas;
            end.start = datas;
            end.max = datas;
        }
    };
    var end = {
        elem: '#skEndDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            start.max = datas;
            // start.min = min;
        }
    };

    var fields = [{
        title: "上课日期",
        field: "skCycle",
        hidden: true,
        required: true,
        value: "0"
    }, {
        field: 'price',
        title: '课程价格',
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "上课时间",
        type: "datetime",
        field: "skStartDatetime",
        dateOption: start,
        required: true,
        readonly: view,
        formatter: dateTimeFormat,
        help: '课程上课和下课日期必须是同一天'
    }, {
        title: "下课时间",
        type: "datetime",
        field: "skEndDatetime",
        dateOption: end,
        required: true,
        readonly: view,
        formatter: dateTimeFormat,
        help: '课程上课和下课日期必须是同一天'
    }, {
        title: "最多上课人数",
        field: "totalNum",
        number: true,
        required: true,
        readonly: view
    }, {
        title: "上课地址",
        field: "address",
        required: true,
        readonly: view,
    }];

    var options = {
        fields: fields,
        code: code,
        addCode: '622100',
        editCode: "622102",
        detailCode: '622111',
        beforeSubmit: function(data) {
            data.coachCode = coachCode;
            if (data.skStartDatetime.split(" ")[1] >= data.skEndDatetime.split(" ")[1]) {
                toastr.warning("上课时间必须小于下课时间");
                return '';
            } else {
                if ((data.price / 1000) > maxPrice) {
                    toastr.warning('课程价格必须小于或者等于' + maxPrice + '');
                    return '';
                } else {
                    return data
                };
            }
        },
        view: view
    };
    buildDetail(options);
    if (kind == "B") {
        $("#address").parent().css("display", "none")
    };
    var maxPriceHtml = '<span style="color:red">课程单价最高为' + maxPrice + '元,请不要输入大于' + maxPrice + '的课程价格</span>'
    $("#price").after(maxPriceHtml)

});