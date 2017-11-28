$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency',
        keyCode: "802006",
        formatter: Dict.getNameForList("currency", '802006'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        keyCode: '802006',
        formatter: Dict.getNameForList('biz_type', '802006'),
        search: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        // key: 'jour_status',
        data: {
            "1": "待对账",
            "3": "已对账且账已平",
            "4": "账不平待调账",
            "5": "已调账"
        },
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field1: 'dateStart',
        title1: '创建日期',
        type1: 'date',
        field2: 'dateEnd',
        type2: 'date',
        search: true,
        visible: false
    }, {
        field: 'workDate',
        title: '拟对账日期',
        type: 'date',
        search: true,
    }];
    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            channelType: '0',
            accountType: 'NOT_P',
            companyCode: OSS.company,
            status: 'in'
        },
        beforeDetail: function(data) {
            location.href = "ledger_addedit.html?v=1&code=" + data.code;
        }
    });

});