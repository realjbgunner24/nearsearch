/*var axios = require('axios');




//console.log(getCoord("Chicago ,IL"));
function getCoord(input) {

  specialInput = "";
  
  for(let i = 0; i < input.length; i++){
    if(input[i] == ' '){
     specialInput += '+';
    }else{
      specialInput += input[i];
    }
  }
  
console.log(specialInput);
  
  const name = "https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address="+specialInput+",+CA&key="+process.env.API_KEY



  axios(name)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  console.log(response.data.results[0].geometry)
  return(response.data.results[0].geometry);
})
.catch(function (error) {
  console.log(error);
});

  
}



function nearbySearch(input) {

}

function detailsSearch(input) {

}
*/