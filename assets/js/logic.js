const weatherApiKey = "2a8e97883ec8fac4986bb3055a102b1d";
const giphyApiKey = "zE8tEnhTQbLJaTKmcUjDX0tFS1WJc7pP";
let inputVal = 0;
let apiCall;


function getApiCallObj(url) {
  apiCall = {
    url: url,
    method: "GET"
  };

  return apiCall;
}

function getInputValue() {
  inputVal = $('#zipCodeInput').val();
  let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + weatherApiKey
  getApiCallObj(weatherApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);
    for (let i = 0; i < result.weather.length; i++) {
      console.log(result.weather[i].main);
      let imgUrl = "http://openweathermap.org/img/w/" + result.weather[i].icon + ".png";
      $('#weatherIcon').html('<img src="' + imgUrl + '">');
      getGiphy(result.weather[i].main);
    }
  });
}


// 5 day forecast by zipcode
function zipCodeForecast() {
  inputVal = $('#zipCodeInput').val();
  let weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=" + inputVal + "&appid=" + weatherApiKey
  getApiCallObj(weatherApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);

  });
}

function getGiphy(main) {
  let giphyApiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyApiKey + "&q=" + main + "&limit=1&offset=0&rating=G&lang=en";
  getApiCallObj(giphyApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);
    for (let i = 0; i < result.data.length; i++) {
      let imgUrl = result.data[i].images.fixed_width.url;
      $('#giphyImg').html('<img src="' + imgUrl + '" id="boxGiphyImg">');

    }
  });
}

$('#go').on('click', function (event) {
  event.preventDefault();
  getInputValue();
});


$("#goForecast").on("click", function(event){
  event.preventDefault();
zipCodeForecast();
})