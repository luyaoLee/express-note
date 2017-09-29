require('less/note.less');
var Toast = require('mod/toast.js');
var EventCenter = require('mod/event.js');

var Note = (function() {
    function _Note(opts) {
        this.initOpts(opts)
        this.createNote();
        this.bindEvent();
    }
    _Note.prototype = {
        //note的配置信息及初始化
        defaultOpts: {
            id: '',
            time: '',
            $ct: $('#content').length > 0
                ? $('#content')
                : $('body'),
            context: 'Input something here...'
        },
        initOpts: function(opts) {
            this.opts = $.extend({}, this.defaultOpts, opts || {});
            if (this.opts.id) {
                this.id = this.opts.id;
            }
        },
        //创建note模板
        createNote: function() {
            var tpl = '<div class="note">' +
            '<div class="note-head">' +
            '<span class="delete" title="删除">&times;</span>' +
            '</div>' +
            '<div class="note-ct" contenteditable="true"></div>' +
            '<p class="username"></p>'+
            '<p class="time"></p>'+
            '</div>';

            this.$note = $(tpl);
            this.$note.find('.note-ct').html(this.opts.context);
            this.$note.find('.username').html(this.opts.username);
            this.$note.find('.time').html(this.opts.time);
            this.opts.$ct.append(this.$note);
            if (!this.id) {
                this.$note.siblings().css('zIndex', 0);
                this.$note.css({zIndex: 999, left: '10px', top: '100px'});
            }
            EventCenter.fire('waterfall');
        },
        //当note位置发生变化，所有note重新布局
        setLayout: function() {
            var _this = this;
            if (this.clk) {
                clearTimeout(_this.clk);
            }
            this.clk = setTimeout(function() {
                EventCenter.fire('waterfall');
            }, 100);
        },
        //给note绑定事件
        bindEvent: function() {
            var _this = this,
                $note = this.$note,
                $noteHead = $note.find('.note-head'),
                $noteCt = $note.find('.note-ct'),
                $delete = $note.find('.delete');

            $delete.on('click', function() {
                _this.delete();
            });

            //contenteditable没有 change 事件，所有这里通过判断元素内容变动来模拟
            $noteCt.on('focus', function() {
                if ($noteCt.html() == 'Input something here...') {
                    $noteCt.html('');
                }
                $noteCt.data('before', $noteCt.html());
            }).on('blur paste', function() {
                if ($noteCt.html() != $noteCt.data('before')) {
                    $noteCt.data('before', $noteCt.html());
                    _this.setLayout();
                    if (_this.id) {
                        _this.edit($noteCt.html());
                    } else {
                        _this.add($noteCt.html());
                    }
                }
            });

            //note的拖拽效果
            $noteHead.on('mousedown', function(e) {
                var eventX = e.pageX - $note.offset().left,
                    eventY = e.pageY - $note.offset().top;
                $note.addClass('draggable')
                     .css('zIndex', 999)
                     .siblings()
                     .css('zIndex', 0);
                $('body').on('mousemove', function(e) {
                    e.preventDefault();
                    $('.draggable').length && $('.draggable').offset({
                        top: e.pageY - eventY,
                        left: e.pageX - eventX
                    });
                });
            }).on('mouseup', function() {
                $note.removeClass('draggable');
            });
        },
        //新建note
        add: function(msg) {
            var _this = this;
            $.post('/api/notes/add', {note: msg}).done(function(ret) {
                if (ret.status === 0) {
                    _this.$note.remove();
                    Note.init({
                        id: ret.result.id,
                        context: ret.result.text,
                        username: ret.result.username,
                        time: new Date(ret.result.createdAt).toLocaleString('chinese',{hour12:false})
                    });
                    Toast.init('添加成功');
                } else {
                    _this.$note.remove();
                    Toast.init(ret.errorMsg);
                }
            })
        },
        //编辑note
        edit: function(msg) {
            var _this = this;
            $.post('/api/notes/edit', {
                id: this.id,
                note: msg,
                updatedAt: new Date().getTime()
            }).done(function(ret) {
                if (ret.status === 0) {
                    _this.$note.find('.time').html(new Date().toLocaleString('chinese',{hour12:false}));
                    Toast.init('编辑成功');
                } else {
                    Toast.init(ret.errorMsg);
                }
            })
        },
        //删除note
        delete: function() {
            var _this = this;
            $.post('/api/notes/delete', {id: this.id}).done(function(ret) {
                if (ret.status === 0) {
                    _this.$note.remove();
                    _this.setLayout();
                    Toast.init('删除成功');
                } else {
                    Toast.init(ret.errorMsg);
                }
            });
        }
    }
    return {
        init: function(opts) {
            new _Note(opts);
        }
    }
})();

module.exports = Note;
