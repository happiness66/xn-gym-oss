$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var kind = getQueryString('kind') || "";
    var labelDict = Dict.getName("label_kind"),
        items = [];
    for (var i = 0; i < labelDict.length; i++) {
        items.push({
            key: labelDict[i].dkey,
            value: labelDict[i].dvalue
        });
    }
    var coachFieldB = {
        title: "私教名称",
        field: "realName",
        formatter: function(v, data) {
            return data.realName;
        },
        required: true,
        readonly: view
    };
    var coachFieldD = {
        title: "达人名称",
        field: "realName",
        formatter: function(v, data) {
            return data.realName;
        },
        required: true,
        readonly: view
    };

    if (kind == "1") {
        coachField = coachFieldD;
    } else if (kind == "0") {
        coachField = coachFieldB;
    };
    var fields = [{
        title: kind == "1" ? "达人名称" : "教练名称",
        field: "realName",
        formatter: function(v, data) {
            return data.realName;
        },
        required: true,
        readonly: view
    }, {
        field: 'mobile',
        title: '联系方式',
        mobile: true,
        required: true,
        readonly: view,
    }, {
        field: 'age',
        title: '年龄',
        number: true,
        required: true,
        readonly: view,
    }, {
        title: "性别",
        field: "gender",
        type: "select",
        data: {
            "1": "男",
            "0": "女"
        },
        required: true,
        readonly: view,
    }, {
        field: 'duration',
        title: '工作年限',
        number: true,
        required: true,
        readonly: view,
    }, {
        field: 'label',
        title: '标签',
        type: "checkbox",
        items: items,
        required: true,
        readonly: view,
    }, {
        title: "头像",
        field: 'pic',
        type: "img",
        single: true,
        required: true,
        readonly: view,
    }, {
        title: "健身照片",
        field: 'advPic',
        type: "img",
        required: true,
        readonly: view,
    }, {
        field: "pdf",
        type: "img",
        title: kind == "1" ? "证件照" : "教练资格证",
        required: true,
        readonly: view,
    }, {
        field: "idPhoto",
        type: "img",
        title: "证件照",
        required: true,
        readonly: view,
    }, {
        title: "授课区域",
        field: "province1",
        type: "citySelect",
        required: true,
        readonly: view
    }, {
        title: kind == "1" ? "健身地址" : "工作地址",
        field: "address",
        // required: true,
        readonly: view,
        maxlength: 255
    }, {
        type: 'textarea',
        normalArea: true,
        field: "description",
        title: "文字描述",
        readonly: view
    }, {
        title: "图片描述",
        field: "img",
        type: "img",
        required: true,
        getValue: function(data) {
            var pics = [];
            if (data.description) {
                var description = data.description.replace(/<img\s+src="([^"]+)"\s*\/>/ig, function(img, pic) {
                    var index = pic.indexOf('?imageMogr2/auto-orient');
                    if (~index) { pic = pic.substr(0, index); }
                    pic = pic.substr(pic.lastIndexOf("/") + 1);
                    pics.push(pic);
                    return "";
                }).replace(/&nbsp;/ig, " ");
                description = decode(description);
                $("#description").val(description);
            }
            return pics.join('||');
        },
        readonly: view
    }, {
        title: "信用额度（元）",
        field: "creditAmount",
        required: true,
        amount: true,
        formatter: moneyFormat,
        readonly: view,
        afterSet: function(v, data) {
            if (v == undefined) {
                $("#creditAmount").val("")
            }
        }
    }];

    function decode(str) {
        if (!str || str.length === 0) {
            return '';
        }
        var s = '';
        s = str.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br\/>/g, "\n");
        return s;
    }
    // 根据文本和图片生成html
    function getDescription(description, descPics) {
        var pic_html = "";
        descPics.forEach(function(pic) {
            pic_html += '<img src="' + OSS.picBaseUrl + '/' + pic + '?imageMogr2/auto-orient"/>';
        });
        description = encode(description);
        description = description.replace(/\s/g, "&nbsp;");
        description += pic_html;
        return description;
    }

    function encode(str) {
        if (!str || str.length === 0) {
            return '';
        }
        var s = '';
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/<(?=[^o][^)])/g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br/>");
        return s;
    }


    buildDetail({
        fields: fields,
        code: code,
        editCode: '622251',
        detailCode: '622096',
        view: view,
        beforeSubmit: function(data) {
            var labelValue;
            if (Array.isArray(data.label)) {
                labelValue = data.label.join("||");
            } else {
                labelValue = data.label;
            }
            var pics = data.img.split('||');
            data.description = getDescription(data.description, pics);
            data.type = kind;
            data.label = labelValue;
            return data;
        }
    });
    if (kind == "1") {
        $("#idPhoto").parent().css("display", "none");
    };
});