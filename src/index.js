import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const homeItemsContainer = document.querySelector(".homeItemsContainer");
const templateHomeItem = document.getElementById("templateHomeItem").content;

// window.localStorage.clear();

let firstLocalStorageSave = false;

let localStorageSave = JSON.parse(window.localStorage.getItem("localStorageSave"));

if (localStorageSave == null) {
  firstLocalStorageSave = true;
}
//bucle para la cantidad de items en la pagina de inicio
if (localStorageSave != null) {
  for (let i = 0; i < localStorageSave.length; i++) {
    const clone = templateHomeItem.cloneNode(true);

    async function getUser() {
      const templateMovies = document.getElementById("templateMovies").content;

      const response = await fetch(`https://rickandmortyapi.com/api/character/${localStorageSave[i][0]}`);
      const user = await response.json();

      clone.querySelector(".userName").textContent = localStorageSave[i][1];
      clone.querySelector(".userImg").src = user.image;

      async function getMovies() {
        const img_url = "https://image.tmdb.org/t/p/w500";
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=c785d8d56d06e43e11a4ef68b7cd8ade`);
        const movie = await response.json();

        for (let j = 0; j < localStorageSave[i][2].length; j++) {
          const clone2 = templateMovies.cloneNode(true);
          console.log(i, j);
          clone2.querySelector(".movie").src = localStorageSave[i][2][j];
          clone.querySelector(".moviesContainer").appendChild(clone2);
        }

        homeItemsContainer.appendChild(clone);
      }
      getMovies();
    }
    getUser();
  }
}

for (let i = 0; i < 5; i++) {
  async function getUser() {
    function random(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const rndInt = random(1, 800);

    const moviesRandom = [];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const cntofmovies = random(1, 15);
    for (let i = 0; i < cntofmovies; i++) {
      const numberA = random(0, numbers.length - 1);
      moviesRandom.push(numbers[numberA]);
      numbers.splice(numberA, 1);
    }

    const response = await fetch(`https://rickandmortyapi.com/api/character/${rndInt}`);
    const user = await response.json();

    const clone = templateHomeItem.cloneNode(true);

    clone.querySelector(".userName").textContent = user.name;
    clone.querySelector(".userImg").src = user.image;

    async function getMovies() {
      const img_url = "https://image.tmdb.org/t/p/w500";
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=c785d8d56d06e43e11a4ef68b7cd8ade`);
      const movie = await response.json();

      const templateMovies = document.getElementById("templateMovies").content;

      for (let i = 0; i < moviesRandom.length; i++) {
        const clone2 = templateMovies.cloneNode(true);
        clone2.querySelector(".movie").src = `${img_url + movie.results[moviesRandom[i]].poster_path}`;

        clone.querySelector(".moviesContainer").appendChild(clone2);
      }
      homeItemsContainer.appendChild(clone);
    }
    getMovies();
  }

  getUser();
}

const newList = document.querySelector(".newList");
const newUserFrame = newList.querySelector(".addNewUser");
const newMoviesFrame = newList.querySelector(".addNewMovies");
const userImgsContainer = newUserFrame.querySelector(".userImgs");

const showButton = [false, false];
const guardarButton = document.querySelector(".guardarButton");

const newMovieList = () => {
  if (newList.classList.contains("open")) {
    newList.classList.remove("open");
    newList.style.height = "0";
  } else {
    newList.classList.add("open");
    newList.style.height = "28vh";
  }
  const newAvatars = () => {
    for (let i = 0; i < 8; i++) {
      //   console.log("a");
      async function getUser() {
        function random(min, max) {
          // min and max included
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const rndInt = random(1, 800);

        const response = await fetch(`https://rickandmortyapi.com/api/character/${rndInt}`);
        const user = await response.json();

        userImgsContainer.querySelectorAll("img")[i].src = user.image;
      }
      getUser();
    }
  };
  newList.querySelector(".userContainer").addEventListener("click", () => {
    newList.style.height = "52vh";
    newList.querySelector(".userContainer i").style.margin = "auto";
    newUserFrame.style.height = "21vh";
    newMoviesFrame.style.height = "0";
    newUserFrame.style.marginTop = "2vh";

    newAvatars();
  });
  let count = 1;
  userImgsContainer.querySelector(".refreshButton").addEventListener("click", () => {
    newAvatars();
    userImgsContainer.querySelector(".refreshButton i").style.transform = `rotate(${180 * count}deg)`;
    count += 1;
  });

  userImgsContainer.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      showButton[0] = true;
      if (newList.classList.contains("haveIcon")) {
        newList.querySelector(".userContainer i").remove();
        newList.classList.remove("haveIcon");
      }

      newList.querySelector(".userContainer img").src = img.src;
      newList.querySelector(".userContainer img").style.display = "block";

      if (showButton[0] == true && showButton[1] == true) {
        guardarButton.style.display = "block";
      }
    });
  });

  newUserFrame.querySelector(".nameInput").addEventListener("click", () => {
    newUserFrame.querySelector(".nameInput").placeholder = "";
  });
  newUserFrame.querySelector(".nameInput").addEventListener("focusout", () => {
    if (newUserFrame.querySelector(".nameInput").placeholder == "") {
      newUserFrame.querySelector(".nameInput").placeholder = "Ingresa tu nombre";
    }
  });
  newUserFrame.querySelector(".nameInput").addEventListener("input", () => {
    newList.querySelector(".item .userName").textContent = newUserFrame.querySelector(".nameInput").value;
  });

  newList.querySelector(".moviesContainer").addEventListener("click", () => {
    newUserFrame.style.height = "0";
    newMoviesFrame.style.height = "21vh";
    newUserFrame.style.marginTop = "0";
    newList.style.height = "52vh";
    async function getMovies() {
      const img_url = "https://image.tmdb.org/t/p/w500";
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=c785d8d56d06e43e11a4ef68b7cd8ade`);
      const movie = await response.json();

      const templateMovies = document.getElementById("templateMovies").content;
      newList.querySelector(".moviesContainer").innerHTML = "";
      newList.querySelector(".moviesContainer").style.gap = "0";
      newList.querySelector(".moviesContainer").style.margin = "unset";
      newList.querySelector(".moviesContainer").style.width = "63vw";

      for (let i = 0; i < movie.results.length; i++) {
        newMoviesFrame.querySelectorAll("img")[i].src = `${img_url + movie.results[i].poster_path}`;
        newMoviesFrame.querySelectorAll("img")[i].addEventListener("click", () => {
          showButton[1] = true;
          const clone4 = templateMovies.cloneNode(true);

          clone4.querySelector(".movie").src = newMoviesFrame.querySelectorAll("img")[i].src;
          newList.querySelector(".moviesContainer").appendChild(clone4);
          newList.querySelector(".moviesContainer").scrollLeft += 10000;
          newMoviesFrame.querySelectorAll("img")[i].style.display = "none";

          if (showButton[0] == true && showButton[1] == true) {
            guardarButton.style.display = "block";
          }
        });
      }
    }
    getMovies();
  });
};
const home = () => {
  newList.style.height = "0";
  if (newList.classList.contains("open")) {
    newList.classList.remove("open");
  } else {
    window.location.reload();
  }
};

guardarButton.addEventListener("click", () => {
  const newLocalStorage = [];
  guardarButton.style.display = "none";
  newList.style.height = "28vh";
  let imgID = newList.querySelector(".userContainer img").src.substr(-8, 3);
  if (imgID[0] == "r" || imgID[0] == "/") {
    imgID = imgID.substr(-2, 2);
  }

  if (imgID[0] == "/") {
    imgID = imgID.substr(-1, 1);
  }
  newLocalStorage.push(imgID);
  newLocalStorage.push(newList.querySelector(".userContainer .userName").textContent, []);

  newList.querySelectorAll(".moviesContainer img").forEach((img) => {
    newLocalStorage[2].push(img.src);
  });
  if (firstLocalStorageSave == true) {
    localStorageSave = [newLocalStorage];
  } else {
    localStorageSave.push(newLocalStorage);
  }
  //   console.log(localStorageSave);
  window.localStorage.setItem("localStorageSave", JSON.stringify(localStorageSave));
});

export { newMovieList };
export { home };
