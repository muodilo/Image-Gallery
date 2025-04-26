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
const gallery = document.getElementById('gallery');
let images = [];
const fetchImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch('https://picsum.photos/v2/list?page=1');
        images = yield data.json();
        console.log(images);
        renderImages();
    }
    catch (error) {
        console.log(error);
    }
});
const renderImages = () => {
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
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imageUrl = `https://picsum.photos/id/${index}/5000/3333`;
    lightboxImg.src = imageUrl;
    lightbox.classList.remove('hidden');
    console.log(imageUrl);
};
fetchImages();
