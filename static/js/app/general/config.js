$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'ckey',
        title: '参数键',
        search: true
    }, {
        field: 'cvalue',
        title: '参数值'
    }, {
        field: 'note',
        title: '备注'
    }];
    buildList({
        router: 'config',
        columns: columns,
        pageCode: '807715',
        searchParams: {
            type: "1"
        }
    });
});