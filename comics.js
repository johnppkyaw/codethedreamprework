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
      console.log(result.data.results);
      result.data.results.forEach(comic => {
        const comicContainer = document.createElement('div');
        comicContainer.setAttribute('class', 'each-comic');

        const nameDiv = document.createElement('div');
        nameDiv.setAttribute('class', 'comic-name');
        nameDiv.innerText = comic.title;

        const picDiv = document.createElement('div');
        picDiv.setAttribute('class', 'each-picture');
        picDiv.style.backgroundImage = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`

        comicContainer.appendChild(nameDiv);
        comicContainer.appendChild(picDiv);

        comics.appendChild(comicContainer);
      })
    })
})
