import myAPIKeys from './myAPIKeys.js';

const ts = "" + Date.now();
const data = ts + myAPIKeys.private + myAPIKeys.public;

//creates hash using timestamp, privatekey, and publickey
const hash = CryptoJS.MD5(data).toString();

fetch(`https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=20&ts=${ts}&apikey=${myAPIKeys.public}&hash=${hash}`)
    .then(data => data.json())
    .then(result =>  {
      let totalChar;
      let currOffset;
      let startsWith;

      //After loading the characters, add the buttons
      const lettersDiv = document.getElementById('letters');
      const navList = ['Prev', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Next'];
      for (const letter of navList) {
        const eachLetter = document.createElement('div');
        eachLetter.setAttribute('class', 'each-letter');
        eachLetter.innerText = letter;
        eachLetter.onclick = (e) => {
          renderList(e.target.innerText);
        }
        lettersDiv.appendChild(eachLetter);
      }
                    
      totalChar = result.data.total;
      currOffset = result.data.offset;
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

      function renderList(buttonClicked) {
        let urlString = "";
        //previous button
        if(buttonClicked === 'Prev') {
          //if currOffset - 10 >= 0
            //update currOffset
            //fetch and reload result
          console.log('Prev clicked')
          return;
        }

        //next button
        if(buttonClicked === 'Next') {
          //if currOffset + 20 <= totalChar
            //update currOffset
            //fetch and reload result
          console.log('Next clicked')
          return;
        }

        //neither next or prev
          //update startsWith
          startsWith = buttonClicked.toLowerCase();
          //update totalChar
          totalChar = 0;
          //update currOffset to 0;
          currOffset = 0;
          //fetch and reload
          fetchAndReload(url);
          return;
      }

      function fetchAndReload(url) {
        fetch(url)
          .then(data => data.json())
          .then(result => {
            character.innerHTML = "";
            totalChar = result.data.total;
            currOffset = result.data.offset;
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
      }
    })
