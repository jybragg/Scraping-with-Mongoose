module.exports = function(router) {

    router.get("/", function(req,res){
        res.render("index");
    });

    router.get("/saved", function (res, req) {
        res.render ("saved");
    });
}