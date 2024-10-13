// MARK: DOM Selection

// Variables
const BASE_URI = `https://dog.ceo/api`;

// MARK: Fetching Logic
// This function gets all the dogs from the api
async function getDogList() {
  const res = await fetch(`${BASE_URI}/breeds/list/all`);
  const data = await res.json();
  return [...Object.keys(data.message)];
}

// This function gets a dog info on breed
async function getSpecificDog(breed) {
  const res = await fetch(`${BASE_URI}/breed/${breed}/images`);
  const data = await res.json();
  return data.message.slice(0, 5);
}

// MARK: Rendering Functions
function renderDogList(data) {}

// This function fires off on inital render
async function initalRender() {
  const dogList = await getDogList();
  console.log(dogList);
  const getFirst = await getSpecificDog(dogList[5]);
  console.log(getFirst);
}

initalRender();
