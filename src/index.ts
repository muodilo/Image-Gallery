interface image {
    id:string;
    author:string;
    width:number;
    height:number;
    url:string;
    downlaod_url:string;
}

const gallery = document.getElementById('gallery');


let images:image[] = []


const fetchImages = async()=>{
    try {
        const data = await fetch('https://picsum.photos/v2/list?page=1');
        images = await data.json();
        console.log(images);
        renderImages()
    } catch (error) {
        console.log(error);
    }
}

const renderImages = ()=>{
    images.forEach((img,index)=>{
        const thumbNail = `https://picsum.photos/id/${img.id}/200/150`
        const imageGrid = document.createElement('div');
        imageGrid.className='rounded-lg overflow-hidden shadow-lg'
        const gridImage = document.createElement('img');
        gridImage.className = 'w-full cursor-pointer hover:scale-150 transition duration-500'
        gridImage.src = thumbNail;
        imageGrid.appendChild(gridImage);
        gallery?.appendChild(imageGrid);

        gridImage.addEventListener('click',()=>{
            openLightbox(index)
        })

    })
}

const openLightbox = (index:number)=>{
    const lightbox = document.getElementById('lightbox')! 
    const lightboxImg = document.getElementById('lightbox-img')! as HTMLImageElement;

    lightbox.classList.remove('hidden');
    const imageUrl = `https://picsum.photos/id/${index}/5000/3333`
    lightboxImg.src = imageUrl
    console.log(imageUrl);
}

fetchImages()