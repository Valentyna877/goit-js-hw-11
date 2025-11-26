import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="meta">
          <div class="meta-item">
            <span class="meta-label">Likes</span>
            <span class="meta-value">${likes}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Views</span>
            <span class="meta-value">${views}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Comments</span>
            <span class="meta-value">${comments}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Downloads</span>
            <span class="meta-value">${downloads}</span>
          </div>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
  loaderEl.setAttribute('aria-busy', 'true');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
  loaderEl.setAttribute('aria-busy', 'false');
}