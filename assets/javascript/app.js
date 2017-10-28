$( window ).on( "load", function() {

var athletes = ["Aaron Rodgers", "Jordy Nelson", "Mike Ditka", "Randy Moss", "Alex Smith", "Clay Matthews", "Tony Romo", "Tom Brady", "Ron Gronkowski", "JJ Watt"];
console.log(athletes);


function renderButtons() {

	$("#header").empty();

	for (var i = 0; i < athletes.length; i++) {
		var btn = $("<button>")
			.addClass("btn btn-primary")
			.addClass("athlete")
			.attr("data-person", athletes[i])
			.text(athletes[i]);
			$("#header").append(btn);
	}
};

renderButtons();

$(".add-name").on("click", function(event) {
	event.preventDefault();
	var athlete = $("#athlete-input").val().trim();
	athletes.push(athlete);
	renderButtons();
});

function displayAthlete() {

	var athlete = $(this).attr("data-person");
	var queryURL =  "https://api.giphy.com/v1/gifs/search?api_key=870e05608b1f4f57906edb3144c445bc&q=" + athlete + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text(rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#container").prepend(gifDiv);

                var animate = results[i].images.fixed_height.url;
               
                var still = results[i].images.fixed_height_still.url;
        
                var gifImage = $("<img>");
                gifImage.attr("src", still);
                gifImage.attr("alt", "gif image");
                gifImage.addClass("gif");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", still);
                gifImage.attr("data-animate", animate)
                $("#gifs-here").append(gifImage);
                var imgRating = results[i].rating;
                var caption = $("<p>");
                caption.text("Rating: " + imgRating);
                $("#gifs-here").append(caption);
        }
    });
	}

 $(".athlete").on("click", function(gifs){
        displayAthlete();
      })







})