let d = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.getElementById("date").innerHTML =
  d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let parameter = document.querySelector(".parameter");
  let tempChange = document.querySelector(".temperature");
  let humidity_data = document.querySelector(".humidity-data");
  let wind_speed = document.querySelector(".wind-speed");
  let zone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2b439af83136eb38811dae6ad225a065`;
      console.log(api);

      fetch(api)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          const { temp, humidity } = data.main;
          const { speed } = data.wind;
          const { description, icon } = data.weather[0];
          const { name } = data;

          let t = Math.round(temp - 273);
          temperatureDegree.textContent = t;

          zone.innerHTML = `${name}`;

          //=============== Showing data in html =================//
          humidity_data.textContent = "Humidity: " + humidity;

          wind_speed.textContent = "Wind Speed: " + speed;

          temperatureDescription.textContent = description;

          //======================= Icon ========================//
          const skycons = new Skycons({ color: "#f08080" });
          console.log(icon);
          skycons.play();
          switch (icon) {
            case "01d":
              skycons.set("icon1", Skycons.CLEAR_DAY);
              break;

            case "01n":
              skycons.set("icon1", Skycons.CLEAR_NIGHT);
              break;

            case "03d":
              skycons.set("icon1", Skycons.PARTLY_CLOUDY_DAY);
              break;

            case "03n":
              skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
              break;

            case "04d":
              skycons.set("icon1", Skycons.CLOUDY);
              break;

            case "04n":
              skycons.set("icon1", Skycons.CLOUDY);
              break;

            case "09d":
              skycons.set("icon1", Skycons.RAIN);
              break;

            case "09n":
              skycons.set("icon1", Skycons.RAIN);
              break;

            case "10d":
              skycons.set("icon1", Skycons.SLEET);
              break;

            case "10n":
              skycons.set("icon1", Skycons.SLEET);
              break;

            case "13n":
              skycons.set("icon1", Skycons.SNOW);
              break;

            case "13d":
              skycons.set("icon1", Skycons.SNOW);
              break;

            case "50n":
              skycons.set("icon1", Skycons.FOG);
              break;
          }

          tempChange.addEventListener("click", () => {
            let f;
            f = t * (9 / 5) + 32;
            f = Math.round(f);

            if (parameter.textContent === "F") {
              temperatureDegree.textContent = t;
              parameter.textContent = "C";
            } else if (parameter.textContent === "C") {
              temperatureDegree.textContent = f;
              parameter.textContent = "F";
            }
          });
        });
    });
  }
});
