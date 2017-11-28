$(function() {
    var userId = getQueryString('userId');
    var kind = getQueryString('kind') || "";
    var view = 1;

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'accountNumber',
        title: '账户编号',
    }, {
        field: 'currency',
        title: '账户币种',
        key: 'currency',
        formatter: Dict.getNameForList("currency", "802006"),
    }, {
        field: 'amount',
        title: '账户余额',
        formatter: moneyFormat
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '802503',
        searchParams: {
            userId: userId,
            companyCode: OSS.company
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="mingxiBtn"><span><img src="/static/images/t01.png"></span>查看明细</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        if (kind == "B") {
            window.location.href = "../biz/personal/personalTrainer.html"
        } else if (kind == "D") {
            window.location.href = "../biz/personal/doyen.html"
        } else if (kind == "C") {
            window.location.href = "./member.html"
        }
    });

    //查看明细
    $('#mingxiBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../finance/ledger.html?accountNumber=" + selRecords[0].accountNumber;
    });
});