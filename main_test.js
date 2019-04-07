
        function checkMarkers(m){
            var icon;
            if(m.Type_Id == 1){
                icon = './art.png';
            }
            else if(m.Type_Id == 2){
                icon = './fountain.png'
            }
            else if(m.Type_Id == 3){
                icon = './monument.png'
            }
            return icon
        }
        function addMark(m, map){
            var markers = []
            var icon = ''
            if(m[0].Type_Id == 1){
                console.log('aaa')
                icon = './art.png';
            }
            else if(m[0].Type_Id == 2){
                icon = './fountain.png'
            }
            else if(m[0].Type_Id == 3){
                icon = './monument.png'
            }
            for(var i = 0; i < m.length; i ++){
            var marker=new google.maps.Marker({
                position:{lat: m[i].Latitude, lng: m[i].Longitude},
                icon : icon,
                animation:google.maps.Animation.DROP,
                Postcode: m[i].Postcode,
                Suburb: m[i].Suburb 
            });
            marker.addListener('click', function(){
                map.setZoom(16);
                //console.log(marker.getPosition());
                map.setCenter(marker.position);
            });
            markers.push(marker)

        }
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        }
        function showInfo(m){
            console.log(m);
            var outputart = document.getElementById('outputTableArt');
            var outputdt = document.getElementById('outputTableDf');
            var outputmonument = document.getElementById('outputTableMonument');
            var output_art = '';
            var output_dt = '';
            var output_monument = '';
                if (m.Type_Id == 1) {
                    output_art += "<div id = 'row'>"
                        + "<p> Name: " + m.Name + "</p>"
                        + "<p> Structure: " + m.Structure + "</p>"
                        + "<p> Artist: " + m.Artist + "</p>"
                        + "<p> Date: " + m.Art_date + "</p>"
                        + "<p> Type: " + m.Asset_Type + "</p>"
                        + "<p> Suburb: " + m.Suburb + "</p>"
                        + "<p> Postcode: " + m.Postcode + "</p>" + "</div>";
                    outputart.innerHTML = output_art;
                }
                else if (m.Type_Id == 2) {
                    output_dt += "<div id = 'row'>"
                        + "<p> Name: " + m.D2 + "</p>"
                        + "<p> Type: " + m.D3 + "</p>"
                        + "<p> Suburb: " + m.Suburb + "</p>"
                        + "<p> Postcode: " + m.Postcode + "</p>" + "</div>";
                    outputdt.innerHTML = output_dt;
                }

                else if (m.Type_Id == 3) {
                    output_monument += "<div id = 'row'>"
                        + "<p> Theme: " + m.Theme + "</p>"
                        + "<p> Sub Theme: " + m.Sub_Theme+ "</p>" 
                        + "<p> Name: " + m.Feature_Name + "</p>"
                        + "<p> Suburb: " + m.Suburb + "</p>"
                        + "<p> Postcode: " + m.Postcode + "</p>" + "</div>";
                    outputmonument.innerHTML = output_monument;
                }
        }
        // Initialize and add the map
        //var art = axions('get',)
        var map, infoWindow, x
        function showLocation(position) {
            return position.coords;
            //var longitude = position.coords.longitude;

         }

         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            } else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
			
         function getLocation() {

            if(navigator.geolocation) {
               
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
               alert("Sorry, browser does not support geolocation!");
            }
         }
        function initMap(a) {
            if (!a) {
                var uluru = { lat: -37.8136, lng: 144.9631 };
                // The map, centered at Uluru
                map = new google.maps.Map(
                    document.getElementById('map'), { zoom: 12, center: uluru });
                infoWindow = new google.maps.InfoWindow;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent('Your Current location');
                        infoWindow.open(map);
                        map.setCenter(pos);
                    }, function () {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }

                function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
                    infoWindow.open(map);
                }
                // The marker, positioned at Uluru
                // var total = [];
                // total.push.apply(total, monument);
                // total.push.apply(total, art);
                // total.push.apply(total, drinkingfountain);
                // var markers = total.map(function (ele, i) {
                //     return new google.maps.Marker({
                //         position: { lat: Number(ele.Latitude), lng: Number(ele.Longitude) }
                //         //label: labels[i % labels.length]
                //     });
                // });

                // // Add a marker clusterer to manage the markers.
                // var markerCluster = new MarkerClusterer(map, markers,
                //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
                // console.log(markerCluster);
                // debugger;
                addMark(art, map);
                addMark(monument, map);
                addMark(drinkingfountain, map);
                //console.log(map)
            } else if (a.length == 0) {
                //window.confirm('Sorry, Our current datasets have not cover this area');
                //alert("Sorry, Our current datasets have not cover this area");
                var alert = document.getElementById('alert');
                alert.innerHTML = "Sorry, there is no data for this area";
            }
            else {

                if (a[0].Suburb == a[1].Suburb && a[2].Suburb == a[3].Suburb) {

                    var loc = locateMap(a[1].Suburb);
                    var uluru = { lat: Number(loc.Latitude), lng: Number(loc.Longitude) };
                    displayTable(a);
                } else {
                    var uluru = { lat: -37.8136, lng: 144.9631 };
                }

                // The map, centered at Uluru
                var map = new google.maps.Map(
                    document.getElementById('map'), { zoom: 14, center: uluru });
                // The marker, positioned at Uluru
                // Add some markers to the map.
                // Note: The code uses the JavaScript Array.prototype.map() method to
                // create an array of markers based on a given "locations" array.
                // The map() method here has nothing to do with the Google Maps API.
                //console.log(data);
                //var location = document.getElementById('suburb').value;
                //console.log(location)
                var markers = a.map(function (ele, i) {
                    return new google.maps.Marker({
                        position: { lat: Number(ele.Latitude), lng: Number(ele.Longitude) },
                        icon: checkMarkers(ele)
                        //label: labels[i % labels.length]
                    });
                });
                // Add a marker clusterer to manage the markers.
                var markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            }
            //console.log(markerCluster);


        }

        //locate Map by suburb
        function locateMap(sub) {
            //debugger;
            for (var i = 0; i < suburb.length; i++) {
                if (suburb[i].Suburb.toLowerCase() == sub.toLowerCase()) {
                    //debugger;
                    return suburb[i];
                    break;
                }
            }
        }

        //var json = require('./drinking_fountain.csv.json');
        function getlocation(suburb) {
            var arr = [];
            var total = [];
            total.push.apply(total, monument);
            total.push.apply(total, art);
            total.push.apply(total, drinkingfountain);
            for (var i = 0; i < total.length; i++) {
                if (total[i].Suburb.toLowerCase() == suburb.toLowerCase()) {
                    arr.push(total[i]);
                }
            }
            return arr;
        }

        //get location by type
        function getTypeLocation(e) {
            if (e == 'art') {
                return art;
            }
            else if (e == 'monument') {
                return monument;
            }
            else if (e == 'drinkingFountain') {
                return drinkingfountain;
            }
        }
        function handleSubmit(e) {
            var ale = document.getElementById('alert');
            var suburb = document.getElementById('suburb').value;
            if(isNaN(suburb)){
                ale.innerHTML = 'Please input the suburb name rather than postcode';
            }
            var type = document.getElementById('select').value;
            var outputType = document.getElementById('typeDisplay');
            if (suburb != '' && type == "") {
                handlesubmit()
            }
            else if (suburb == '' && type != "") {
                handlefilter(type);
            }
            else if (suburb != '' && type != '') {
                var result = getTypeLocation(type);
                var arr = []
                for (var i = 0; i < result.length; i++) {
                    if (result[i].Suburb.toLowerCase() == suburb.toLowerCase()) {
                        arr.push(result[i])
                    }
                }
            
                initMap(arr);
                outputType.innerHTML = type;
            }
        }


        //filterling
        function handlefilter(e) {
            //e.preventDefault()
            // console.log('asdf')
            // var type = document.getElementById('select').value;
            // document.getElementById('display').innerHTML = type;
            var getinfo = getTypeLocation(e);
            initMap(getinfo);
        }


        function handlesubmit() {
            //e.preventDefault();
            //debugger;
            var location = document.getElementById('suburb').value;

            var getinfo = getlocation(location);

            initMap(getinfo);
            document.getElementById('dashboard').innerHTML = getinfo.Description;
        }

        function displayTable(row) {
            console.log(row);
            var outputart = document.getElementById('outputTableArt');
            var outputdt = document.getElementById('outputTableDf');
            var outputmonument = document.getElementById('outputTableMonument');
            var output_art = '';
            var output_dt = '';
            var output_monument = '';
            for (var i = 0; i < row.length; i++) {
                if (row[i].Type_Id == 1) {

                    output_art += "<div id = 'row'>"
                        + "<p> Name: " + row[i].Name + "</p>"
                        + "<p> Structure: " + row[i].Structure + "</p>"
                        + "<p> Artist: " + row[i].Artist + "</p>"
                        + "<p> Date: " + row[i].Art_date + "</p>"
                        + "<p> Type: " + row[i].Asset_Type + "</p>"
                        + "<p> Suburb: " + row[i].Suburb + "</p>"
                        + "<p> Postcode: " + row[i].Postcode + "</p>" + "</div>";
                }
                else if (row[i].Type_Id == 2) {
                    output_dt += "<div id = 'row'>"
                        + "<p> Name: " + row[i].D2 + "</p>"
                        + "<p> Type: " + row[i].D3 + "</p>"
                        + "<p> Suburb: " + row[i].Suburb + "</p>"
                        + "<p> Postcode: " + row[i].Postcode + "</p>" + "</div>";
                }

                else if (row[i].Type_Id == 3) {
                    output_monument += "<div id = 'row'>"
                        + "<p> Theme: " + row[i].Theme + "</p>"
                        + "<p> Sub Theme: " + row[i].Sub_Theme+ "</p>" 
                        + "<p> Name: " + row[i].Feature_Name + "</p>"
                        + "<p> Suburb: " + row[i].Suburb + "</p>"
                        + "<p> Postcode: " + row[i].Postcode + "</p>" + "</div>";
                }

            }
            outputart.innerHTML = output_art;
            outputdt.innerHTML = output_dt;
            outputmonument.innerHTML = output_monument;
        }




