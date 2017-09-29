require('less/index.less');

var NoteManager = require('mod/note-manager.js');
var EventCenter = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');

NoteManager.load();

$('.add-note').on('click', function() {
    NoteManager.add();
})

EventCenter.on('waterfall', function() {
    WaterFall.init($('#content'));
})
