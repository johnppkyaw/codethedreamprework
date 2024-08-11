import myAPIKeys from './myAPIKeys.js';

document.addEventListener('DOMContentLoaded', () => {
  const ts = "" + Date.now();
  const data = ts + myAPIKeys.private + myAPIKeys.public;

  //creates hash using timestamp, privatekey, and publickey
  const hash = CryptoJS.MD5(data).toString();

  fetch(`https://gateway.marvel.com/v1/public/comics?orderBy=name&limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`)
    .then(data => data.json())
    .then(result =>  {
      let totalChar;
      let currOffset;
      let startsWith;
      let currLetter;

      //After loading the characters, add the buttons
      const lettersDiv = document.getElementById('letters');
      const navList = ['Prev', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Next'];
      for (const letter of navList) {
        const eachLetter = document.createElement('div');
        eachLetter.setAttribute('class', 'each-letter');
        eachLetter.innerText = letter;
        eachLetter.onclick = (e) => {
          startsWith = e.target.innerText.toLowerCase();
          renderList(startsWith);
        }
        lettersDiv.appendChild(eachLetter);
      }
                    
      totalChar = result.data.total;
      currOffset = result.data.offset;
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
      function renderList(buttonClicked) {
        let urlString;
        if(!currLetter) {
          urlString = `https://gateway.marvel.com/v1/public/comics?orderBy=name&limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`;
        } else {
          urlString = `https://gateway.marvel.com/v1/public/comics?orderBy=name&nameStartsWith=${currLetter}&limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`;
        }

        //previous button
        if(buttonClicked === 'prev') {
          //if currOffset - 10 >= 0
          if(currOffset - 20 >= 0) {
            //update currOffset and add to urlString
            currOffset = currOffset - 20;
            urlString += `&offset=${currOffset}`;
            //fetch and reload result
            fetchAndReload(urlString);
          }
          return;
        }

        //next button
        if(buttonClicked === 'next') {
          //if currOffset + 20 < totalChar
          if(currOffset + 20 < totalChar) {
            //update currOffset and add to urlString
            currOffset = currOffset + 20;
            urlString += `&offset=${currOffset}`;
            //fetch and reload result
            fetchAndReload(urlString);
          }
          return;
        }
        //neither next or prev
          currLetter = buttonClicked;
          //update currOffset to 0;
          currOffset = 0;
          //update urlString
          urlString = `https://gateway.marvel.com/v1/public/comics?orderBy=name&nameStartsWith=${currLetter}&limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`;
          //fetch and reload
          fetchAndReload(urlString);
          return;
      }

      function fetchAndReload(url) {
        comics.innerHTML = "";
        fetch(url)
          .then(data => data.json())
          .then(result => {
            //update total number of data with the result.data.total;
            totalChar = result.data.total;
            result.data.results.forEach(comic => {
              const comicContainer = document.createElement('div');
              comicContainer.setAttribute('class', 'each-comic');

              const nameDiv = document.createElement('div');
              nameDiv.setAttribute('class', 'comic-name');
              nameDiv.innerText = comic.name;

              const picDiv = document.createElement('div');
              picDiv.setAttribute('class', 'each-picture');
              picDiv.style.backgroundImage = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`

              comicContainer.appendChild(nameDiv);
              comicContainer.appendChild(picDiv);

              comics.appendChild(charContainer);
            })
          })
        return;
      }
    })
})
