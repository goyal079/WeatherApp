const loc = document.getElementById("location");
const mainTemp = document.getElementById("prime-temp");
const min = document.getElementById("min");
const max = document.getElementById("max");
const feelsLike = document.getElementById("temp-like");
const humidity = document.getElementById("humid");
const windSpeed = document.getElementById("wind");
const visibility = document.getElementById("visible");
const city = document.getElementById("city");
const modal = document.getElementById("modal");
const btn = document.getElementById("btn");
const search = document.getElementById("search");
const day = document.getElementById("day");
const time = document.getElementById("time");


function changeWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a426dd50b8b4887bd4328c35f555359f`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let temp = Math.round(data.main.temp);
      let minTemp = Math.floor(data.main.temp_min);
      let maxTemp = Math.ceil(data.main.temp_min);
      let tempLike = Math.round(data.main.feels_like);
      mainTemp.innerHTML = `${temp}&#176;`;
      min.innerHTML = `${minTemp}&#176;`;
      max.innerHTML = `${maxTemp}&#176;`;
      feelsLike.innerHTML = `${tempLike}&#176;`;
      return data;
    })
    .then((data) => {
      let humid = data.main.humidity;
      humidity.innerText = humid + "%";
      return data;
    })
    .then((data) => {
      let wind = data.wind.speed;
      windSpeed.innerText = wind + "km/h";
      return data;
    })
    .then((data) => {
      let visible = data.visibility / 1000;
      visibility.innerText = visible + "km";
    });
}
search.addEventListener("click", () => {
  modal.style.display = "block";
});

// Day & Time of the day

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const dayOfWeek = document.getElementById("weekday");
const dayOfMonth = document.getElementById("month");

function clockwidget(city) {
  let url = `https://timezone.abstractapi.com/v1/current_time/?api_key=3833118c05c5443aa1ec7aeef74b2948&location=${city}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let today = new Date();
      today = weekday[today.getDay()];
      day.innerText = `${today}`;
      dayOfWeek.innerText = today + ",";
      return data.datetime;
    })
    .then((dnT) => {
      let date = dnT.split(" ")[0];
      let day = date.split("-")[2];
      let dateValue = date.split("-")[1];
      dayOfMonth.innerHTML = `${day}<sup>th</sup> ${months[dateValue - 1]}`;
      return dnT;
    })
    .then((dnT) => {
      let widget = dnT.split(" ")[1];
      let widgetArr = widget.split(":");
      hour.innerText = widgetArr[0];
      let hourCount = Number(widgetArr[0]);

      switch (true) {
        case hourCount > 4 && hourCount < 12:
          time.innerText = "MORNING";
          break;
        case hourCount > 12 && hourCount < 18:
          time.innerText = "NOON";
          break;
        case hourCount > 18 && hourCount < 21:
          time.innerText = "EVENING";
          break;
        case hourCount > 21 || hourCount < 4:
          time.innerText = "NIGHT";
      }
      minute.innerText = widgetArr[1];
    });
}

city.addEventListener("input", (e) => {
  btn.addEventListener("click", () => {
    let cityName = city.value;
    loc.innerText = cityName;
    modal.style.display = "none";
    changeWeather(cityName);
    clockwidget(cityName);
  });
});
