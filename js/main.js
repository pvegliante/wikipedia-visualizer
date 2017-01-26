$(document).ready(function() {

    // complete the following function
    function getArticles(searchTerm) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + searchTerm,
            // Notice that the dataType is jsonp
            dataType: "jsonp",
            method: 'get',
            success: function(response) {
                console.log(response);

                $('#articlesContainer').html('');

                for (var i = 0; i < response.query.search.length; i++) {
                    var title = response.query.search[i].title;
                    var snippet = response.query.search[i].snippet;
                    var article = articleMaker(title, snippet);
                    $("#articlesContainer").append(article)
                };
                // use the articleMaker function somewhere in here and then
                // append each article to the DOM using jquery's .append() method
                // append only one time, if you can figure out how. The less DOM
                // manipulation, the better
            }
        });
    }

    function articleMaker(title, snippet) {
        // create a string called article and write HTML elements inside of it,
        // similar to this:
        var article = "";
        article += '<a href="https://wikipedia.org/wiki/' + title + '" target="_blank rel="noopener"">';
        article += '<div class="article">';
        article += '<h3>' + title + '</h3>';
        article += '<p>' + snippet + '</p>';
        article += '</div>';
        article += '</a>';

        // IMPORTANT: make sure each article can be clicked on and takes you to the
        // wikipedia page of that article

        // Lastly, return the article string, which will be used in the success
        // function of your $.ajax get request
        return article;
    }

    // When click on "search" button, run the getArticles function and pass in
    // the value of the search box as a parameter to the getArticles function
    $('#searchButton').on("click", function() {
        // code here
        var searchTerm = $('#searchBox').val();
        getArticles(searchTerm);
    });

    // BONUS: delete the searchButton element and it's code above, and do the
    // code below instead.

    // When focused on the search box and the enter/return button is pressed,
    // get the articles and pass the value of the search box to your getArticles
    // function
    $("#searchBox").on("keypress", function(event) {
        // code here
        if (event.keyCode === 13) {
            var searchTerm = $('#searchBox').val();
            getArticles(searchTerm);
        };

        // var searchTerm = $('#searchBox').val();
        // getArticles(searchTerm);
    });
});
