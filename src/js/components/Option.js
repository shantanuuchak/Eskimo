import { capitalize } from "../utils";

export default function Option(breed, selected = false) {
  const optionEl = document.createElement("option");
  optionEl.textContent = capitalize(breed);
  optionEl.selected = selected;
  optionEl.value = breed;
  return optionEl;
}
