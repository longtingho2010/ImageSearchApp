const accessKey = "Kx4ODeUp0_4qK1UdhU2rHXLpwb1i1Lw-55Kl_dUywlQ";
const form = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");
let page = 1;

const searchImages = async () => {
  let inputData = "";
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;
  if (page >= 1) {
    showMoreBtn.style.display = "block";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", searchImages);
