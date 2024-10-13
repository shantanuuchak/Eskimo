// MARK: Imports
import { capitalize } from "./utils";

// MARK: DOM Selection
const heading = document.querySelector("h1");
const dogsListDisplay = document.querySelector(".dogs-list-display");
const dogImgDisplay = document.querySelector(".dog-img-display");

// Variables
const BASE_URI = `https://dog.ceo/api`;

// MARK: Fetching Logic
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
    return data.message[0];
  } catch (err) {
    console.error("not found");
  }
}

// MARK: Rendering Functions
// Render list of dogs in search
function renderDogList(data) {
  const documentFragement = document.createDocumentFragment();
  data.forEach((dog) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = capitalize(dog);
    documentFragement.appendChild(optionEl);
  });
  dogsListDisplay.appendChild(documentFragement);
}

// Render a specific dog image
function renderDog(imgSrc, breed) {
  dogImgDisplay.src = imgSrc;
  dogImgDisplay.alt = breed;
}

// This function fires off on inital render
async function initalRender() {
  const dogList = await getDogList();
  renderDogList(dogList);
}

initalRender();

// MARK: Handlers
dogsListDisplay.addEventListener("change", async (e) => {
  const currentInput = e.target.value;
  const dogData = await getSpecificDog(currentInput);
  renderDog(dogData, currentInput);
});
