import './style.css';
import Swal from 'sweetalert2';

const elementBtn = document.querySelector('#button');
const elementcontent = document.querySelector('#content');
const elementInput = document.querySelector('#moeda');
const elementAudio = document.querySelector('#audio');

elementBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const moeda = elementInput.value;

  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.base !== moeda.toUpperCase()) {
        throw new Error('Moeda não existente!');
      }
      const audio = elementAudio;
      audio.play();

      const newArr = Object.entries(data.rates);

      const newArr2 = [];

      newArr.forEach((currancy) => {
        const newDiv = document.createElement('div');
        const [name, value] = currancy;
        if (newArr2.length !== 0) {
          elementcontent.appendChild(newDiv);
          newDiv.className = 'divs';
          newArr2.push(currancy);
          newDiv.innerHTML = `${name} - ${value}`;
        } else {
          elementcontent.innerHTML = '';
          elementcontent.appendChild(newDiv);
          newDiv.className = 'divs';
          newArr2.push(currancy);
          newDiv.innerHTML = `${name} - ${value}`;
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Opsss..',
        text: error.message,
      });
    });
});
