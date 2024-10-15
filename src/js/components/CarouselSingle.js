export default function (src, name, active = false) {
  const div = document.createElement("div");
  div.classList.add("carousel-item", active && "active");
  div.innerHTML = `<img src="${src}" class="d-block w-100" alt="${name}" />`;
  return div;
}
