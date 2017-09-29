var express = require('express');
var router = express.Router();
var noteModel = require('../model/noteModel.js')

//获取所有的note
router.get('/notes', function(req, res, next) {
    noteModel.findAll({raw: true}).then(function(notes) {
        console.log(notes)
        res.send({status: 0, data: notes})
    }).catch(function() {
        res.send({status: 1, errorMsg: '数据库异常'});
    });
});

//添加note的路由
router.post('/notes/add', function(req, res, next) {
    if (!req.session.user) {
        return res.send({status: 1, errorMsg: '请先登录'});
    }
    if (!req.body.note) {
        return res.send({status: 2, errorMsg: '内容不能为空'});
    }
    var note = req.body.note;
    var uid = req.session.user.id; //用于设置每个用户的权限
    var username = req.session.user.username;
    var curTime = new Date().getTime();

    noteModel.create({text: note, uid: uid, username: username, createdAt: curTime, updatedAt: curTime}).then(function(data) {
        res.send({
            status: 0,
            result: data.get({plain: true})
        });
    }).catch(function() {
        res.send({status: 1, errorMsg: '数据库异常或者你没有权限'});
    });
});

//编辑note的路由
router.post('/notes/edit', function(req, res, next) {
    if (!req.session.user) {
        return res.send({status: 1, errorMsg: '请先登录'});
    }
    var note = req.body.note;
    var id = req.body.id;
    var uid = req.session.user.id;
    var updatedAt = req.body.updatedAt;

    noteModel.update({
        text: note,
        updatedAt: updatedAt
    }, {
        where: {
            id: id,
            uid: uid
        }
    }).then(function(lists) {
        if (lists[0] === 0) {
            return res.send({status: 1, errorMsg: '你没有权限'});
        }
        res.send({status: 0});
    }).catch(function() {
        res.send({status: 1, errorMsg: '数据库异常或者你没有权限'});
    });
});

//删除note的路由
router.post('/notes/delete', function(req, res, next) {
    if (!req.session.user) {
        return res.send({status: 1, errorMsg: '请先登录'});
    }
    var id = req.body.id;
    var uid = req.session.user.id;

    noteModel.destroy({
        where: {
            id: id,
            uid: uid
        }
    }).then(function(deleteLen) {
        if (deleteLen === 0) {
            return res.send({status: 1, errorMsg: '你没有权限'});
        }
        res.send({status: 0})
    }).catch(function() {
        res.send({status: 1, errorMsg: '数据库异常或者你没有权限'});
    });
});
module.exports = router;
