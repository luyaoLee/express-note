var Note = require('mod/note.js');
var EventCenter = require('mod/event.js');
var Toast = require('mod/toast.js');

var noteManager = (function() {
    function load() {
        $.get('/api/notes').done(function(ret) {
            if (ret.status === 0) {
                $.each(ret.data, function(idx, note) {
                    Note.init({
                        id:note.id,
                        context: note.text,
                        username: note.username,
                        time: new Date(parseInt(note.updatedAt)).toLocaleString('chinese',{hour12:false})
                    });
                });

                EventCenter.fire('waterfall');
            } else {
                Toast.init(ret.errorMsg);
            }
        }).fail(function() {
            Toast.init('网络异常');
        });
    }
    function add() {
        Note.init();
    }

    return {load: load, add: add}
})();

module.exports = noteManager;
