

const zipcodeAPIkey = "4d6325b46142f4a1f02bbd88590a9736";
const zipcodeForecastAPIkey = "7c503c0e58d64fcc85af4093549c4a07";
let zipcode = 0;
// let apiCall;    // === repeated: delete when merge
let date ;



    // function that returns an object "apiCall" 
    // give it a url that incorporates user's input zipcode
    //==== repeated : delete when merge 
    function getApiCallObj(url) {
        apiCall = {
            url: url,
            method: "GET"
        };
        return apiCall;    // this is the object we give ajax 
    }

function byZipCode() {
    // getting the value from html 
    zipcode = parseInt($("#zipCodeInput").val().trim());
    console.log(zipcode);

    // putting zipcode into url for function getApiCallObj();
    // parameter units=imperial (F) | =metric (C) | default returns Kelvin
    let zipCodeURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=" + zipcodeAPIkey;

    getApiCallObj(zipCodeURL);

    $.ajax(apiCall).then(function (response) {
        console.log(response);

        // attaching response data to HTML
        let temperature = $("#zipCodeTemperature").text(response.main.temp);
        let description = $("#zipCodeDescription").text(response.weather[0].main);
        console.log(temperature);
        console.log(description);
    });
}



let forecastArray;

let fcDate;
let fcDescription;
let fcMaxTemp;
let fcMinTemp;



// 5 day forecast by zipcode
function zipCodeForecast() {
    zipcode = parseInt($("#zipCodeInput").val().trim());
    console.log(zipcode);


    
    let zipCodeForecastURL = "https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=" + zipcode + "&units=I&days=6&key=" + zipcodeForecastAPIkey;

    getApiCallObj(zipCodeForecastURL);

    $.ajax(apiCall).then(function (result) {
        console.log(result);

        forecastArray = result.data
        console.log(forecastArray);

          //------- index=1 because array[0] is the current day --------
          //--------------------------------------------------------------
        for (let index = 1; index < forecastArray.length; index++){

            fcDate = forecastArray[index].valid_date;
            fcDescription = forecastArray[index].weather.description;
            fcMaxTemp = forecastArray[index].app_max_temp;
            fcMinTemp = forecastArray[index].app_min_temp;


            console.log(fcDate, fcDescription,fcMaxTemp, fcMinTemp);
        
        }       

    });
}

//use latitude & longitude for finding WOEID





// function for submit user input
$("#go").on("click", function (event) {
    event.preventDefault();
    byZipCode();
});

$("#goForecast").on("click", function (event) {
    event.preventDefault();
    zipCodeForecast();
})