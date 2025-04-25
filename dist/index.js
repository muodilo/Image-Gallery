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
        console.log('failed to fetch images');
    }
});
const renderImages = () => {
    images.forEach((img) => {
        const thumbNail = `https://picsum.photos/id/${img.id}/200/150`;
        const imageGrid = document.createElement('div');
        const gridImage = document.createElement('img');
        gridImage.src = thumbNail;
        imageGrid.appendChild(gridImage);
        gallery === null || gallery === void 0 ? void 0 : gallery.appendChild(imageGrid);
    });
};
fetchImages();
