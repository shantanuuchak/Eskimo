import { capitalize } from "../utils";

export default function Option(breed) {
  const optionEl = document.createElement("option");
  optionEl.textContent = capitalize(breed);
  optionEl.value = breed;
  return optionEl;
}
