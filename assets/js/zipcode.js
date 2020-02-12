

const zipcodeAPIkey = "4d6325b46142f4a1f02bbd88590a9736";
let zipcode = 0;
// let apiCall;    // === repeated: delete when merge
let date = 



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

// function for submit user input
$("#go").on("click", function (event) {
    event.preventDefault();
    byZipCode();
})