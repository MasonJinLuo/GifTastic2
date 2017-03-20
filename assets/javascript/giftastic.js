var topics = [ "Naruto", "Sword Art Online", "Dragonball Z", "Hello Kitty", "Harley Quinn", "Pokemon", "Totoro", "Sailor Moon"]

$(document).ready(function(){

function displayGifs(){
	var gifs = $(this).attr("data-name")
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + gifs  
	$('#loadGifHere').empty()


 	$.ajax({
          url: queryURL,
      	  method: "GET"
     }).done(function(response) {
			console.log(response);
			


	    	for (var i = 0; i < response.data.length; i++) {
	    	var newDiv = $('<div>')
	    	newDiv.addClass("wrapper")
	    	$('#loadGifHere').append(newDiv)
	    	$(newDiv).append("<h3> Rated: " + response.data[i].rating + "</h3>")
	    	var newImg = $('<img>');
	    	newImg.attr("src", response.data[i].images.fixed_height_still.url)
	    	newImg.attr("stop", response.data[i].images.fixed_height_still.url)
	    	newImg.attr("go", response.data[i].images.fixed_height.url)
	    	newImg.addClass("static")
			$(newDiv).append(newImg)
	     	}
	     	$('.wrapper').bind(addWrapperClick())
    

		});		

};

function renderButtons(){
	$('#loadButtonsHere').empty();

	for (i = 0; i < topics.length; i++){

    	var button = $('<button>')
    	button.addClass('gifs');
    	button.addClass('btn')
    	button.addClass('btn-info')
    	button.attr('data-name', topics[i]);
    	button.text(topics[i]);
    	$('#loadButtonsHere').append(button);
		

    	}
 }



$('#addGif').on('click', function(event){
	event.preventDefault();
	var newGif = $("#searchInput").val().trim();
	topics.push(newGif);
	renderButtons();

});

$(document).on("click", ".gifs", displayGifs);



function addWrapperClick () {

	$(".wrapper").on("click", function () {
		console.log("hello")
		if ($(this).find('img').hasClass("static")){
			$(this).find('img').removeClass("static")
			$(this).find('img').attr('src', $(this).find('img').attr('go'))

		}else{
			$(this).find('img').addClass("static")
			$(this).find('img').attr('src', $(this).find('img').attr('stop'))
		}
	});
}
	


renderButtons();

});