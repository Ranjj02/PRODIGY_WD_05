const apiKey="a933bb756eb3e38cd76c8b4d1e2fc895";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//const city = document.getElementById("cityInput").value; // Get the city name from the input field
//const serbut = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none"
    }
    else{

    
    var data = await response.json();
    // Update HTML elements with weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    if (data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if (data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if (data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if (data.weather[0].main=="Mist")
    {
        weatherIcon.src="images/mist.png";
    }
    else if (data.weather[0].main=="Rain")
    {
            weatherIcon.src="images/rain.png";
    }
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none"

}
}

const cityInput = document.getElementById("cityInput");
const searchButton = document.querySelector("button");
const currentLocationButton = document.getElementById("currentLocationButton");

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    console.log("User entered city:", city);
    checkWeather(city);
});
currentLocationButton.addEventListener("click", () => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                // Make an API call to OpenWeatherMap Geocoding API
                const geoApiUrl = `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                const response = await fetch(geoApiUrl);
                const data = await response.json();

                // Extract city name from the API response
                const city = data.name;

                if (city) {
                    // Call checkWeather with the city name
                    console.log("Current city:", city);
                    checkWeather(city);
                } else {
                    console.log("City not found in geocoding response.");
                }
            } catch (error) {
                console.error("Error fetching geocoding data:", error);
            }
        });
    } else {
        // Geolocation not available
        console.log("Geolocation is not supported by this browser.");
    }
});

