const inputQ = document.getElementById('input-cuidad');
const button_submit = document.getElementById('btn-submit');
const cityForm = document.getElementById('weather-form');
const api_key = 'f7553ec47e971ab5843825e7bfbfde9a';
const content_container = document.getElementById('content');


const createLoading = () => {
    content_container.innerHTML = '';
    let texth1 = 'cargando...';
    let h1element = document.createElement('h1');
    h1element.textContent = texth1;
    content_container.appendChild(h1element);
}


button_submit.addEventListener('click', (e) => {
    e.preventDefault();
    createLoading();
    onSubmitHandler();
});


const getCityData = (info) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${info[0].lat}&lon=${info[0].lon}&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            content_container.innerHTML = '';
            let containerDiv = document.createElement('div');
            let titulo = document.createElement('h1');
            titulo.textContent = 'Clima: ' + data.weather[0].main;
            let cuidadText = document.createElement('h2');
            cuidadText.textContent = 'Cuidad: ' + data.name;
            let imageIcon = document.createElement('img');
            imageIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let descriptionTag = document.createElement('p');
            descriptionTag.textContent = 'Descripcion: ' + data.weather[0].description;
            let temperaturaText = document.createElement('p');
            temperaturaText.textContent = 'Temperatura: ' + (data.main.temp - 273.15).toFixed(2) + ' Celsius';
            let nubesText = document.createElement('p');
            nubesText.textContent = 'Nubosidad: ' + data.clouds.all + '%';
            let zonaHoraria = document.createElement('p');
            let horario = new Date(data.timezone);
            zonaHoraria.textContent = horario.getDay() + '/' + horario.getMonth() + '/' + horario.getFullYear() + ' at ' + horario.getHours() + ':' + horario.getMinutes();
            containerDiv.appendChild(titulo);
            containerDiv.appendChild(cuidadText);
            containerDiv.appendChild(imageIcon);
            containerDiv.appendChild(descriptionTag);
            containerDiv.appendChild(temperaturaText);
            containerDiv.appendChild(nubesText);
            containerDiv.appendChild(zonaHoraria);
            content_container.appendChild(containerDiv);
        });
}

const onSubmitHandler = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputQ.value}&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => {
            getCityData(data);
        });
}
