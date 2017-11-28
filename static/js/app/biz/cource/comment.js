$(function() {
    var code = getQueryString('code');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'courseName'
    }, {
        field: 'content',
        title: '评论内容',
        search: true
    }, {
        field: 'status',
        title: '状态',
        formatter: Dict.getNameForList('comment_status'),
        type: 'select',
        key: 'comment_status'
    }, {
        field: 'commerRealName',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "622145",
        searchParams: {
            companyCode: OSS.company,
            productCode: code
        }
    });
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        goBack();
    });
})