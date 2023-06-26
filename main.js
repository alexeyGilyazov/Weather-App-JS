//Api key
const apiKEy = '5116484e52fb4e03b45150510232606'

// search elemnt
const header = document.querySelector('.header')
const form = document.getElementById('form')
const input = document.getElementById('inputCity')
const nameCity = document.querySelector('.card-city')
const img = document.querySelector('.img')

function removeCard() {
    const prevCard = document.querySelector('.card')
    prevCard && prevCard.remove()
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html)
}


function showCard({name, country, temp, icon, condition}) {
    const html = `
            <div class="card">
                <h2 class="card-city">${name}<span>${country}</span></h2>
                    <div class="card-weather">
                        <p class="card-value">${temp}<sup>°c</sup></p>
                        <img class="img" src=${icon} alt="">
                    </div>
                    <div class="card-description">${condition}</div>
            </div>`
    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKEy}&q=${city}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
    return data
}


// send request
form.onsubmit = async function (e) {
    e.preventDefault()

    let city = input.value.trim()
    //  get data from server
    const data = await getWeather(city);

    if (data.error) {
        removeCard()
        showError(data.error.message)
    } else {
        removeCard()

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            icon: data.current.condition.icon,
            condition : data.current.condition.text,
        }

        showCard(weatherData)
    }
}

