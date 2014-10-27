var express = require('express');
var events = require('events');
var catalog = require('../lib/database/catalog');
var databaseUser = require('../lib/database/databaseUser');
var checkAuth = require('../middleware/checkAuth');
var router = express.Router();

/* GET home page. */


router.get('/registration', function(req, res) {
    if (req.session.user) {
        res.render('algorithms', { title: 'Алгоритмы' });
    }else {
        res.render('registration');
    }
});

router.get('/', function(req, res) {
    if (req.session.user) {
        res.render('algorithms', { title: 'Алгоритмы' });
    }else {
        res.render('index');
    }
});

router.post('/registration', function(req, res, next) {
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            body = JSON.parse(body);
            var user = {login: body.login, password: body.password};
            console.log(user);
            var eventAddUser = new events.EventEmitter();
            eventAddUser.on("add", function(){
                req.session.user = user.login;
                res.statusCode = 200;
                res.end("ok");
            });
            eventAddUser.on("error", function(){
                res.statusCode = 406;
                res.end("ok");
            });
            databaseUser.add_user(user, eventAddUser);

        })
});

router.post('/authorization', function(req,res,next) {
    var body = '';
    req.on('readable', function () {
        body += req.read();
    })
        .on('end', function () {
            body = JSON.parse(body);
            var user = {login: body.login, password: body.password};
            console.log(user);
            var eventLoginUser = new events.EventEmitter();
            eventLoginUser.on("ok", function(){
                req.session.user = user.login;
                res.statusCode = 200;
                res.end("ok");
            });
            eventLoginUser.on("error",function(){
                res.statusCode = 405;
                res.end("ok");
            });
            databaseUser.login_user(user,eventLoginUser);
        });
});

router.use(function(req, res, next){
    if (req.session.user){
        next();
    }else{
        res.statusCode = 200;
    }   res.end("error");
});

router.get('/logout', function(req,res){
   req.session.destroy();
   res.render('index');
});



router.get('/algorithms',checkAuth, function(req, res) {
    res.render('algorithms', { title: 'Алгоритмы' });
});

router.post('/get_catalog', function(req, res, next) {
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body);
                var eventGetCatalog = new events.EventEmitter();
                eventGetCatalog.on( "ok", function( arrayCatalog, arrayAlgorithms ){
                    res.statusCode = 200;
                    res.end( JSON.stringify({data_catalog: arrayCatalog, data_algorithms: arrayAlgorithms}) );
                });
                eventGetCatalog.on( "error", function(){
                    res.statusCode = 200;
                    res.end("error_catalog");
                });
                catalog.get_catalog(body.id_directory, eventGetCatalog);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/get_list_catalog', function(req, res, next) {
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body);

                var eventGetListCatalog = new events.EventEmitter();
                eventGetListCatalog.on("ok", function(){
                    res.statusCode = 200;
                    res.end("list_catalog");
                });
                eventGetListCatalog.on("error", function(){
                    res.statusCode = 200;
                    res.end("error_list_catalog");
                });
                catalog.get_catalog(300, eventGetListCatalog);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});
module.exports = router;