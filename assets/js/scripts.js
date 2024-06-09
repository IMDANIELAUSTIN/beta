const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = galleryItems[index].src;
    caption.innerHTML = galleryItems[index].alt;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    caption.innerHTML = galleryItems[currentIndex].alt;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    caption.innerHTML = galleryItems[currentIndex].alt;
});

window.addEventListener('click', (event) => {
    if (event.target == lightbox) {
        lightbox.style.display = 'none';
    }
});