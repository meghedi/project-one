const weatherApiKey = "3d4853f2f53841dcac6f725966b50eb5";
const giphyApiKey = "zE8tEnhTQbLJaTKmcUjDX0tFS1WJc7pP";
let inputVal = 0;
let apiCall;

let currentDay = moment();

let cityName = "";
let state = "";


function getApiCallObj(url) {
  apiCall = {
    url: url,
    method: "GET"
  };

  return apiCall;
}

function getInputValue() {
  inputVal = $('#zipCodeInput').val();
  let weatherApiUrl = '';
  if (isNaN(inputVal)) {
    let inputArray = inputVal.split(",");
     cityName = inputArray[0];
     state = inputArray[1];

    console.log(cityName , state);
    if(typeof state ==='undefined' || typeof cityName === 'undefined'){
      console.log('here');
      $("#myModal").find("#modalTitle").text("City Name, State");
      $("#myModal").find("#modalBodyText").text("Please Enter City, State with ',' seperated!");
      $('#myModal').modal('show');
      $('#forecast .forFourDayForecast, #giphyImg').empty();
      return;
    }
    weatherApiUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + cityName +","+ state +"&units=I&days=5&key=" + weatherApiKey;
    getApiCallObj(weatherApiUrl);
  } else {
  //  inputVal = parseInt(inputVal);
    if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputVal)) {
      weatherApiUrl = "https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=" + inputVal + "&units=I&days=5&key=" + weatherApiKey;
      getApiCallObj(weatherApiUrl);
    }else{
      //alert("not zip code");
      $("#myModal").find("#modalTitle").text("Zip Code");
      $("#myModal").find("#modalBodyText").text("Please Enter a Zip Code.")
      $('#myModal').modal('show');
      $('#forecast .forFourDayForecast, #giphyImg').empty();

      return;
    }
  }



  $.ajax(apiCall).then(function (result) {
    console.log(result);

    $('#forecast .forFourDayForecast').empty();
    $('#giphyImg').empty();
    getGiphy(result.data[0].weather.description);
    $('.current-temperature__value').html(result.data[0].temp + "°");
    $('.current-temperature__summary').text(result.data[0].weather.description);
    $('.current-temperature__icon').attr('src', "https://www.weatherbit.io/static/img/icons/" + result.data[0].weather.icon + ".png");

    getCurrentInfo(result.city_name, result.state_code);


    for (let i = 1; i < result.data.length; i++) {
      let imgUrl = "https://www.weatherbit.io/static/img/icons/" + result.data[i].weather.icon + ".png";
      getTemprature(result.data[i].max_temp, result.data[i].low_temp, imgUrl);
    }
  });
}

function getCurrentInfo(cityName, stateName){
    $("#currentInfo").html("<p>"+ cityName +", "+ stateName+"</p>");
}

function getGiphy(main) {
  let giphyApiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyApiKey + "&q=" + main + "&limit=1&offset=0&rating=G&lang=en";
  getApiCallObj(giphyApiUrl);

  $.ajax(apiCall).then(function (result) {
    console.log(result);
    for (let i = 0; i < result.data.length; i++) {
      let imgUrl = result.data[i].images.fixed_width.url;
      $('#giphyImg').append('<img src="' + imgUrl + '" id="boxGiphyImg"  alt="current weather giphy">');

    }
  });
}

function getTemprature(maxTemp, lowTemp, imgUrl) {

  let newHtml = `<div class="col-sm-3" class="fourDayForecast">
  <div class="boxSpace"><div>${maxTemp}° <span class="lineBetween"> | </span> ${lowTemp}° </div><div><img src="${imgUrl}" class="img-fluid" alt="4 day forecast"></div></div>`;
  $('#forecast .forFourDayForecast').append(newHtml);
}

function movingLetters() {
  var textWrapper = document.querySelector('.ml2');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({ loop: true })
    .add({
      targets: '.ml2 .letter',
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 70 * i
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}


$('#go').on('click', function (event) {
  event.preventDefault();
  getInputValue();
});

$(document).ready(function () {
  movingLetters();
});




