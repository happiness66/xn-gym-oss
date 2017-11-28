$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        search: true,
        keyCode: '802006',
        formatter: Dict.getNameForList('channel_type', '802006'),
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "currency",
        keyCode: '802006',
        formatter: Dict.getNameForList("currency", '802006')
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        search: true,
        key: 'biz_type',
        keyCode: '802006',
        formatter: Dict.getNameForList('biz_type', '802006'),
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
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        search: true,
        keyCode: '802006',
        formatter: Dict.getNameForList('jour_status', '802006'),
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802524",
        searchParams: {
            currency: currency,
            userId: accountNumber ? "" : getUserId(),
            accountNumber: accountNumber,
            companyCode: OSS.company
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        goBack();
    });
});