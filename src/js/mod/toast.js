require('less/toast.less');

var Toast = (function() {
    /**
     * [_Toast description]
     * @param       {string} msg  [需要toast的信息]
     * @param       {number} time [toast弹框持续时间，毫秒]
     */

    function _Toast(msg, time) {
        this.msg = msg;
        this.time = time || 1000;
        this.createToast();
        this.showToast();
    }
    _Toast.prototype = {
        createToast: function() {
            var tpl = '<span class="toast">' + this.msg + '</span>';
            this.$toast = $(tpl);
            $('body').append(this.$toast);
        },
        showToast: function() {
            var _this = this;
            this.$toast.fadeIn(function() {
                setTimeout(function() {
                    _this.$toast.fadeOut(function() {
                        _this.$toast.remove();
                    });
                }, _this.time);
            });
        }
    }
    return {
        init: function(msg, time) {
            new _Toast(msg, time);
        }
    }
})();

module.exports = Toast;
