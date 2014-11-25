/**
 * Created by Dark Hells on 26.10.2014.
 */
/*--- MySQL Database----*/
var mysql = require('mysql');
var events = require('events');
var database = require('./databaseUser');
var logger = require('morgan');

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
        connection.query('SELECT login FROM users WHERE login ='+"'"+login+"'", check);
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
    var id_user;
    var eventCheckLogin = new events.EventEmitter();
    eventCheckLogin.on('ok',function(){
        console.log('Данный логин '+data.login+' свободен');
        var temp = {name:data.login, id_pred:0};
        var eventAddCatalog = new events.EventEmitter();
        eventAddCatalog.on('add',function(id_catalog){
            console.log('Корневой каталог '+data.login+'успешно добавлен в базу данных');
            var user = {login: data.login, password:data.password, id_catalog:id_catalog};
            insert_user(user);
        });
        eventAddCatalog.on('error',function(){
            console.log('Ошибка при добавлении корневого каталога '+data.login+' в базу данных');
            eventAddUser.emit("error");
            return;
        });
        database.addCatalog(temp,eventAddCatalog);
    });
    eventCheckLogin.on('error',function(){
        console.log('Данный логин '+data.login+' зарегистрирован в базе данных');
        eventAddUser.emit("error");
        return;
    })

    database.check_login(data.login,eventCheckLogin);
    function insert_user(user) {
        connection.query('INSERT INTO users SET ?', user, finish);
    }
    function finish(err, result) {
      if(err) {
             eventAddUser.emit("error");
      }
        id_user = result.insertId;
        console.log(id_user);
        eventAddUser.emit('add',id_user);
    }
};

exports.login_user = function(user, eventLoginUser){
    var login = user.login;
    var password = user.password;
    var id_user = 0;
    check_login(login);
    function check_login(login){
        connection.query('SELECT login,id FROM users WHERE login ='+"'"+login+"'", select_password);
    }
    function select_password(err, result){
        if ((err) || (result.length == 0)) {
            eventLoginUser.emit('error');
            return;
        }
       id_user = result[0].id;
        connection.query('SELECT password FROM users WHERE login ='+"'"+login+"'", finish);
    }
    function finish(err, result){
        if ((err) || (result.length == 0)){
            eventLoginUser.emit('error');
            return;
        }
        if (password == result[0].password) {
            eventLoginUser.emit('ok',id_user);
        }else{
            eventLoginUser.emit('error');
        }
    }
};

exports.addCatalog = function (data, eventAddCatalog){
    var id_catalog;
    addCatalog(data);
    function addCatalog(data){
        connection.query('INSERT INTO catalogs SET ?', data, finish);
    };
    function finish(err, result){
        console.log(err);
        console.log(result);
        if(err) {
            eventAddCatalog.emit("error");
            return;
        }
        id_catalog = result.insertId;
        eventAddCatalog.emit('add',id_catalog);
    }
};


exports.addAlghoritm = function (data, eventAddAlghoritm){
    addAlghoritm(data);
    function addAlghoritm(data){
        connection.query('INSERT INTO alghoritms SET ?', data, finish);
    };
    function finish(err, result){
        console.log(err);
        if(err) {
            eventAddAlghoritm.emit("error");
            return;
        }
        eventAddAlghoritm.emit('ok');
    }
};

exports.getAlghoritm = function (id_catalog, eventGetAlghoritm){
    var arrayAlghoritms = [];
    getAlghoritm(id_catalog);
    function getAlghoritm(id_catalog){
        connection.query('SELECT * FROM alghoritms WHERE id_catalog ='+id_catalog, finish);
    }
    function finish(err,result){
         if (err){
            eventGetAlghoritm.emit('error');
            return;
        }
        for(i = 0; i<result.length;i++){
            arrayAlghoritms[i] = {name:result[i].name, id: result[i].id};
        }
        eventGetAlghoritm.emit('ok', arrayAlghoritms);
    };
};

exports.getCatalog = function(id_catalog, eventGetCatalog){
    getCatalog(id_catalog);
    var arrayCatalog  = [];
    function getCatalog(id_catalog){
        connection.query('SELECT * FROM catalogs WHERE id_pred ='+id_catalog, finish);
    }
    function finish(err, result){
        if (err){
            eventGetCatalog.emit('error');
            return;
        }
        for(i = 0; i<result.length;i++){
            arrayCatalog[i] = {name:result[i].name, id: result[i].id};
        }
        var eventGetAlghoritm = new events.EventEmitter();
        eventGetAlghoritm.on( "ok", function(arrayAlghoritms){
            eventGetCatalog.emit('ok', arrayCatalog, arrayAlghoritms);
            return;
        });
        eventGetAlghoritm.on( 'error', function(){
            eventGetCatalog.emit('error');
            return;
        });
        database.getAlghoritm(id_catalog,eventGetAlghoritm);
    };

};

exports.getListCatalog = function(id_user,eventGetListCatalog){
    var id_catalog;
    getCatalogUser(id_user);
    function getCatalogUser(id_user){
      connection.query('SELECT id_catalog FROM users WHERE id = '+id_user, get_list_catalog);
    };

    function get_list_catalog(err, result){
        if(err || result.length == 0){
            eventGetListCatalog.emit('error');
            return;
        }
        id_catalog = result[0].id_catalog;
        connection.query('SELECT name,id_catalog FROM access INNER JOIN catalogs on access.id_catalog = catalogs.id WHERE access.id_user = '+id_user, finish);
    };

    function finish(err, result){
        if(err){
            eventGetListCatalog.emit('error');
            return;
        }
        var arrayCatalog = result;
       console.log(result);
        eventGetListCatalog.emit('ok', id_catalog, arrayCatalog); //число,
    }
};

exports.getListAccessUsers = function(id_catalog, getListAccessUsers){
    var arrayUsers = [];
   getListUser(id_catalog);
   function getListUser(id_catalog){
        connection.query('SELECT login FROM access INNER JOIN users on access.id_user = users.id WHERE access.id_catalog ='+id_catalog, finish);
    };
    function finish(err, result){
        if(err){
            getListAccessUsers.emit("error");
            return;
        };

        for(i=0;i<result.length;i++){
            arrayUsers[i] = {user: result[i].login};
        }
        getListAccessUsers.emit("ok",arrayUsers);
    }
};

exports.addAccessUser = function(data,addAccessUser){
    var id_user;
    var name = data.name
    check_login(name);
    function check_login(name){
        connection.query('SELECT id FROM users WHERE login ='+'"'+name+'"', checkDuplicate);
    }

    function checkDuplicate(err, result){
        console.log(err);
        if(err || result.length ==0){
            addAccessUser.emit("error");
            return;
        }

        id_user = result[0].id;

        if (data.id_call == id_user){
              addAccessUser.emit("error");
            return;
        }

        connection.query('SELECT * FROM access WHERE id_user = '+id_user+' AND id_catalog ='+data.id_catalog, addUser);
    }

    function addUser(err, result){
        console.log(err);
        if(err || result.length !=0){
            addAccessUser.emit("error");
            return;
        }
        var value = {id_user: id_user, id_catalog: data.id_catalog};
        connection.query('INSERT INTO access SET ?',value, finish);
    }

    function finish(err, result){
        console.log(err);
        if(err){
            addAccessUser.emit("error");
            return;
        }
        addAccessUser.emit("ok");
    }
};

exports.deleteAccessUser = function(data,deleteAccessUser){
    var id_user;
    var name = '"'+data.name+'"';
    check_login(name);
    function check_login(name){
        connection.query('SELECT id FROM users WHERE login ='+name, checkAccess);
    }

    function checkAccess(err, result){
        console.log(err);
        if(err || result.length ==0){
            deleteAccessUser.emit("error");
            return;
        }

        id_user = result[0].id;

        connection.query('SELECT * FROM access WHERE id_user = '+id_user+' AND id_catalog ='+data.id_catalog, deleteUser);
    }

    function deleteUser(err, result){
        console.log(err);
        if(err || result.length ==0){
            deleteAccessUser.emit("error");
            return;
        }
        connection.query('DELETE FROM access WHERE id_user = '+id_user+' AND id_catalog = '+data.id_catalog, finish);
    }

    function finish(err, result){
        console.log(err);
        if(err){
            deleteAccessUser.emit("error");
            return;
        }
        deleteAccessUser.emit("ok");
    }
};

exports.getBackCatalog = function(id_catalog, eventBackCatalog){
    getPredCatalog(id_catalog);
    function getPredCatalog(id_catalog){
       connection.query('SELECT id_pred FROM catalogs WHERE id = '+id_catalog, finish);
    }

    function finish(err,result){
        console.log(err);
        console.log(result);
        if(err || result.length  == 0){
            eventBackCatalog.emit("error");
            return;
        }
        eventBackCatalog.emit("ok", result[0].id_pred);
    }
};

exports.saveAlghoritm = function(body, eventSaveAlghoritm){
    var data = body;
    check_edit(data);
    function check_edit(data){
        connection.query('SELECT id_alghoritm FROM text_alghoritms WHERE id_alghoritm = '+data.id_alghoritm, check);
    }
    function check(err, result){
        if (err || result.length==0){
            console.log(err);
            saveAlghoritm(data);
        }else{
          editAlghoritm(data);
        }
    }
    function saveAlghoritm(data){
        connection.query('INSERT INTO text_alghoritms SET ?', data, finish);
    }
    function editAlghoritm(data){
        connection.query('DELETE FROM text_alghoritms WHERE id_alghoritm = '+data.id_alghoritm, addAlghoritm);
    }
    function addAlghoritm(err, result){
        if (err){
            eventSaveAlghoritm.emit('error');
            return;
        }
        connection.query('INSERT INTO text_alghoritms SET ?', data, finish)
    }
    function finish(err, result){
        if (err){
            eventSaveAlghoritm.emit('error');
            return;
        }
        eventSaveAlghoritm.emit("ok");
    }
};

exports.getDataAlghoritm = function (data, eventGetDataAlghoritm){
  var list_identificators = "";
  var formula = "";
    get_data(data);
    function get_data(data){
        connection.query("SELECT * FROM text_alghoritms WHERE id_alghoritm = "+data.id_alghoritm, finish);
    }
    function finish(err, result) {
        if (err) {
            eventGetDataAlghoritm.emit("error");
            return;
        }
        if(result.length !=0) {
            formula = result[0].formula;
            list_identificators = result[0].list_indetificators;
        }
         eventGetDataAlghoritm.emit("ok", formula, list_identificators);
    }
};

exports.deleteAlghoritm = function (data, eventDeleteAlghoritm){
    var id = data.id_alghoritm;
    delete_alghoritm(id);
    function delete_alghoritm(id){
        connection.query('DELETE FROM alghoritms WHERE id = '+id, delete_data);
    }
    function delete_data(err, result){
        if (err){
            eventDeleteAlghoritm.emit("error");
            return;
        }
        connection.query('DELETE FROM text_alghoritms WHERE id_alghoritm = '+id, finish);
    }
    function finish(err, result){
        if (err){
            eventDeleteAlghoritm.emit("error");
            return;
        }
        eventDeleteAlghoritm.emit("ok");
    }

};


