console.log('Javscript is loaded...');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchElement.value;

    fetch(`/weather?address=${location}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if (jsonResponse.error) {
                messageOne.textContent = jsonResponse.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = jsonResponse.location;
                messageTwo.textContent = jsonResponse.forecast;
            }
        });
})