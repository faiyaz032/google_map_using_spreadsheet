var custom_map;
const locations = [];
let sliderValue;

var slide = document.getElementById('custom-map-slide');
https: function initialiseMap() {
   jQuery.getJSON(
      'https://sheets.googleapis.com/v4/spreadsheets/1ZhEcxzkqB13U-zmNpMGsuh80ONyEgwewy6KRW196dE4/values/Sheet1!A2:Q?key=AIzaSyA1CncBlxu_s2fmPenvk6ZlPlSpRm4cp28',
      function (data) {
         jQuery(data.values).each(function () {
            var location = {};
            location.latitude = parseFloat(this[0]);
            location.longitude = parseFloat(this[1]);
            location.logo = this[2];
            location.year = parseFloat(this[3]);
            locations.push(location);
         });
         var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(44.5, -89.5),
         };

         custom_map = new google.maps.Map(document.getElementById('custom-map'), mapOptions);
         setLocations(custom_map, locations);
      }
   );
}

function setLocations(custom_map, locations) {
   var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(44.5, -89.5));
   for (var i = 0; i < locations.length; i++) {
      var new_marker = createMarker(custom_map, locations[i]);
      bounds.extend(new_marker.position);
   }
}

function createMarker(custom_map, location) {
   var position = {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude),
   };

   var icon = '';
   if (location.logo == 'BWW' || location.logo == 'Buffalo Wild Wings') {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/BWW.png';
   } else if (location.logo == 'CSC') {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/CSC.png';
   } else if (location.logo == 'Wet Willies' || location.logo == 'Wet Wiillies') {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/wet-willies.png';
   } else if (location.logo == "Wendy's") {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/wendys.png';
   } else if (location.logo == 'Snooze') {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/snooze.png';
   } else if (location.logo == 'RBA' || location.logo == "Arby's") {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/arbys.png';
   } else if (location.logo == 'Inspire') {
      icon = 'inspire.png';
   } else if (location.logo == 'R-Taco') {
      icon = 'https://buildablecompanies.com/wp-content/uploads/2021/01/r-taco.png';
   }

   var marker = new google.maps.Marker({
      position: position,
      map: custom_map,
      visible: sliderValue * 1 >= location.year,
      icon: icon,
   });

   return marker;
}

slide.addEventListener('change', (el) => {
   sliderValue = el.target.value * 1;
   setLocations(custom_map, locations);
   const changeYear = document.getElementById('changeYear');
   changeYear.innerHTML = sliderValue;
});
