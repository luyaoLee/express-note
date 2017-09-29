var Waterfall = (function() {
    function _Waterfall($ct) {
        this.$ct = $ct;
        this.items = this.$ct.children();
        this.render();
        this.bindEvent();
    }
    _Waterfall.prototype = {
        render: function() {
            var itemWidth = this.items.outerWidth(true),
                colNum = parseInt($(window).width() / itemWidth),
                colHeights = [],
                headerHeight = $('.header').height() + 30,
                offsetWidth = ($(window).width() - itemWidth*colNum) / 2; //使note居中显示的偏移量

            for (var i = 0; i < colNum; i++) {
                colHeights[i] = headerHeight;
            }

            this.items.each(function() {
                var minIndex = 0,
                    minHeight = colHeights[0];
                for (var i = 0; i < colNum; i++) {
                    if (colHeights[i] < minHeight) {
                        minHeight = colHeights[i];
                        minIndex = i;
                    }
                }
                $(this).css({
                    top: minHeight,
                    left: itemWidth * minIndex + offsetWidth
                });
                colHeights[minIndex] += $(this).outerHeight(true);
            });
        },
        bindEvent: function() {
            var _this = this;
            $(window).on('resize', function() {
                _this.render();
            });
        }
    }
    return {
        init: function($ct) {
            new _Waterfall($ct);
        }
    }
})();

module.exports = Waterfall;
