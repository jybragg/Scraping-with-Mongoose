var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/scrape");

var Article = require("../models/Article");

//functionality exported
module.exports = {

    //run scrape function
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            //Mongo code
            Article.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    //delete function
    delete: function (query, cb) {
        Article.remove(query, cb);
    },

    get: function (query, cb) {
        Article.find(query)
            //sort most recent to least recent
            .sort({ _id: -1 })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Article.update({ _id: query._id }, { $set: query }, {}, cb);
    }
}