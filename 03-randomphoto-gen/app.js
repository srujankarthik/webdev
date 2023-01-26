const api_key = "oZBvl5kfmzSmNunjEntWZnxX7rPjagzqLCZY0k4YhwC6OgKXIVlY8clU";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreBtn = document.querySelector(".more");
let searchVal;
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener("input", updateInput);

// check for user input val
function updateInput(e) {
  searchVal = e.target.value;
}

// submit it to the searchPhotos which retrieves data using query params for search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchVal;
  searchPhotos(searchVal);
});

// more photos btn
moreBtn.addEventListener("click", loadMore);

// curated real time photos link
const curatedPhotos = "https://api.pexels.com/v1/curated?per_page=10&page=1";

async function fetchAPI(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: api_key,
    },
  });
  const data = await response.json();
  return data;
}

function renderImageList(data) {
  const { photos } = data;
  photos.map((photo) => {
    const galleryImages = document.createElement("div");
    galleryImages.classList.add("galleryImages");
    galleryImages.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
      `;
    gallery.appendChild(galleryImages);
  });
}

async function fetchCuratedPhotos() {
  const fetchLink = curatedPhotos;
  const data = await fetchAPI(fetchLink);
  renderImageList(data);
}

async function searchPhotos(query) {
  clearGalleryOnSearch();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&page=1`;
  const data = await fetchAPI(fetchLink);
  renderImageList(data);
}

function clearGalleryOnSearch() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=10&page=${page}`;
  }
  const data = await fetchAPI(fetchLink);
  renderImageList(data);
}

fetchCuratedPhotos();
