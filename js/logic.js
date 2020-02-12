let inputVal = 0;
const apiKey = "2a8e97883ec8fac4986bb3055a102b1d";


function getInputValue(){
    inputVal =  $('#zipCodeInput').val();
    let apiCall = {
        url: "https://api.openweathermap.org/data/2.5/weather?q="+inputVal+"&appid="+apiKey,
        method: "GET"
    };

    $.ajax(apiCall).then(function(result){
      console.log(result);
      alert('here');
    });
}



function getGiphy(){
   
}

$('#go').on('click', function(event){
   event.preventDefault();
   getInputValue();
});

getGiphy();