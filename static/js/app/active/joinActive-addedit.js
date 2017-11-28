$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'title',
        title: '活动名称',
        readonly:true
    }, {
        title:"参与类型",
        field:"type",
        search:true,
        type:"select",
        data:{
            "0":"教练",
            "1":"达人"
        },
        readonly:true
    },{
        field: 'realName',
        title: '参与人名称',
        readonly:true
    }, {
        field: 'jionDatetime',
        title: '参与时间',
        formatter:dateTimeFormat,
        readonly:true
    }, {
        field: 'totalNum',
        title: '票数'
    },{
        title: '投票时间',
        field: 'startDatetime',
        formatter: function(v, data) {
            return dateTimeFormat(v) + "~" + dateTimeFormat(data.endDatetime)
        },
        readonly:true
    }];
    

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '622231',
        view: view
    });

});