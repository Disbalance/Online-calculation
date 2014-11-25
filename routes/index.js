var express = require('express');
var events = require('events');
var databaseUser = require('../lib/database/databaseUser');
var checkAuth = require('../middleware/checkAuth');
var crypto = require('crypto');
var parser = require('../lib/database/algorithms')
var router = express.Router();

/* GET home page. */


router.get('/registration', function(req, res) {
    if (req.session.id_user) {
        res.render('algorithms', { title: 'Алгоритмы' });
    }else {
        res.render('registration');
    }
});

router.get('/', function(req, res) {
    if (req.session.id_user) {
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
            var user = {login: body.login, password: crypto.createHash('md5').update(body.password).digest('hex')};
            console.log(user);
            var eventAddUser = new events.EventEmitter();
            eventAddUser.on("add", function(id_user){
                console.log('Пользователь'+' '+user.login+' '+'добавлен в базу данных и авторизован');
                req.session.id_user = id_user;
                res.statusCode = 200;
                res.end("ok");
            });
            eventAddUser.on("error", function(){
                console.log('Пользователь'+' '+user.login+' '+'не добавлен в базу данных из-за ошибки');
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
            var user = {login: body.login, password: crypto.createHash('md5').update(body.password).digest('hex')};
            var eventLoginUser = new events.EventEmitter();
            eventLoginUser.on("ok", function(id_user){
                console.log('Пользователь'+' '+user.login+' '+'успешно авторизован');
                req.session.id_user = id_user;
                res.statusCode = 200;
                res.end("ok");
            });
            eventLoginUser.on("error",function(){
                console.log('Пользователь'+' '+user.login+' '+'- ошибка при авторизации');
                res.statusCode = 405;
                res.end("ok");
            });
            databaseUser.login_user(user,eventLoginUser);
        });
});

/*router.use(function(req, res, next){
    if (req.session.user){
        next();
    }else{
        res.statusCode = 200;
    }   res.end('error');
}); */

router.get('/logout', function(req,res){
    console.log('Пользователь вышел');
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
                var eventGetCatalog = new events.EventEmitter();
                eventGetCatalog.on( "ok", function( arrayCatalog, arrayAlgorithms ){
                    console.log('Каталог успешно отправлен клиенту');
                    res.statusCode = 200;
                    res.end( JSON.stringify({data_catalog: arrayCatalog, data_algorithms: arrayAlgorithms}) );
                });
                eventGetCatalog.on( "error", function(){
                    console.log('Каталог не отправлен клиенту из-за ошибки');
                    res.statusCode = 200;
                    res.end("error_catalog");
                });
                //catalog.get_catalog(body.id_directory, eventGetCatalog);
                databaseUser.getCatalog(body.id_directory, eventGetCatalog);

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
                var eventGetListCatalog = new events.EventEmitter();
                eventGetListCatalog.on("ok", function(root,arrayCatalog){
                    console.log('Список каталогов успешно отправлен клиенту');
                    res.statusCode = 200;
                    res.end(JSON.stringify({root: root, arrayCatalog: arrayCatalog}));
                });
                eventGetListCatalog.on("error", function(){
                    console.log('Список каталогов не отправлен клиенту из-за ошибки');
                    res.statusCode = 200;
                    res.end("error_list_catalog");
                });
                databaseUser.getListCatalog(req.session.id_user, eventGetListCatalog);
            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/addAlghoritm', function(req,res,next) {
    var body = '';
    req.on('readable', function () {
        body += req.read();
    })
        .on('end', function () {
            body = JSON.parse(body);
            var data = {name:body.nameAlghoritm, id_catalog:body.id_catalog};
            var eventAddAlghoritm = new events.EventEmitter();
            eventAddAlghoritm.on("ok", function(){
                console.log('Алгоритм'+' '+data.name+' '+' успешно добавлен в базу данных');
                res.statusCode = 200;
                res.end("ok");
            });
            eventAddAlghoritm.on("error",function(){
                console.log('Алгоритм'+' '+data.name+' '+'не добавлен в базу данных из-за ошибки');
                res.statusCode = 405;
                res.end("ok");
            });
            databaseUser.addAlghoritm(data, eventAddAlghoritm);
        });
});

router.post('/addCatalog', function(req,res,next) {
    var body = '';
    req.on('readable', function () {
        body += req.read();
    })
        .on('end', function () {
            body = JSON.parse(body);
            var data = {name:body.nameCatalog, id_pred:body.id_pred};
            var eventAddCatalog = new events.EventEmitter();
            eventAddCatalog.on("add", function(){
                console.log('Каталог'+' '+data.name+' '+' успешно добавлен в базу данных');
                res.statusCode = 200;
                res.end("ok");
            });
            eventAddCatalog.on("error",function(){
                console.log('Каталог'+' '+data.name+' '+'не добавлен в базу данных из-за ошибки');
                res.statusCode = 405;
                res.end("ok");
            });
            databaseUser.addCatalog(data, eventAddCatalog);
        });
});

router.post('/get_list_access_users', function(req,res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body.id_catalog);
                var eventGetListAccessUsers = new events.EventEmitter();
                eventGetListAccessUsers.on( "ok", function(arrayUsers){
                    console.log('Список пользователей успешно отправлен клиенту');
                    res.statusCode = 200;
                    res.end(JSON.stringify({arrayUsers: arrayUsers}));
                });
                eventGetListAccessUsers.on( "error", function(){
                    console.log('Список пользователей не отправлен клиенту из-за ошибки');
                    res.statusCode = 200;
                    res.end("error_list");
                });

                databaseUser.getListAccessUsers(body.id_catalog, eventGetListAccessUsers);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/add_access_user', function (req, res, next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                var data = {name:body.name, id_catalog: body.id_catalog, id_call: req.session.id_user};
                var eventAddAccessUser = new events.EventEmitter();
                eventAddAccessUser.on( "ok", function(){
                    console.log('Пользователю '+data.name+' успешно открыт доступ к каталогу');
                    res.statusCode = 200;
                    res.end("ok");
                });
                eventAddAccessUser.on( "error", function(){
                    console.log('Пользователю '+data.name+'  не открыт доступ к каталогу из-за ошибки');
                    res.statusCode = 205;
                    res.end("ok");
                });

                databaseUser.addAccessUser(data, eventAddAccessUser);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/delete_access_user', function (req, res, next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                var data = {name:body.name, id_catalog: body.id_catalog};
                var eventDeleteAccessUser = new events.EventEmitter();
                eventDeleteAccessUser.on( "ok", function(){
                    console.log('Пользователю '+data.name+' успешно снят доступ к каталогу');
                    res.statusCode = 200;
                    res.end("ok");
                });
                eventDeleteAccessUser.on( "error", function(){
                    console.log('Пользователю '+data.name+'  не снят доступ к каталогу из-за ошибки');
                    res.statusCode = 200;
                    res.end("ok");
                });

                databaseUser.deleteAccessUser(data, eventDeleteAccessUser);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/back_catalog', function (req, res, next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                var eventBackCatalog = new events.EventEmitter();
                eventBackCatalog.on( "ok", function(pred_catalog){
                    console.log('Пользователь перешёл в родительский каталог');
                    res.statusCode = 200;
                    res.end(JSON.stringify({pred_catalog: pred_catalog}));
                });
                eventBackCatalog.on( "error", function(){
                    console.log('Пользователь не перешёл в каталог '+pred_catalog+' из-за ошибки');
                    res.statusCode = 400;
                    res.end("error");
                });

                databaseUser.getBackCatalog(body.id_catalog, eventBackCatalog);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});


router.post('/saveAlghoritm', function(req, res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body);
                var eventSaveAlghoritm = new events.EventEmitter();
                eventSaveAlghoritm.on( "ok", function(){
                    console.log('Алгоритм  сохранен');
                    res.statusCode = 200;
                    res.end("ok");
                });
                eventSaveAlghoritm.on( "error", function(){
                    console.log('Алгоритм не сохранен');
                    res.statusCode = 400;
                    res.end("error");
                });

                databaseUser.saveAlghoritm(body, eventSaveAlghoritm);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/getDataAlghoritm', function (req,res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body);
                var eventGetDataAlghoritm = new events.EventEmitter();
                eventGetDataAlghoritm.on( "ok", function(formula,list_identificators){
                    console.log('Данные алгоритма '+body.id_alghoritm+' успешно отправлены на клиент');
                    res.statusCode = 200;
                    res.end(JSON.stringify({formula:formula, list_indetificators:list_identificators}));
                });
                eventGetDataAlghoritm.on( "error", function(){
                    console.log('Данные алгоритма+'+body.id_alghoritm+'+не отправлены из-за ошибки');
                    res.statusCode = 400;
                    res.end("ok");
                });

                databaseUser.getDataAlghoritm(body, eventGetDataAlghoritm);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});


router.post('/deleteAlghoritm', function (req,res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                console.log(body);
                var eventDeleteAlghoritm = new events.EventEmitter();
                eventDeleteAlghoritm.on( "ok", function(){
                    console.log('Алгоритм '+body.id_alghoritm+' успешно удален со своими данными');
                    res.statusCode = 200;
                    res.end("ok");
                });
                eventDeleteAlghoritm.on( "error", function(){
                    console.log('Алгоритм '+body.id_alghoritm+'+ и его данные не удалены из-за ошибки');
                    res.statusCode = 400;
                    res.end("ok");
                });

                databaseUser.deleteAlghoritm(body, eventDeleteAlghoritm);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

router.post('/get_idetificators', function (req, res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
            try {
                body = JSON.parse(body);
                var eventGetIdentificators = new events.EventEmitter();
                eventGetIdentificators.on( "ok", function(arrayIdentificators, formula){
                    console.log('Алгоритм '+body.id_alghoritm+' успешно удален со своими данными');
                    res.statusCode = 200;
                    res.end(JSON.stringify({formula:formula, arrayIdentificators:arrayIdentificators}));
                });
                eventGetIdentificators.on( "error", function(){
                    console.log('Алгоритм '+body.id_alghoritm+'+ и его данные не удалены из-за ошибки');
                    res.statusCode = 400;
                    res.end("ok");
                });

                databaseUser.getIdentificators(body, eventGetIdentificators);

            } catch (e){
                var err = new Error('Post Error');
                console.error('Error - Post ');
                err.status = 500;
                next(err);
            }
        })
});

//Дописать проверку на присутсвия 1 равно в конце + убрать все пробелы.
router.post('/calculate', function (req, res,next){
    var body = '';
    req.on('readable', function(){
        body += req.read();
    })
        .on('end', function(){
                body = JSON.parse(body);
                parser.results(body.formula,res);
        })
});
module.exports = router;