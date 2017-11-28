$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '导航名称',
        field: 'name',
        search: true
    }, {
        title: '位置',
        field: 'location',
        formatter: function(v) {
            if (v == "index_banner") {
                return '首页';
            }
        },
    }, {
        title: '顺序',
        field: 'orderNo'
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '806050',
        deleteCode: '806041',
        searchParams: {
            companyCode: OSS.company,
            type: 4
        }
    });
});