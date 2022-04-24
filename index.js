function signUp() {
    let now = new Date();
    let currenthour = now.getHours();
    if (currenthour < 10) {
      currenthour = `0${currenthour}`;
    }
    let currentmnt = now.getMinutes();
    if (currentmnt < 10) {
      currentmnt = `0${currentmnt}`;
    }
    let days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY"
    ];
    let currentDay = days[now.getDay()];
    let li = document.querySelector(".descDate");
    li.innerHTML = `${currentDay} ${currenthour}:${currentmnt}`;
  }
  function weekTemperature(lon, lat) {
    let apiKey = "a2e0cfbfe5d276ae777464db6e6424f7";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showweekTemperature);
  }
  
  function showweekTemperature(response) {
    const weeklyWeather = response.data.daily;
    console.log(weeklyWeather);
    document.querySelector(".monTemp").innerHTML = `${Math.round(
      weeklyWeather[0].temp.day
    )}°C`;
    document.querySelector(".tueTemp").innerHTML = `${Math.round(
      weeklyWeather[1].temp.day
    )}°C`;
    document.querySelector(".wedTemp").innerHTML = `${Math.round(
      weeklyWeather[2].temp.day
    )}°C`;
    document.querySelector(".thuTemp").innerHTML = `${Math.round(
      weeklyWeather[3].temp.day
    )}°C`;
    document.querySelector(".friTemp").innerHTML = `${Math.round(
      weeklyWeather[4].temp.day
    )}°C`;
    document.querySelector(".satTemp").innerHTML = `${Math.round(
      weeklyWeather[5].temp.day
    )}°C`;
    document.querySelector(".sunTemp").innerHTML = `${Math.round(
      weeklyWeather[6].temp.day
    )}°C`;
  }
  function showTemperature(response) {
    // console.log(response.data);
    let currentTemp = document.querySelector(".tempNum");
    let tempert = Math.round(response.data.main.temp);
    currentTemp.innerHTML = `${tempert} °C`;
    let percipitation = document.querySelector(".percipitation");
    let percipcurrent = response.data.wind.deg;
    percipitation.innerHTML = `percipitation:${percipcurrent}%`;
    let humidity = document.querySelector(".humidity");
    let humidCurrent = response.data.main.humidity;
    humidity.innerHTML = `humidity:${humidCurrent}`;
    let wind = document.querySelector(".wind");
    let windSpeed = response.data.wind.speed;
    wind.innerHTML = `wind:${windSpeed} km/h`;
    let percipDescrip = document.querySelector(".cloudDiv");
    percipDescrip.innerHTML = response.data.weather[0].description;
    let h1 = document.querySelector(".descDiv");
    h1.innerHTML = response.data.name;
    document.querySelector(".inputCity").value = response.data.name;
    signUp();
    weekTemperature(response.data.coord.lon, response.data.coord.lat);
  }
  
  function getCurrentLocation(position) {
    let apiKey = "a2e0cfbfe5d276ae777464db6e6424f7";
    let unit = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function searchButtonFunction(event) {
    event.preventDefault();
    const city = document.querySelector(".inputCity").value;
    let apiKey = "a2e0cfbfe5d276ae777464db6e6424f7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function currentButtonFunction(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
  const searchbutton = document.querySelector(".searchBtn");
  const currentbutton = document.querySelector(".currentBtn");
  
  searchbutton.addEventListener("click", searchButtonFunction);
  currentbutton.addEventListener("click", currentButtonFunction);
  