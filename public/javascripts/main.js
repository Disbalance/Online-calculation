/**
 * Created by Frostix on 27.10.2014.
 */
function add_name_alghoritm(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addNameAlghoritm', true);
    var nameAlghoritm = document.getElementById("nameAlghoritm").value;
    if (nameAlghoritm == '') {
        alert("Заполните поле");
        return;
    }
    xhr.send(JSON.stringify({nameAlghoritm: nameAlghoritm}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("OK, Add Alghoritm");
                document.location.href = location.href='algorithms';
            }
        }
    };
};

function add_name_catalog(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addNameCatalog', true);
    var nameCatalog = document.getElementById("nameCatalog").value;
    if (nameCatalog == '') {
        alert("Заполните поле");
        return;
    }
    xhr.send(JSON.stringify({nameCatalog: nameCatalog}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("OK, Add Catalog");
                document.location.href = location.href='algorithms';
            }
        }
    };
}