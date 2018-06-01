// Grab the articles as a json
// @ts-ignore
$.getJSON("/articles", function (data) {
	// For each one
	for (var i = 0; i < data.length; i++) {
		// Display the information on the page
		// @ts-ignore
		$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
	}
});


// Whenever someone clicks a p tag
// @ts-ignore
$(document).on("click", "p", function () {
	// Empty the notes from the note section
	// @ts-ignore
	$("#notes").empty();
	// Save the id from the p tag
	// @ts-ignore
	var thisId = $(this).attr("data-id");

	// Now make an ajax call for the Article
	// @ts-ignore
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
		// With that done, add the note information to the page
		.then(function (data) {
			console.log(data);
			// The title of the article
			// @ts-ignore
			$("#notes").append("<h2>" + data.title + "</h2>");
			// An input to enter a new title
			// @ts-ignore
			$("#notes").append("<input id='titleinput' name='title' >");
			// A textarea to add a new note body
			// @ts-ignore
			$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
			// A button to submit a new note, with the id of the article saved to it
			// @ts-ignore
			$("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

			// If there's a note in the article
			if (data.note) {
				// Place the title of the note in the title input
				// @ts-ignore
				$("#titleinput").val(data.note.title);
				// Place the body of the note in the body textarea
				// @ts-ignore
				$("#bodyinput").val(data.note.body);
			}
		});
});

// When you click the savenote button
// @ts-ignore
$(document).on("click", "#savenote", function () {
	// Grab the id associated with the article from the submit button
	// @ts-ignore
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the note, using what's entered in the inputs
	// @ts-ignore
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			// @ts-ignore
			title: $("#titleinput").val(),
			// Value taken from note textarea
			// @ts-ignore
			body: $("#bodyinput").val()
		}
	})
		// With that done
		.then(function (data) {
			// Log the response
			console.log(data);
			// Empty the notes section
			// @ts-ignore
			$("#notes").empty();
		});

	// Also, remove the values entered in the input and textarea for note entry
	// @ts-ignore
	$("#titleinput").val("");
	// @ts-ignore
	$("#bodyinput").val("");
});
