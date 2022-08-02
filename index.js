var axios = require('axios');


class placeList {
  constructor() {
    this.array = [];
  }

  Add(input) {
    this.array.push(input);

  }
  Get() {
    return this.array;
  }
}

const noweb = new placeList();


getCoord("Des Moines, IA", 1, "");
function getCoord(input, range, keyword) {

  specialInput = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i] == ' ') {
      specialInput += '+';
    } else {
      specialInput += input[i];
    }
  }

  console.log(specialInput);

  const name = "https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=" + specialInput + ",+CA&key=" + process.env.API_KEY



  axios(name)
    .then(function(response) {
      //console.log(response.data.results[0].geometry)
      nearbySearch(response.data.results[0].geometry.location, response.data.results[0].geometry.bounds, range, keyword);
    })
    .catch(function(error) {
      console.log(error);
    });
  //

}






function nearbySearch(center, bounds, range, keyword) {
  const placeLists = new placeList();



  const nlat = bounds.northeast.lat + range;
  const nlng = bounds.northeast.lng + range;
  const clat = center.lat;
  const clng = center.lng;
  const slat = bounds.southwest.lat - range;
  const slng = bounds.southwest.lng - range;

  const grid = [
    { lat: slat, lng: slng },
    { lat: slat, lng: clng },
    { lat: slat, lng: nlng },
    { lat: clat, lng: slng },
    { lat: clat, lng: clng },
    { lat: clat, lng: nlng },
    { lat: nlat, lng: slng },
    { lat: nlat, lng: clng },
    { lat: nlat, lng: nlng }
  ]

  for (let i = 0; i < grid.length; i++) {  //1 -> grid.length
    //specific grid locations
    let nextPage = true;
    lat = grid[i].lat;
    lng = grid[i].lng;


    if (keyword == undefined) {
      var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lng + '&radius=1000&key=' + process.env.API_KEY,
        headers: {}
      };

    } else {
      var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + '%2C' + lng + '&radius=5000&keyword=' + keyword + '&key=' + process.env.API_KEY,
        headers: {}
      };
    }




    axios(config)
      .then(function(response) {
        //console.log(response.data)
        for (let a = 0; a < response.data.results.length; a++) {

          // console.log(response)
          placeLists.Add(response.data.results[a].place_id);

        }
        if (i == grid.length - 1) {
          detailsSearch(placeLists);
        }

      })
      .catch(function(error) {

        console.log(error);
      });









  }



}










function detailsSearch(places) {

  console.log('getting Details')
  console.log(places.Get().length)

  for (let i = 0; i < places.Get().length; i++) {
    var config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + places.Get()[i] + '&fields=name%2Crating%2Cformatted_phone_number%2Cwebsite&key=' + process.env.API_KEY,
      headers: {}
    };

    axios(config)
      .then(function(response) {
        if (response.data.result.website == undefined) {
          console.log(response.data.result)
          noweb.Add(response.data.result);
        }

      })
      .catch(function(error) {
        console.log(error);
      });
  }
}


