$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '参数值',
        field: 'cvalue',
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: "jfRule",
        columns: columns,
        pageCode: "622915",
        searchParams: {
            type: "4",
            companyCode: OSS.company
        }
    });

});