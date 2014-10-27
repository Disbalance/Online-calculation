/**
 * Created by Dark Hells on 26.10.2014.
 */
/*--- MySQL Database----*/
var mysql = require('mysql');
var events = require('events');
var database = require('./databaseUser');
var connection;
exports.createConnection = function () {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '00291256',
        database: 'test'
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            require('./databaseUser').createConnection();
        } else {
            throw err;
        }
    });
};

exports.check_login = function (login, eventCheckLogin){
    check_login(login);
    function check_login(login){
        connection.query('SELECT login FROM users WHERE login ='+login, check);
    }
    function check(err,result) {
        if (err){
            eventCheckLogin.emit("error");
            return;
        }
        if (result.length == 0){
            eventCheckLogin.emit("ok");
        }else{
            eventCheckLogin.emit("error");
        }
    }
};

exports.add_user = function (data, eventAddUser) {
    var login = "'"+data.login+"'";
    console.log(login);
    var eventCheckLogin = new events.EventEmitter();
    eventCheckLogin.on('ok',function(){
        var temp = {name:'root'};
        var eventAddCatalog = new events.EventEmitter();
        eventAddCatalog.on('add',function(id_catalog){
            var user = {login: data.login, password:data.password, id_catalog:id_catalog};
            console.log(user);
            insert_user(user);
        });
        eventAddCatalog.on('error',function(){
            eventAddUser.emit("error");
            return;
        });
        database.addCatalog(temp,eventAddCatalog);
    });
    eventCheckLogin.on('error',function(){
        eventAddUser.emit("error");
        return;
    })

    database.check_login(login,eventCheckLogin);
    function insert_user(user) {
        connection.query('INSERT INTO users SET ?', user, finish);
    }
    function finish(err, result) {
      if(err) {
             eventAddUser.emit("error");
      }
        eventAddUser.emit('add');
    }
};

exports.login_user = function(user, eventLoginUser){
    var login = '"'+user.login+'"';
    var password = user.password;
    check_login(login);
    function check_login(login){
        connection.query('SELECT login FROM users WHERE login ='+login, select_password);
    }
    function select_password(err, result){
        if (err) {
            eventLoginUser.emit('error');
        }
        connection.query('SELECT password FROM users WHERE login ='+login, finish);
    }
    function finish(err, result){
        console.log(result);
        console.log(err);
        if ((err) || (result.length == 0)){
            eventLoginUser.emit('error');
            return;
        }
        if (password == result[0].password) {
            eventLoginUser.emit('ok');
        }else{
            eventLoginUser.emit('error');
        }
    }
};

exports.addCatalog = function (data, eventAddCatalog){
    var id_catalog;
    var name = data.name;
        if (name=='root'){
            addCatalogRoot();
        }else{
            addCatalog(data);
        }
    function addCatalogRoot(){;
        data = {name:'root', id_pred: 0};
        connection.query('INSERT INTO catalogs SET ?', data, finish);
    };
    function addCatalog(data){;
        connection.query('INSERT INTO catalogs SET ?', data, finish);
    };
    function finish(err, result){
        if(err) {
            eventAddCatalog.emit("error");
            return;
        }
        id_catalog = result.insertId;
        eventAddCatalog.emit('add',id_catalog);
    }
};
