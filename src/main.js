import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';

const form = document.querySelector('#search-form');
const input = form.querySelector('input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    return;
  }

  clearGallery();
  showLoadingIndicator();

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      showNoResultsMessage();
    } else {
      renderImages(data.hits);
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoadingIndicator();
  }
});

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadingIndicator() {
  loader.classList.remove('hidden');
}

function hideLoadingIndicator() {
  loader.classList.add('hidden');
}

function showNoResultsMessage() {
  iziToast.info({
    title: 'Sorry!',
    message: 'No images found for your search. Please try a different query!',
  });
}

function renderImages(images) {
  const masImg = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
          <a class="gallery-item" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info info-wrap">
              <p class="info-item info-item-css"><b>Likes:</b> ${likes}</p>
              <p class="info-item info-item-css"><b>Views:</b> ${views}</p>
              <p class="info-item info-item-css"><b>Comments:</b> ${comments}</p>
              <p class="info-item info-item-css"><b>Downloads:</b> ${downloads}</p>
            </div>
          </a>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', masImg);

  const SLB = new SimpleLightbox('.gallery a');
  SLB.refresh();
}
