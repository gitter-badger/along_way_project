var allPlaces = [];
var placesServices;

$("nav #filter").click(function () {
  $(".filterForm").addClass("shown");
});
$("#hide").click(function () {
  $(".filterForm").removeClass("shown");
});
var maxPrice = 4;
$("#dollar1").click(function () {
  maxPrice = 1;
}),
$("#dollar2").click(function () {
  maxPrice = 2;
}),
$("#dollar3").click(function () {
  maxPrice = 3;
}),
$("#dollar4").click(function () {
  maxPrice = 4;
});

function findPlaces(boxes, searchIndex) {
  placesServices = new google.maps.places.PlacesService(map);
  var nowOpen = document.getElementById('checkbox1').checked;
  var place = document.getElementById('place').value;

  var request = {
    bounds: boxes[searchIndex],
    keyword: place,
    maxPriceLevel: maxPrice,
    openNow: nowOpen
  };
  placesServices.radarSearch(request, function (results, status) {
        //console.log(results);
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          console.log("Request[" + searchIndex + "] failed: " + status);
        } else {
          for (var i = 0, result; result = results[i]; i++) {
            //console.log("boxes " + searchIndex + ", result: " + i + " " + result);
                //getRating(result);
                allPlaces.push(result);
                createMarker(result);
              }
            }
            searchIndex++;
            if (searchIndex < boxes.length)
              findPlaces(boxes, searchIndex);
          });
}


function getRating(places, index){
  var place = places[index];
  var request = {
    reference: place.reference
  };

  placesServices.getDetails(request, function(place, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      console.log("Request[" + index + "] failed: " + status);
    }else{
      //console.log(place.name);
      var address = place.formatted_address;
      var name = place.name;
      var yelp_key = "vhGs7ntrDsYquBIwzmouag";
      var yelpURL = "http://api.yelp.com/business_review_search?callback=?";
      var yelp_params = {
        "location": address,
        "id": name,
        "ywsid": yelp_key
      };
      //console.log(yelp_params);
      $.getJSON(yelpURL, yelp_params, function(results) {
        //console.log(results.name);
        if (results.businesses[0].avg_rating > 4){        //set to a slider value
          console.log(results.businesses[0]);
          createMarker(place);
        }
      });
    }
  });
  index++;
  if (index < places.length){
    getRating(places, index)
  }
}


