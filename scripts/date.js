var makeDate = function() {
    var d = new Date();
    var formatDate = "";

    //using native js
    formatDate += (d.getMonth() + 1) + "_";
    formatDate += d.getDate() + "_";
    formatDate += d.getFullYear();

    return formatDate;
}

module.exports = makeDate;