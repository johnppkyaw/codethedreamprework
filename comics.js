import myAPIKeys from './myAPIKeys.js';

document.addEventListener('DOMContentLoaded', () => {
  const ts = "" + Date.now();
  const data = ts + myAPIKeys.private + myAPIKeys.public;

  //creates hash using timestamp, privatekey, and publickey
  const hash = CryptoJS.MD5(data).toString();
  console.log(hash);

  fetch(`https://gateway.marvel.com/v1/public/comics?limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`)
    .then(data => data.json())
    .then(result =>  {
      result.data.results.forEach(character => {
        const charContainer = document.createElement('div');
        charContainer.setAttribute('class', 'each-character');

        const nameDiv = document.createElement('div');
        nameDiv.setAttribute('class', 'character-name');
        nameDiv.innerText = character.name;

        const picDiv = document.createElement('div');
        picDiv.setAttribute('class', 'each-picture');
        picDiv.style.backgroundImage = `url(${character.thumbnail.path}.${character.thumbnail.extension})`

        charContainer.appendChild(nameDiv);
        charContainer.appendChild(picDiv);

        comics.appendChild(charContainer);
      })
    })
})
