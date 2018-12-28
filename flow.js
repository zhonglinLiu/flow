(function($){
    var options = {
        rootElement: '#flow',
        zoom:1, // 縮放
        cols:4,  //列數
        gap:4, //空隙
        scrollBottom: null
    }
    function flow() {}
    flow.prototype.init = function(opts) {
        this.options = $.extend(options,opts);
        this.rootElement = $(this.options.rootElement);
        this.postions = [];
        this.view = $(this.options.view);
        this.images = this.rootElement.find('img');
        for(var i=0;i<this.options.cols;i++) {
            this.postions[i] = 0;
        }
        // 单张图片宽度
        this.imageWidth = (this.rootElement.width() - (this.options.cols+1) * this.options.gap) / this.options.cols
        this.render();
        this.event();
    };
    flow.prototype.render = function() {
        this.images.hide();
        for(var i=0;i<this.images.length;i++) {
            this.index = i;
            this.show();
        }
        
    };
    flow.prototype.event = function() {
        var _this = this
        $(document).scroll(function(){
            
            viewH =$(this).height();//可见高度
            contentH =document.documentElement.clientHeight;//内容高度
            scrollTop =$(this).scrollTop();//滚动高度
            if(contentH == viewH + scrollTop) { //当滚动到底部时，

            }
            if((scrollTop+contentH)/viewH >= 0.95){ //当滚动到距离底部5%时
                _this.options.scrollBottom && _this.options.scrollBottom(this.images)
            }

         });
    };
    flow.prototype.show = function() {
        var image = $(this.images[this.index])
        var loadImg = new Image;
        loadImg.src = this.images[this.index].src;
        var _this = this;
        loadImg.onload = function () {
            image.width(_this.imageWidth);
            var pos = 0;
            var offsetHieght = _this.postions[pos];
            for(var i=1;i<_this.postions.length;i++) {
                if(_this.postions[i] < offsetHieght) {
                    offsetHieght = _this.postions[i];
                    pos = i;
                }
            }
            image.css({
                'left':pos*_this.imageWidth + _this.options.gap*pos + _this.options.gap/2,
                'top':_this.postions[pos]
            })
            _this.postions[pos] = offsetHieght + image.height() + _this.options.gap;
            _this.rootElement.css({"height":_this.postions[pos]});
            image.fadeIn();
        }
        
    };

    flow.prototype.update = function(data) {
        for(var i=0;i<data.length;i++) {
            var dom = $('<img src="'+data[i].url+'">');
            dom.hide();
            dom.appendTo(this.rootElement);
            this.images.push(dom.get(0))
        }
        for(var i=this.index+1;i<this.images.length;i++) {
            this.index = i;
            this.show();
        }
    };
    window.imageFlow = new flow()
})($)