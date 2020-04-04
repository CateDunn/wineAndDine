$(document).ready(function() {
    console.log("test");
    
    var locationID = 0;
    var radius = 0;
    var cuisineID = 0;


    $('.dropdown-trigger').dropdown();


    $("#submit1").on("click", function(event) {
        event.preventDefault();

        var location = $("#location").val();

        console.log(location);

        var queryUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + location + "&count=10";
        
        $.ajax({
            url: queryUrl,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('user-key', 'c9dfe68dd53ff029491860327766f2ef');}
        })

        .then(function(response){
            console.log(response);

            var locationsArray = response.location_suggestions;

            console.log(locationsArray);

                
            for (var i = 0; i < locationsArray.length; i++) {
                
                $("#dropdown1").append(`<li><a data-id=${locationsArray[i].entity_id} href=#!> ${locationsArray[i].title} </a></li>`)
                $("#dropdown1").append("<li class='divider' tabindex='-1'></li>");
                
            };
            
        })

        $('#locationDrop').removeClass('hide');

    })
   
    


    $("#dropdown1").on("click", function(event) {
        console.log("click");
        console.log($(event.target));

        $('#cuisineDrop').removeClass('hide');

        
        // getting the cuisine the user chose and changing the button text to it
        var choice = $(event.target).text();
        console.log(choice);
        $('#locationBtn').text(choice);
        
        //getting the cuisine ID of the choice for in the next API call
        locationID = $(event.target).attr("data-id");
        console.log(locationID);

        var queryUrl2 = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + locationID;
            
        $.ajax({
            url: queryUrl2,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('user-key', 'c9dfe68dd53ff029491860327766f2ef');}
        })
    
        .then(function(response) {
            console.log(response)

            var cuisineArray = response.cuisines;

            console.log(cuisineArray);

            
            for (var i = 0; i < cuisineArray.length; i++) {
                
                $("#dropdown2").append(`<li><a data-id=${cuisineArray[i].cuisine.cuisine_id} href=#!> ${cuisineArray[i].cuisine.cuisine_name} </a></li>`)
                $("#dropdown2").append("<li class='divider' tabindex='-1'></li>");
                
            };
        
        })

        

        
    })
    
    $("#dropdown2").on("click", function(event) {
        console.log("click");
        console.log($(event.target));

        cuisineID = $(event.target).attr("data-id");
        console.log(cuisineID);

        
        // getting the cuisine the user chose and changing the button text to it
        var cuisineChoice = $(event.target).text();
        console.log(cuisineChoice);
        $('#cuisineBtn').text(cuisineChoice);
    
        $('#radiusQuestion').removeClass('hide');
    })
    


    
    $("#radiusSubmit").on("click", function(event) {
        event.preventDefault;

        console.log("New test: ", cuisineID);

        radius = $("#quantity").val();

        


        var queryUrl3 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + locationID + "&entity_type=city&count=10&radius=" + radius + "&cuisines=" + cuisineID + "&sort=rating&order=desc";
    
        $.ajax({
            url: queryUrl3,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('user-key', 'c9dfe68dd53ff029491860327766f2ef');}
        })
        
        .then(function(response) {
            console.log(response);

            restaurantArray = response.restaurants;
            console.log(restaurantArray);

            for (var i = 0; i < restaurantArray.length; i++) {
                $("#restaurantResults").append(

               "<div class='row'><div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"
               //card title
                + response.restaurants[i].restaurant.name + " | " + response.restaurants[i].restaurant.location.locality 
                //card body elements
                + "</span><p>User Rating (Out of 5): "
                + response.restaurants[i].restaurant.user_rating.aggregate_rating
                + " " + response.restaurants[i].restaurant.user_rating.rating_text
                + " (" + response.restaurants[i].restaurant.user_rating.votes + " votes)</p>"
                + "<p> Average Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</p>"
                //card link
                + "</div><div class='card-action'><a target='_blank' href="
                + response.restaurants[i].restaurant.url + ">Check out the restaurant page!</a></div></div></div></div>");
            }
    
        })
    })
    





});