/**
 * Created by Frostix on 27.10.2014.
 */
var id_catalog;

window.onload = function () {
    get_directory(1);
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

function test_catalog( id ){
    alert("Test catalog "+id);
}

function test_alg( id ){
    alert("Test alg "+id);
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
            alert(xhr.responseText);
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

function test(elm, num){
    get_directory(num);
    clear();
    elm.className = "directory-on";
}

function clear(){
    var array = document.getElementById('list_catalog').getElementsByTagName('div');
    for (var i=0; i<array.length; i++){
        array[i].className = "directory-link";
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
}