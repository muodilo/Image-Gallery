"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const gallery = document.getElementById('gallery');
let images = [];
let loading = true;
let currentIndex = 0;
const fetchImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        showSkeletons();
        const data = yield fetch('https://picsum.photos/v2/list?page=1');
        images = yield data.json();
        console.log(images);
        loading = false;
        renderImages();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        loading = false;
    }
});
const showSkeletons = () => {
    if (gallery) {
        gallery.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse w-full min-h-35 m-2';
            gallery.appendChild(skeleton);
        }
    }
};
const renderImages = () => {
    gallery.innerHTML = '';
    images.forEach((img, index) => {
        const thumbNail = `https://picsum.photos/id/${img.id}/200/150`;
        const imageGrid = document.createElement('div');
        imageGrid.className = 'rounded-lg overflow-hidden shadow-lg';
        const gridImage = document.createElement('img');
        gridImage.className = 'w-full cursor-pointer hover:scale-150 transition duration-500';
        gridImage.src = thumbNail;
        imageGrid.appendChild(gridImage);
        gallery === null || gallery === void 0 ? void 0 : gallery.appendChild(imageGrid);
        gridImage.addEventListener('click', () => {
            openLightbox(index);
        });
    });
};
const openLightbox = (index) => {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    caption.innerText = `By ${images[currentIndex].author}`;
    const imageUrl = `https://picsum.photos/id/${images[currentIndex].id}/5000/3333`;
    lightboxImg.src = imageUrl;
    lightbox.classList.remove('hidden');
    console.log(imageUrl);
};
const closeLightbox = () => {
    var _a;
    (_a = document.getElementById('lightbox')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    console.log('clicked');
};
const showNext = () => {
    console.log('next clicked');
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
};
(_a = document.getElementById('closeBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeLightbox);
(_b = document.getElementById('nextBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', showNext);
fetchImages();
