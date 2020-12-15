var custom_map;
const locations = [];
let sliderValue;

var slide = document.getElementById("custom-map-slide");

function initialiseMap() {
  jQuery.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1hOgoiZVrcYRXJwc_IJiBtPUP88fhUOUoU9R9pXD_ukw/values/Sheet1!A2:Q?key=AIzaSyA1CncBlxu_s2fmPenvk6ZlPlSpRm4cp28",
    function (data) {
      jQuery(data.values).each(function () {
        var location = {};
        location.latitude = parseFloat(this[0]);
        location.longitude = parseFloat(this[1]);
        location.year = parseFloat(this[2]);
        locations.push(location);
      });

      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(0, 0),
      };
      
      custom_map = new google.maps.Map(document.getElementById("custom-map"), mapOptions);
      setLocations(custom_map, locations);
      
    }
  );
}

function setLocations(custom_map, locations) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    var new_marker = createMarker(custom_map, locations[i]);
    bounds.extend(new_marker.position);
  }
  custom_map.fitBounds(bounds);
}

function createMarker(custom_map, location) {
  var position = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude)
  };
    
  var marker = new google.maps.Marker({
      position: position,
      map: custom_map,
      value:location.year,
      visible: sliderValue * 1 >= location.year
  });
  return marker;
}

slide.addEventListener("change", (el) => {
  sliderValue = el.target.value * 1;
  setLocations(custom_map, locations);
  const changeYear = document.getElementById('changeYear');
  changeYear.innerHTML = sliderValue;
});


