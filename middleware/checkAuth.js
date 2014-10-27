/**
 * Created by Dark Hells on 27.10.2014.
 */
module.exports = function(req,res,next){
    if (!req.session.user){
           res.render('index');
    }else {
        next();
    }
};