
const APIkey = "";//Put your API key here
const search = document.querySelector(".search");
const searchIcon = document.getElementById("searchicon");
const currentDate = document.querySelector(".date");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const icon = document.getElementById("icon");
const weather = document.querySelector(".weather");
const maintemp = document.querySelector(".maintemp");
const hightemp = document.getElementById("hightemp");
const lowtemp= document.getElementById("lowtemp");

/**
 * Get formatted current date
 * @returns {string} Date in format "Apr 8th, 2026"
 */
function getDate(){
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${month} ${day}${suffix}, ${year}`;
}

/**
 * Fetch and display weather info for a city
 * @param {string} cityname - Name of the city
 */
const weatherInfo = async (cityname)=>{

    try{
        // Fetch weather data from API
        const infopromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&APPID=${APIkey}&units=metric`, 
        {headers:
            {Accept: "application/json"}
            }
        );

        const info = await infopromise.json();
        // Update DOM with weather data
        currentDate.innerHTML = getDate();
        city.innerHTML = info.name;
        country.innerHTML = info.sys.country;
        icon.src = `https://openweathermap.org/img/wn/${info.weather[0].icon}.png`;
        weather.innerHTML = info.weather[0].description;
        maintemp.innerHTML = info.main.temp +"°C";
        hightemp.innerHTML = info.main.temp_max +"°C";
        lowtemp.innerHTML = info.main.temp_min +"°C";

    }
    catch(error){
        // Display error state
        currentDate.innerHTML = getDate();
        city.innerHTML = "City not found";
        country.innerHTML = "Country: ???";
        icon.src = `https://openweathermap.org/img/wn/04d@2x.png`;
        weather.innerHTML = "??????";
        maintemp.innerHTML = "__°C";
        hightemp.innerHTML = "__°C";
        lowtemp.innerHTML = "__°C";
    }
    
};

// Initial load with default city
weatherInfo("Yaoundé");

// Event listener for search
searchIcon.addEventListener("click", function(){
    const cityname = search.value;
    weatherInfo(cityname);
})


