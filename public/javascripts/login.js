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

function withoutCyr(input) {
    var value = input.value;
    var re = /а|б|в|г|д|е|ё|ж|з|и|ё|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|ъ|ы|ь|э|ю|я/gi;
    if (re.test(value)) {
        value = value.replace(re, '');
        input.value = value;
    }
}

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
