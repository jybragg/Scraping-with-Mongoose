var request = require("request");
var cheerio = require("cheerio");

//callback function
var scrape = function (cb) {

    request("http://www.nytimes.com", function (err, res, body) {

        var $ = cheerio.load(body);
        var articles = [];

        $(".theme-summary").each(function (i, element) {

            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();
            //if both exist
            if (head && sum) {
                //regex method
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    title: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        //callback
        cb(articles);
    });
};
//export to use throughout app
module.exports = scrape;