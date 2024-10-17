// Imports
import Option from "./components/Option";
import CarouselSingle from "./components/CarouselSingle";

// DOM Selection
const heading = document.querySelector("h1");
const dogsListDisplay = document.querySelector("select");
const carouselContainer = document.querySelector(".carousel-inner");

// Variables
const BASE_URI = `https://dog.ceo/api`;
let currentDog = "eskimo";

// === MARK: Fetch
// Get dog breeds from api and cache in localstorage
async function getDogList() {
  let breeds = JSON.parse(localStorage.getItem("breeds"));

  if (!breeds) {
    try {
      const res = await fetch(`${BASE_URI}/breeds/list/all`);
      const data = await res.json();
      breeds = [...Object.keys(data.message)];
      localStorage.setItem("breeds", JSON.stringify(breeds));
    } catch (error) {
      console.error("Found an error", error);
      heading.textContent = "Sorry the API is not responding!";
    }
  }

  return breeds;
}

// Get images list for a particular dog
async function getBreedImages(breed) {
  try {
    const res = await fetch(`${BASE_URI}/breed/${breed}/images`);
    const data = await res.json();
    return data.message.slice(0, 10);
  } catch (error) {
    console.error("Error occured", error);
  }
}

// === MARK: Render
// Render list of dogs as search options
async function renderDogOption() {
  const dogsList = await getDogList();

  const documentFragement = document.createDocumentFragment();

  dogsList.forEach((dog) => {
    documentFragement.appendChild(Option(dog, dog === currentDog));
  });

  dogsListDisplay.appendChild(documentFragement);
}

// Render image carousels
async function renderDogCarousel(breed) {
  const images = await getBreedImages(breed);

  carouselContainer.innerHTML = "";
  const documentFragment = document.createDocumentFragment();

  images.forEach((url, idx) => {
    const singleCarousel = CarouselSingle(url, breed, idx === 0);
    documentFragment.appendChild(singleCarousel);
  });

  carouselContainer.appendChild(documentFragment);
}

// === MARK: Handlers
dogsListDisplay.addEventListener("change", async (e) => {
  const currInput = e.target.value;
  renderDogCarousel(currInput);
});

// Inital Rendering
document.addEventListener("DOMContentLoaded", () => {
  renderDogOption();
  renderDogCarousel(currentDog); // load "Eskimo"
});
