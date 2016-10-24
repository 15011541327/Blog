$(function () {
    showBigImg();
    function showBigImg() {
        var $mediumImg = $('#mediumImg');
        var $maskTop = $("#maskTop");
        var $mask = $('#mask');
        var $largeImgContainer = $("#largeImgContainer");
        var $loading = $("#loading");
        var $largeImg = $("#largeImg");
        $maskTop.mouseover(function () {
            $mask .show();
            $largeImgContainer.show();
            $loading.show();
            var src = $mediumImg.attr('src').replace(/m\.jpg$/,'l.jpg');
            $largeImg.attr('src',src);
            $largeImg.on('load',function () {
                //得到图片的宽高
                var largeImgWidth = $largeImg.width();
                var largeImgHeight = $largeImg.height();
                $largeImgContainer.css({
                    width:largeImgWidth/2,
                    height:largeImgHeight/2
                });
                $loading.hide();
                $largeImg.show();
                $maskTop.mousemove(function (ev) {
                    var event = ev ||event;
                    var left = 0;
                    var top = 0;
                    var $maskTopWidth = $maskTop.width();
                    var $maskTopHeight = $maskTop.height();
                    var $maskWidth = $mask.width();
                    var $maskHeight = $mask.height();
                    var eventX = event.offsetX;
                    var eventY = event.offsetY;

                    left = eventX - $maskTopWidth;
                    top = eventY - $maskTopHeight;
                    if(left<0){
                        left = 0;
                    }else if(left>$maskTopWidth - $maskWidth){
                        left = $maskTopWidth - $maskWidth;
                    }
                    if(top<0){
                        top = 0;
                    }else if(top > $maskTopHeight - $maskHeight){
                        top = $maskTopHeight - $maskHeight;
                    }
                    $mask.css({
                        left:left,
                        top:top
                    });
                    $maskTop.css({
                        left:-left*largeImgWidth/$maskTopWidth,
                        top:-top*largeImgHeight/$maskTopHeight
                    });


                })
            });

        }).mouseout(function () {

        })
    }

});
