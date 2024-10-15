// MARK: Imports
import CarouselSingle from "./components/CarouselSingle";
import Option from "./components/Option";

// MARK: DOM Selection
const heading = document.querySelector("h1");
const dogsListDisplay = document.querySelector(".dogs-list-display");
const carouselContainer = document.querySelector(".carousel-inner");

// Variables
const BASE_URI = `https://dog.ceo/api`;

// MARK: Fetch
// This function gets all the dogs from the api
async function getDogList() {
  try {
    const res = await fetch(`${BASE_URI}/breeds/list/all`);
    const data = await res.json();
    return [...Object.keys(data.message)];
  } catch (error) {
    console.error("Found an error", error);
    heading.textContent = "Sorry the API is not responding!";
  }
}

// This function gets a dog info on breed
async function getSpecificDog(breed) {
  try {
    const res = await fetch(`${BASE_URI}/breed/${breed.toLowerCase()}/images`);
    const data = await res.json();
    return data.message.slice(0, 5);
  } catch (error) {
    console.error("Error occured", error);
  }
}

// MARK: Render
// Render list of dogs in search
function renderDogList(data) {
  const documentFragement = document.createDocumentFragment();
  data.forEach((dog) => {
    documentFragement.appendChild(Option(dog));
  });
  dogsListDisplay.appendChild(documentFragement);
}

// Render a specific dog image
function renderDog(imagesList, breed) {
  carouselContainer.innerHTML = "";

  const documentFragment = document.createDocumentFragment();

  imagesList.forEach((url, idx) => {
    const singleCarousel = CarouselSingle(url, breed, idx === 0);
    documentFragment.appendChild(singleCarousel);
  });

  carouselContainer.appendChild(documentFragment);
}

// This function fires off on inital render
async function initalRender() {
  const dogList = await getDogList();
  renderDogList(dogList);
}

initalRender();

// MARK: Handlers
dogsListDisplay.addEventListener("change", async (e) => {
  renderDog(["/loading.gif", "Loading..."]);

  // Fetch current dog and render on image
  const currentInput = e.target.value;
  const dogData = await getSpecificDog(currentInput);
  console.log(dogData);
  renderDog(dogData, currentInput);
});
