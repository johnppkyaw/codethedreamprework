## Instructions
### 1. Download/Clone the repo.

### 2. In the terminal, `cd` into the project folder.

### 3. `npm install` inside the folder to install CryptoJS.

### 4. Get your Marvel public and private api key:
#### By Signing up an account at https://developer.marvel.com/

### 5. Create a js file with the name myAPIKeys in the same directory as index.js and add the following code:

``` 
const myAPIKeys = {
  //the value of public is your public api 
  public: '',
  //the value of private is your private api
  private: ''
};

export default myAPIKeys;
```
### 6. Open index.html to access the project

## Note: It takes about a minute to get the response from the fetch api calls with Marvel API.

## Note: The first two results in comics have a leading space as a typo in the title which causes an issue with sorting the result by title:
        ```
        "id": 91992,
        "digitalId": 56203,
        "title": " Fantastic Four by Dan Slott Vol. 1 (Trade Paperback)"

        "id": 71400,
        "digitalId": 53332,
        "title": " Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)"
        ```
