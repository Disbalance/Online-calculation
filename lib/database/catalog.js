// получение списка доступных каталогов
exports.get_catalog = function (id_user, eventGetListCatalog) {
    eventGetListCatalog.emit('ok');
}

// получение файлов каталога
exports.get_catalog = function (id_catalog, eventGetCatalog) {
    console.log(id_catalog);
    var arrayCatalog;
    var arrayAlgorithms;

    if (id_catalog == 0) {
        arrayCatalog = [ {name: "Test", id: 15}, {name: "Test 1", id: 15}, {name: "Test 2", id: 15} ];
        arrayAlgorithms = [ {name: "Алгоритм 1", id: 10}, {name: "Алгоритм 2", id: 10}, {name: "Алгоритм 3", id: 10} ];
    }
    if (id_catalog == 1) {
        arrayCatalog = [ {name: "Test 3", id: 15}, {name: "Test 4", id: 15} ];
        arrayAlgorithms = [ {name: "Алгоритм 4", id: 10}, {name: "Алгоритм 5", id: 10}, {name: "Алгоритм 6", id: 10} ];
    }
    if (id_catalog == 2) {
        arrayCatalog = [ {name: "Test 5", id: 15}, {name: "Test 6", id: 15}, {name: "Test 7", id: 15}, {name: "Test 8", id: 15} ];
        arrayAlgorithms = [ {name: "Алгоритм 7", id: 10}, {name: "Алгоритм 8", id: 10}, {name: "Алгоритм 9", id: 10} ];
    }

    eventGetCatalog.emit( 'ok' , arrayCatalog, arrayAlgorithms );
}