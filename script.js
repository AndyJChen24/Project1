
$(document).ready(function(){
    var responseArray;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://community-manga-eden.p.rapidapi.com/list/0",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-manga-eden.p.rapidapi.com",
            "x-rapidapi-key": "006e809b87msh0c1cbdaccb16659p12b8d5jsn35e1032a8f6a",
            "Access-Control-Allow-Origin":"*"
        }
    }
    //calling response from manga api
    $.ajax(settings).done(function (response) {
        console.log(response);
       responseArray = response;
    
    

    $("#shounen").on("click", function() {

    });
    $("#supernatural").on("click", function() {
    
    });
    $("#slice of life").on("click", function() {
    
    });
    $("#romance").on("click", function() {
    
    });
    $("#magic").on("click", function() {
      
    });
    
    $(".button").click(function(){
        var anime = $(".input").val();
   
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            $("#searchResults").html(" ");
            $("#recommendations").html("");
            $.each(response.results,function(index,value){
                $("#searchResults").append("<div class='animeName' value="+response.results[index].mal_id+ ">"+ response.results[index].title+"</div>")
                
                // $("#searchResults").append("<a href='"+response.results[index].url+"' class ='cards'>"
                //     +"<div class='card_image'> <img src='"+ response.results[index].image_url+"'></div>"
                //     +"<div class='card_name'> "+ response.results[index].title+"</div>"+
                // "</a>");
            });
            $(".animeName").click(function(){
                var animeID = $(this).attr("value");
                var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/"
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function(response){
                   
                    // clear searchResults
                    $("#searchResults").html("");
                    // append selected anime
                    $("#searchResults").append("<div class='animeName' value="+response.title+ ">"+ response.title+"</div>")
                    $("#searchResults").append("<a href='"+response.url+"' class ='cards' style='float:left, box-sizing:border-box'>" +"<div class='card_image'> <img src='"+ response.image_url+"'></div> </a>");
                    $("#searchResults").append(response.synopsis)
                    // append recommendation 
                })
                //getting manga with matching title
                var matchedElementsArray = responseArray.manga.filter(function(item){

                    return item.t === anime;
                })
                mangaId = matchedElementsArray[0].i;
                console.log(mangaId);
                //getting id and appending results
               // for (var j=0; j<matchedElementsArray.length; j++){
               //     var mangaResults = $("<div data-id="+matchedElementsArray[j].i+">").text(matchedElementsArray[j].t);
               //     $("#searchResults").append(mangaResults);
               //     console.log(matchedElementsArray[j].i);
               // }

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://cors-anywhere.herokuapp.com/https://www.mangaeden.com/api/manga/"+mangaId+"/",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "community-manga-eden.p.rapidapi.com",
                        "x-rapidapi-key": "006e809b87msh0c1cbdaccb16659p12b8d5jsn35e1032a8f6a"
                    }
                }
                
                $.ajax(settings).then(function(response){
                    mangaLink = $("<a>").attr("href", response.url);
                    mangaLink.text("Click to see manga!");
                    $("#searchResults").append(mangaLink);
                });

                var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/recommendations"
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function(response){
        
                    $.each(response.recommendations,function(index,value){
                    $("#recommendations").append("<div class='animeName' value="+response.recommendations[index].mal_id+ ">"+ response.recommendations[index].title+"</div>")
                    })
                });
            })
        })
       
    })

 
});
})
