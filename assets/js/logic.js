const weatherApiKey = "3d4853f2f53841dcac6f725966b50eb5";
const giphyApiKey = "zE8tEnhTQbLJaTKmcUjDX0tFS1WJc7pP";
let inputVal = 0;
let apiCall;

let currentDay = moment();


function getApiCallObj(url) {
  apiCall = {
    url: url,
    method: "GET"
  };

  return apiCall;
}

function getInputValue() {
  inputVal = $('#zipCodeInput').val();
 // let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + weatherApiKey
   let weatherApiUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city="+inputVal +"&key="+weatherApiKey+"&days=5"
 getApiCallObj(weatherApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);
    /*for (let i = 0; i < result.weather.length; i++) {
      console.log(result.weather[i].main);
      let imgUrl = "http://openweathermap.org/img/w/" + result.weather[i].icon + ".png";
      $('#weatherIcon').html('<img src="' + imgUrl + '">');
      getGiphy(result.weather[i].main);
      getwoied(result.coord.lon, result.coord.lat)
    }*/
    getGiphy(result.data[0].weather.description);

   for (let i = 1; i < result.data.length; i++) {
      let imgUrl = "https://www.weatherbit.io/static/img/icons/" + result.data[i].weather.icon + ".png";
      getTemprature(result.data[i].max_temp, result.data[i].low_temp, imgUrl);
    }
  });
}


function getGiphy(main) {
  let giphyApiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyApiKey + "&q=" + main + "&limit=1&offset=0&rating=G&lang=en";
  getApiCallObj(giphyApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);
    for (let i = 0; i < result.data.length; i++) {
      let imgUrl = result.data[i].images.fixed_width.url;
      $('#giphyImg').append('<img src="' + imgUrl + '" id="boxGiphyImg">');

    }
  });
}

function getTemprature(maxTemp, lowTemp, imgUrl){

 let newHtml = `<div class="col-sm-3" class="fourDayForecast">
  <div class="boxSpace">${maxTemp} , ${lowTemp} <img src="${imgUrl}"></p></div>
</div>`;
  $('#forecast .forFourDayForecast').append(newHtml);
}


$('#go').on('click', function (event) {
  event.preventDefault();
  getInputValue();
});
