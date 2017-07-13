$(function () {

    var itemIndex = 0;

    var tabLoadEndArray = [false, false, false];
    var tabLenghtArray = [6, 8,];
    var tabScroolTopArray = [0, 0, 0];
    
    // dropload
    var dropload = $('.khfxWarp').dropload({
        scrollArea: window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">已无数据</div>'
        },
        loadDownFn: function (me) {
            setTimeout(function () {
                if (tabLoadEndArray[itemIndex]) {
                    me.resetload();
                    me.lock();
                    me.noData();
                    me.resetload();
                    return;
                }
                var result = '';
                for (var index = 0; index < 5; index++) {
                    if (tabLenghtArray[itemIndex] > 0) {
                        tabLenghtArray[itemIndex]--;
                    } else {
                        tabLoadEndArray[itemIndex] = true;
                        break;
                    }
                    if (itemIndex == 0) {
                        result
                        += ''
                        + '    <hgroup class="khfxRow">'
                        + '      <header>2015-10-18  23:32:13</header>'
                        + '      <div class="mid">'
                        + '        <img class="photo" src="images/user3.jpg" >'
                        + '        <span><label>用户名：</label>何晓殷</span> '
                        + '        <span><label>部门：</label>人事部</span> '
                        + '        <span><label>手机：</label>1391****746</span> '
                        + '        <span><label>用车申请：</label>出差</span> '
                        + '      </div>'
                        + '      <footer><a href="details.html">查看详情</a></footer>'
                        + '    </hgroup>';
                    } else if (itemIndex == 1) {
                        result
                        += ''
                + '    <hgroup class="khfxRow">'
                        + '      <header>2015-10-18  23:32:13</header>'
                        + '      <div class="mid">'
                        + '        <img class="photo" src="images/user2.jpg" >'
                        + '        <span><label>用户名：</label>何晓殷</span> '
                        + '        <span><label>部门：</label>人事部</span> '
                        + '        <span><label>手机：</label>1391****746</span> '
                        + '        <span><label>用车申请：</label>出差</span> '
                        + '      </div>'
                        + '    </hgroup>';
                    } 
                }
                $('.khfxPane').eq(itemIndex).append(result);
                me.resetload();
            }, 500);
        }
    });


    $('.tabHead span').on('click', function () {

        tabScroolTopArray[itemIndex] = $(window).scrollTop();
        var $this = $(this);
        itemIndex = $this.index();
        $(window).scrollTop(tabScroolTopArray[itemIndex]);
        
        $(this).addClass('active').siblings('.tabHead span').removeClass('active');
        $('.tabHead .border').css('left', $(this).offset().left + 'px');
        $('.khfxPane').eq(itemIndex).show().siblings('.khfxPane').hide();

        if (!tabLoadEndArray[itemIndex]) {
            dropload.unlock();
            dropload.noData(false);
        } else {
            dropload.lock('down');
            dropload.noData();
        }
        dropload.resetload();
    });
});