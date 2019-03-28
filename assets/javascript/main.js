$(function(){

  $("#searchBtn").on("click", function(){
    event.preventDefault();
    var searchInput = $("#searchValue").val();

    if(searchInput == ""){    
      return      //if the search bar is empty do not run
    }

    var searchBtn = $("<button>").addClass("btn btn-dark gif-btn");
    searchBtn.attr("data-searchValue", searchInput);
    searchBtn.text(searchInput);
    $(".show-buttons").append(searchBtn);
  })
 
  $(document).on("click", ".gif-btn", function(){
    //populate the "#gif-stage with response gifs
    $(".gif-stage").empty();

    var showName = $(this).text();

    $(".gif-search-name").text(showName + " Gifs")
    
    var myUrl = "https://api.giphy.com/v1/gifs/search?api_key=eLOpXVBVDdI2JSCKNQV3h8BY9BqBtliM&rating=G&limit=15&q=" + showName

    $.ajax({
      url: myUrl,
      method: "GET"
    }).done(function(response){

      for(i = 0; i < response.data.length; i++){
        var dynamicDiv = $("<div>").addClass("col-6 justify-content-center")

        var dynamicImg = $("<img>").attr({
          class: "gif",
          src: response.data[i].images["480w_still"].url,
          "data-still": response.data[i].images["480w_still"].url,
          "data-animate": response.data[i].images.original.url,
          "data-state": "still"
        })

        var dynamicP = $("<p>").addClass("text-center").text("Rating: " + response.data[i].rating.toUpperCase())

        dynamicDiv.append(dynamicImg, dynamicP)

        $(".gif-stage").append(dynamicDiv);
      }

    })
  })

  $(document).on("click", ".gif", function() {

    var namedState = $(this).attr("data-state");
    
    if(namedState == "still"){
      $(this).attr({
        "src": $(this).attr("data-animate"),
        "data-state": "animate"
      })
    }else{
      $(this).attr({
        "src": $(this).attr("data-still"),
        "data-state": "still"
      })
    }
  });
})