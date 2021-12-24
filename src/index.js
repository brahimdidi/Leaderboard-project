import './style.css';

const createGame = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Bamo' }),
  });
};
export default createGame;

// selceting elements
const form = document.querySelector('.form');
const listContainer = document.querySelector('.rs-list');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const refreshBtn = document.querySelector('.refresh');

const postData = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3AghM3bOBvaWZMm7pTqE/scores/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: nameInput.value, score: scoreInput.value }),
  });
};
const getResults = async () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3AghM3bOBvaWZMm7pTqE/scores/';
  const data = await fetch(url);
  const items = await data.json();
  return items.result;
};
const display = async () => {
  listContainer.innerHTML = '';
  const data = await getResults();
  const myList = data.map((item) => {
    const listItems = `<li class="name-score"><p>${item.user} : </p> <p> ${item.score}</p></li>`;
    return listItems;
  });
  listContainer.innerHTML = myList.join('');
};

document.addEventListener('DOMContentLoaded', () => {
  refreshBtn.addEventListener('click', async () => {
    display();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    postData();
    nameInput.value = '';
    scoreInput.value = '';
  });
  display();
});