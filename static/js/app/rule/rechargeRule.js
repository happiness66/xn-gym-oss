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
        router: "enchashmentRule",
        columns: columns,
        pageCode: "802025",
        searchParams: {
            type: "1",
            companyCode: OSS.company
        }
    });
});