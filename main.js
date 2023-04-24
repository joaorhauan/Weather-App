const container = document.querySelector(".container");
const search = document.querySelector(".search_box button");
const weather_box = document.querySelector(".weather_box");
const weather_details = document.querySelector(".weather_details");
const error404 = document.querySelector(".not_found");

search.addEventListener("click", () => {
  const API_key = "1dbd46733f231ae82f0aaeacb31a5a99";
  const city = document.querySelector('.search_box input').value;
  console.log(city)

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json)

      const lat = json[0].lat;
      const lon = json[0].lon;
      console.log(lat+' '+lon)

      if (city == "") {
        return;
      }

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.cod === "404") {
            container.style.height = "400px";
            weather_box.style.display = "none";
            weather_details.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fade_in");
            return;
          }

          error404.style.display = "none";
          error404.classList.remove("fade_in");

          const image = document.querySelector(".weather_box img");
          const temperature = document.querySelector(
            ".weather_box .temperature"
          );
          const description = document.querySelector(
            ".weather_box .description"
          );
          const humidity = document.querySelector(
            ".weather_details .humidity span"
          );
          const wind = document.querySelector(".weather_details .wind span");

          switch (json.weather[0].main) {
            case "Clear":
              image.src = "img/clear.png";
              break;

            case "Rain":
              image.src = "img/rain.png";
              break;

            case "Clouds":
              image.src = "img/cloud.png";
              break;

            case "Haze":
              image.src = "img/mist.png";
              break;

            case "Snow":
              image.src = "img/snow.png";
              break;

            default:
              image.src = "";
          }

          temperature.innerHTML = `${parseInt(json.main.temp) - 273}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

          weather_box.style.display = "";
          weather_details.style.display = "";
          weather_box.classList.add("fade_in");
          weather_details.classList.add("fade_in");
          container.style.height = "590px";
          weather_box.style.opacity = '1';
          weather_box.style.scale = '1';
          weather_details.style.opacity = '1';
          weather_details.style.scale = '1';
        });
    });
});
