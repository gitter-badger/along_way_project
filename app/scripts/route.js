//easier way to set jshint globals?
var directionsDisplay = new google.maps.DirectionsRenderer();
var routeBoxer = new RouteBoxer();
var boxes;

function calcRoute() {
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);
  clearBoxes();
  clearMarkers();
  var distance = parseFloat(20) * 1.609344;
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var place = document.getElementById('place').value;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      var path = result.routes[0].overview_path;
      boxes = routeBoxer.box(path, distance);
      drawBoxes(boxes);
      findPlaces(boxes,0,place);
    }
    else {
      alert("Directions query failed: " + status);
    }
  });
}

function clearRoute(){
  directionsDisplay.setMap(null);
}
