console.log("index.js is connected")

$(document).ready(function () {
    //Reference to div that will populate the articles
    var articleContainer = $(".article-container");
    //Event listeners to dynamically populated buttons
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    //Once page is Ready Run this function
    initPage();

    function initPage() {

        articleContainer.empty();
        $.get("/api/articles?saved=false")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        //Empty array for panels to be pushed into
        var articlePanels = [];

        for (var i = 0; articles.legnth; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);
    }

    function createPanel(article) {

        var panel =
            $(["<div class = 'panel panel default'>",
                "<div class= 'panel-heading'>",
                "<h3>",
                article.title,
                "<a class = 'btn btn-primary save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class = 'panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));

        panel.date("_id", article._id);

        return panel;
    }

    function renderEmpty() {

        var emptyAlert =
            $(["<div class = 'alert alert-warning text-center'>",
                "<h4>There are no new articles today. Check back tomorrow!</h4>",
                "</div>",
                "<div class = 'paanel panel-default'>",
                "<div class = 'panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class = 'panel-body text-center'>",
                "<h4><a class = 'scrape-new'>Scrape New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {

        var articleToSave = $(this).parents(".panel").date();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            date: articleToSave
        })
            .then(function (data) {
                if (data.ok) {
                    initPage();
                }
            })
    }

    function handleArticleScrape() {

        $.get("/api/fetch")
        .then(function(data) {
            initPage();
            bootbox.alert("<h3 class = 'text-center m-top-80'>" + data.message +"</h3>");
        });
    }
});