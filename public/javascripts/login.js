/**
 * Created by Dark Hells on 26.10.2014.
 */
function registration() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/registration', true);
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var password_repeat = document.getElementById("password_repeat").value;
    if (login == '') {
        alert("Заполните поле 'логин'");
        return;
    }
    if (password == '') {
        alert("Заполните поле 'пароль'");
        return;
    }
    if (password_repeat == '') {
        alert("Заполните поле 'повторите пароль'");
        return;
    }
    if (check_password(password, password_repeat)){
    xhr.send(JSON.stringify({login: login, password: password}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.location.href = location.href='algorithms';
            }
            if (xhr.status == 406) {
                alert("Данный логин занят");
            }
        }
    };
} else {
      alert("Проверьте пароль, возможно они различны");
    }
}

function check_password(password, password_repeat){
    if(password == password_repeat) return 1;
    else return 0;
}

function withoutCyr(obj) {
    if (/^[a-zA-Z0-9 ,.\-:"()]*?$/.test(obj.value))
        obj.defaultValue = obj.value;
    else
        obj.value = obj.defaultValue;
};

function authorization(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/authorization', true);
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    if (login == '') {
        alert("Заполните поле 'логин'");
        return;
    }
    if (password == '') {
        alert("Заполните поле 'пароль'");
        return;
    }
    xhr.send(JSON.stringify({login: login, password: password}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.location.href = location.href='algorithms';
            }
            if (xhr.status == 405) {
                alert("Логин или пароль неверны");
            }
        }
    };
}
