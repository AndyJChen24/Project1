

$(document).ready(function(){
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
    
    
    console.log("inside ready");
    $(".button").click(function(){
        var anime = $(".input").val();
        console.log(anime)
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("#searchResults").html(" ");
            $.each(response.results,function(index,value){
                
                $("#searchResults").append("<a href='"+response.results[index].url+"' class ='cards'>"
                    +"<div class='card_image'> <img src='"+ response.results[index].image_url+"'></div>"
                    +"<div class='card_name'> "+ response.results[index].title+"</div>"+
                "</a>");
            })
        })
    })
})
