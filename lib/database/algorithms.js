var numOpn = numCls = 0, vld = frst = false;
var str;
exports.results = function(term,res){
        str = term;
        tstPar (0);
        res.statusCode = 200;
        try {
            if (eval(str.slice(0,-1))!=NaN) {
                res.end(JSON.stringify({result: "Вычислено: " + eval(str.slice(0, -1))}));
            }else{
                res.statusCode = 200;
                res.end(JSON.stringify({result:"Ошибка в выражении или входных данных. Проверьте содержимое и попробуйте снова."}));
            }
          }catch (e){
            res.statusCode = 200;
            res.end(JSON.stringify({result:"Ошибка в выражении или входных данных. Проверьте содержимое и попробуйте снова."}));
        }

};

function tstPar (index)
{
    var opn = str.indexOf ('(', index),
        cls = str.indexOf (')', index);
    if (opn == -1 && cls == -1) {vld = numOpn == numCls; return}

    if (opn != -1 && opn < cls)
    {
        if (opn != 0 && !((/[\+\-\*\/\(]/ ).test (str.charAt (opn - 1)))) return;
        if (!((/[\-\(\d]/ ).test (str.charAt (opn + 1)))) return;
        frst = true; numOpn++; index = opn;
    }
    else
    {
        if (cls != 0 && !((/[\)\d]/ ).test (str.charAt (cls - 1)))) return;
        if (!((/[\+\-\*\/\)\=]/).test (str.charAt (cls + 1)))) return;
        if (!frst) return;
        numCls++; index = cls;
    }
    tstPar (index + 1);
}

