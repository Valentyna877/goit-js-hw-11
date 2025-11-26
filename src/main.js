import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

import successicon from '/img/check.svg';
import erroricon from '/img/error.svg';
import cautionicon from '/img/caution.svg';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(formEl);
    const query = (formData.get('search-text') || '').trim();

    if (!query) {
        iziToast.warning({
            title: 'Caution',
            message: 'Please enter a search query.',
            position: 'topRight',
            timeout: 2500,
            iconUrl: cautionicon,
            messageColor: '#fafafb',
            messageSize: '16',
            titleWeight: '700',
            backgroundColor: '#ffa000',
            progressBarColor: '#bb7b10',
            theme: 'dark',
            close: true,
            class: "my-toast",
        });
        return;
    }

    showLoader();
    clearGallery();

    getImagesByQuery(query)
        .then(data => {
            const { hits = [] } = data;

            if (!hits.length) {
                iziToast.info({
                    title: '',
                    message: 'Sorry, there are no images matching<br> your search query. Please try again!',
                    position: 'topRight',
                    iconUrl: erroricon,
                    messageColor: '#fafafb',
                    messageSize: '16',
                    titleWeight: '700',
                    backgroundColor: '#ef4040',
                    progressBarColor: '#b51b1b',
                    timeout: 3000,
                    maxWidth: 432,
                    theme: 'dark',
                    close: true,
                    class: "my-toast",
                });
                return;
            }
            
            createGallery(hits);
            
            iziToast.success({
                title: 'Success',
                titleSize: '16',
                titleWeight: '700',
                message: `Found ${hits.length} images for "${query}".`,
                position: 'topRight',
                iconUrl: successicon,
                position: "topRight",
                backgroundColor: '#59a10d',
                messageColor: '#fff',
                messageSize: '16',
                theme: 'dark',
                close: true,
                class: "my-toast",
                timeout: 2000,
            });
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong. Please try again later.',
                position: 'topRight',
                timeout: 3000,
                messageSize: '16',
                messageColor: '#fff',
                theme: 'dark',
                close: true,
                class: "my-toast",
                backgroundColor: '#b51b1b',
            });
        })
        .finally(() => {
            hideLoader();
            formEl.reset();
        });
});

const scrollBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  formEl.scrollIntoView({ behavior: 'smooth' });
});