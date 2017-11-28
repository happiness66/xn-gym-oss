$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '参数值',
        field: 'cvalue',
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: "jfRule",
        columns: columns,
        pageCode: "622915",
        searchParams: {
            type: "7",
            companyCode: OSS.company
        }
    });

});