

$(document).ready(function() {


//function getWeather() {};
function apiTester () {
//var queryURL =
var location = "miami"


$.ajax({
method: "GET",
url: `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6700dda73faa5661041d91bb8d92d431&units=imperial`,
dataType: "json",
}).then(function(data) {

console.log(data)
});
};






$("#search-button").on("click", function(){
    
    var searchInput = $(".searchBar").val()

    console.log(searchInput)


    $("#search-value").val("");


    weatherSearch(searchInput);


    
    
   

});

$(".recent").on("click","li",function() {

    weatherSearch($(this).text());



}

)










function recentList(txt) {
    var listItem = $("<li>").addClass("list-group-item").text(txt);
    $(".recent").append(listItem);
};

function weatherSearch(cityState) {

    $.ajax({

        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&appid=6700dda73faa5661041d91bb8d92d431&units=imperial`,
        dataType: "json",})
        .then(function (data) {



            console.log(cityState)
            console.log(data)

            if (recent.indexOf(cityState)=== -1) {
                recent.push(cityState);
                window.localStorage.setItem("recent",JSON.stringify(recent));
                
                recentList(cityState);

            };


            $("#weather").empty();


            var header = $("<h2>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var hum = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity}%`);
            var windSpeed = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed} MPH`)
            var currentBody = $("<div>").addClass("card-body");
            var temperature = $("<p>").addClass("card-text").text(`Temperature: ${data.main.temp}F`)
            var icon = $("<img>").attr("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);

            header.append(icon)
           currentBody.append(header,hum, windSpeed,temperature);
           card.append(currentBody)
           $("#weather").append(card)

           fiveDay(cityState)
            uvIndex(data.coord.lat, data.coord.lon)

        





            
        });



        




};


function fiveDay (cityState) {
$.ajax({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityState}&appid=6700dda73faa5661041d91bb8d92d431&units=imperial`,
    dataType: "json",


}).then(function(data) 
{
    var newDiv = $("<div></div>").addClass("row")

    $("#forecast").addClass("mt-5")
    
    $("#forecast").html("<h3>5 Day Forecast:</h3>").append(newDiv);


    for (var i = 0; i < data.list.length; i++) {

        if(data.list[i].dt_txt.indexOf("15:00:00")!== -1) {

            let column = $("<div>").addClass("col-md-2");
            let card = $("<div>").addClass("card bg-primary text-white");
            let body = $("<div>").addClass("card-body p-2");

            let header = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            
            let degrees = $("<p>").addClass("card-text").text(`Temp: ${data.list[i].main.temp_max} F`);
            let humidity2 = $("<p>").addClass("card-text").text(`Humidity: ${data.list[i].main.humidity}%`);


            column.append(card.append(body.append(header,degrees,humidity2)));
            $("#forecast .row").append(column)


        };




    };


});


};

function uvIndex (lattitude,longitude) {
     $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=6700dda73faa5661041d91bb8d92d431&lat=${lattitude}&lon=${longitude}`,
        method: "GET",
        dataType: "json",
        
    }).then(function(data){

        let uv = $("<p>").text("UV Index: ");
        let newSpan = $("<span>")
        let newButton= $("<button>").addClass("btn btn-sm").text(data.value)
      

        newSpan.append(newButton);

        if (data.value < 3) {
           newButton.css("color","blue");
          }
          else if (data.value < 7) {
            newButton.css("color","green");
          }
          else {
            newButton.css("color","red");
          }



          $("#weather .card-body").append(uv.append(newSpan));
          




    })

}


apiTester();







var recent = JSON.parse(window.localStorage.getItem("recent"))||[];



if (recent.length > 0) {weatherSearch(recent[recent.length-1])}

for (var i = 0; i < recent.length; i++) {
    recentList(recent[i]);
};
















});