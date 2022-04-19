let headers = new Headers();
let urlToday = 'https://api.openweathermap.org/data/2.5/weather?lat=44.3386&lon=1.2096&units=metric&appid=e64d9c7dd06bdb3869fcd155defecf8f';
let optionsToday = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

let meteo = document.querySelector('#meteo');
let meteoImg = document.querySelector('#meteoImg');

// fetch de la meteo du jour sur l'API OpenWeather
fetch(urlToday, optionsToday)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  })
  .then((response) => {
    let icone = response.weather[0].icon;
    let temp = response.main.temp;
    let localisation = response.name;

    let img = document.createElement('img');
    img.src = 'http://openweathermap.org/img/wn/' + icone + '@4x.png';
    meteoImg.appendChild(img);

    meteo.innerText = `Il fait ${temp}°C à ${localisation} aujourd'hui.`;
  })
  .catch((err) => {
    console.log('Error Fetch openweather:', err);
  })