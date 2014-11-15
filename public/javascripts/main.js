/**
 * Created by Frostix on 27.10.2014.
 */
var id_catalog;
var this_catalog;



window.onload = function () {
    get_list_directory();
};

function add_alghoritm(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addAlghoritm', true);
    var nameAlghoritm = document.getElementById("nameAlghoritm").value;
    if (nameAlghoritm == '') {
        alert("Заполните поле");
        return;
    }
    xhr.send(JSON.stringify({nameAlghoritm: nameAlghoritm, id_catalog:id_catalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                get_directory(id_catalog);
                document.location.href = location.href='#close';
                document.getElementById("nameAlghoritm").value = "";
            }
        }
    };
};

function add_catalog(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addCatalog', true);
    var nameCatalog = document.getElementById("nameCatalog").value;
    if (nameCatalog == '') {
        alert("Заполните поле");
        return;
    }
    xhr.send(JSON.stringify({nameCatalog: nameCatalog, id_pred:id_catalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                get_directory(id_catalog);
                document.location.href = location.href='#close';
                document.getElementById("nameCatalog").value = "";
            }
        }
    };
}

function test_alg( id ){
    alert("Test alg "+id);
}

function check_nav(){
    if (this_catalog == 'Root') {
        navication_active();
    }else{
        navication_deactive();
    }
}

function get_directory(id_directory) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/get_catalog", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState != 4) return;
        clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
        if (xhr.status == 200) {// Все ок
            var arrayCatalog = JSON.parse(xhr.responseText).data_catalog;
            var arrayAlgorithms = JSON.parse(xhr.responseText).data_algorithms;

            check_nav();

            var list = document.getElementById('catalog');
            list.innerHTML = "";
            for (var i=0; i<arrayCatalog.length; i++){
                var container = document.createElement('div');
                container.setAttribute('onclick', 'get_directory('+arrayCatalog[i].id+')');
                container.className = "catalog";
                container.innerHTML = '<span>'+arrayCatalog[i].name+'</span>';
                list.appendChild(container);
            }

            for (var i=0; i<arrayAlgorithms.length; i++){
                var container = document.createElement('div');
                container.setAttribute('onclick', 'test_alg('+arrayAlgorithms[i].id+')');
                container.className = "algorithms";
                container.innerHTML = '<span>'+arrayAlgorithms[i].name+'</span>';
                list.appendChild(container);
            }
            id_catalog = id_directory;

        } else {
            handleError(xhr.statusText); // вызвать обработчик ошибки с текстом ответа
        }
    };
    xhr.send(JSON.stringify({id_directory: id_directory}));
    var timeout = setTimeout( function(){ xhr.abort(); handleError("Time over") }, 15000);  // Таймаут 15 секунд
    function handleError(message) {
        alert("Ошибка: "+message);
    }
}
function get_list_directory() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/get_list_catalog", true);
    xhr.onreadystatechange=function(){
        if (xhr.readyState != 4) return;
        clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
        if (xhr.status == 200) {// Все ок
            id_catalog = JSON.parse(xhr.responseText).root;
            var arrayCatalog = JSON.parse(xhr.responseText).arrayCatalog;
            var list = document.getElementById('list_catalog');
            list.innerHTML = "<a id='update' href='#' onclick='get_list_directory()'>Обновить</a><br><br>";
            this_catalog = "Root";
            var container = document.createElement('div');
            container.setAttribute('onclick', 'loadCatalog(this, '+id_catalog+')');
            container.setAttribute('id', 'Root');
            container.className = "directory-on";
            container.innerHTML = '<span>Root</span>';
            list.appendChild(container);

            for (i=0; i<arrayCatalog.length; i++){
                var container = document.createElement('div');
                container.setAttribute('onclick', 'loadCatalog(this, '+arrayCatalog[i].id_catalog+')');
                container.setAttribute('id', arrayCatalog[i].name);
                container.className = "directory-link";
                container.innerHTML = '<span>'+arrayCatalog[i].name+'</span>';
                list.appendChild(container);
            }
            get_directory(id_catalog);
         } else {
            handleError(xhr.statusText); // вызвать обработчик ошибки с текстом ответа
        }
    };
    xhr.send(JSON.stringify({}));
    var timeout = setTimeout( function(){ xhr.abort(); handleError("Time over") }, 15000);  // Таймаут 15 секунд
    function handleError(message) {
        alert("Ошибка: "+message);
    }
}

function refresh(){
    get_directory(id_catalog);
    alert(id_catalog);
}

function loadCatalog(elm, num){
    get_directory(num);
    clear();
    elm.className = "directory-on";
    this_catalog = elm.id;
}

function clear(){
    var array = document.getElementById('list_catalog').getElementsByTagName('div');
    for (var i=0; i<array.length; i++){
        array[i].className = "directory-link";
    }
}

function deleteAccessUser(elm){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/delete_access_user", true);
    xhr.send(JSON.stringify({name: elm.id, id_catalog: id_catalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
            } else{
                handleError(xhr.statusText); // вызвать обработчик ошибки с текстом ответа
            }
        }
        getListAccessUser();
    };
    xhr.send(JSON.stringify({}));
    var timeout = setTimeout(function () {
        xhr.abort();
        handleError("Time over")
    }, 15000);  // Таймаут 15 секунд
    function handleError(message) {
        alert("Ошибка: " + message);
    }
}

function getListAccessUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/get_list_access_users", true);
    xhr.send(JSON.stringify({id_catalog: id_catalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
        if (xhr.status == 200) {// Все ок
            var arrayUsers = JSON.parse(xhr.responseText).arrayUsers;
            var list = document.getElementsByClassName('ul_list_user');
            list[0].innerHTML = "";

             for (i=0; i<arrayUsers.length; i++){
             var container = document.createElement('li');
             container.className = "li_list_user";
             container.innerHTML = '<span>'+arrayUsers[i].user+'</span>'+'<span id='+arrayUsers[i].user+' onclick=deleteAccessUser(this) class="del_user">x</span>';
             list[0].appendChild(container);
             }
             get_directory(id_catalog);
             } else {
             handleError(xhr.statusText); // вызвать обработчик ошибки с текстом ответа
             }
             };
            xhr.send(JSON.stringify({}));
            var timeout = setTimeout(function () {
                xhr.abort();
                handleError("Time over")
            }, 15000);  // Таймаут 15 секунд
            function handleError(message) {
                alert("Ошибка: " + message);
            }
    }

function addUserAccess() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add_access_user", true);
    var name = document.getElementById("nameUser").value;
    if (name == '') {
        alert("Заполните поле 'Имя пользователя'");
        return;
    }
    xhr.send(JSON.stringify({name: name, id_catalog: id_catalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
            } else {
                if (xhr.status == 205) {
                    alert('Ошибка добавления доступа пользователю ' + name + '. Проверьте имя или доступ уже был открыт ранее.');
                } else {
                    handleError(xhr.statusText); // вызвать обработчик ошибки с текстом ответа
                }
            }
        }
        getListAccessUser();
    };
        xhr.send(JSON.stringify({}));
        var timeout = setTimeout(function () {
            xhr.abort();
            handleError("Time over")
        }, 15000);  // Таймаут 15 секунд
        function handleError(message) {
            alert("Ошибка: " + message);
        }
}


function win1(){
    document.location.href = "#win1";
}

function win2(){
    document.location.href = "#win2";
}

function win3(){
    document.location.href = "#win3";
    getListAccessUser();
}

function navication_active(){
    var list = document.getElementsByClassName('nav_ul');
    list[0].innerHTML = "";
    var container = document.createElement('li');
    container.setAttribute('onclick', 'win1()');
    container.className = "li_nav";
    container.innerHTML = '<span>Создать алгоритм</span>';
    list[0].appendChild(container);
    var container = document.createElement('li');
    container.setAttribute('onclick', 'win2()');
    container.className = "li_nav";
    container.innerHTML = '<span>Создать каталог</span>';
    list[0].appendChild(container);
    var container = document.createElement('li');
    container.setAttribute('onclick', 'win3()');
    container.className = "li_nav";
    container.innerHTML = '<span>Права доступа к каталогу</span>';
    list[0].appendChild(container);
}

function navication_deactive(){
    var list = document.getElementsByClassName('nav_ul');
    list[0].innerHTML = "";
    var container = document.createElement('li');
    container.setAttribute('onclick', '');
    container.className = "li_nav_dec";
    container.innerHTML = '<span>Создать алгоритм</span>';
    list[0].appendChild(container);
    var container = document.createElement('li');
    container.setAttribute('onclick', '');
    container.className = "li_nav_dec";
    container.innerHTML = '<span>Создать каталог</span>';
    list[0].appendChild(container);
    var container = document.createElement('li');
    container.setAttribute('onclick', '');
    container.className = "li_nav_dec";
    container.innerHTML = '<span>Права доступа к каталогу</span>';
    list[0].appendChild(container);
}