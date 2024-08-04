import myAPIKeys from './myAPIKeys.js';
console.log("loaded");

const ts = "1";
const data = ts + myAPIKeys.private + myAPIKeys.public;

//creates hash using timestamp, privatekey, and publickey
const hash = CryptoJS.MD5(data).toString();
console.log(`https://gateway.marvel.com/v1/public/characters?limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`);

fetch(`https://gateway.marvel.com/v1/public/characters?limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`)
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

        characters.appendChild(charContainer);
      })
    })




// movies.onclick = () => {
//   fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publickey}&hash=${data}`)
//     .then(data => data.json())
//     .then(result =>  {
//       console.log(result.data.results)
//     })
//   console.log('clicked')
// }
