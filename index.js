//search for open weather map under the url https://openweathermap.org then create an account or sign in, go to the option sahar and click on API keys, when u create an API key u have to activate it just wait for some minutes for it to activate
const apikey = "7f0d55fb55a043a39bbafe1d0b083d8d";

const weatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");


const formE1 = document.querySelector("form");
//addeventlistener to the form which will trigger a function when the form is submitted

formE1.addEventListener("submit", ()=>{
    event.preventDefault();
    const cityValue = cityInputE1.value;
    //console.log(cityValue);
    getWeatherData(cityValue);
});
// if we are using await we use assync function, it is a function that has delay at some points
async function getWeatherData(cityValue){
    // we use try and catch method, if the request is correct we
    try {
       const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&
        units=metric`
        );

       if(!response.ok) {
        throw new Error("Network response was not ok");
       }

const data = await response.json();

//console.log(data);
const temperature = Math.round(data.main.temp)

const description = data.weather[0].description

const icon = data.weather[0].icon

const details = [
    `Feels like: ${Math.round(data.main.feels_like)}`,
    `Humidity: ${data.main.humidity}%`,  
    `Wind speed: ${data.wind.speed}m/s`,  
]

//let us target the weather data
// the below code make the icon to be dynamic(change based on the name of the country you input)
weatherDataE1.querySelector(
    ".icon"
    ).innerHTML = `<img src="http://openweathermap.
org/img/wn/${icon}.png" alt="Weather Icon">`;

//let us work on the tempearture
weatherDataE1.querySelector(
    ".temperature"
).textContent = `${temperature}°C`;

//let us work on the description(sunny)
weatherDataE1.querySelector(".description").textContent = description;

//lets work on the feels like, humidity and wind speed
weatherDataE1.querySelector(".details").innerHTML = details
.map((details) => `<div>${details}</div>`)
.join(""); 

    } catch (error) {

        //incase you input wrong country or misspelt
        weatherDataE1.querySelector(".icon").innerHTML = "";
        weatherDataE1.querySelector(".temperature").textContent = "";
        weatherDataE1.querySelector(".description").textContent = 
        "An error happened, please try again later";
       
        weatherDataE1.querySelector(".details").innerHTML = "";
     
            
    }
}






























