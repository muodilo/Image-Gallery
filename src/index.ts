interface image {
    id:string;
    author:string;
    width:number;
    height:number;
    url:string;
    downlaod_url:string;
}

const gallery = document.getElementById('gallery')!;


let images:image[] = []
let loading = true;
let currentIndex = 0;


const fetchImages = async()=>{
    try {
        showSkeletons();
        const data = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
        images = await data.json();
        console.log(images);
        loading= false
        renderImages()
    } catch (error) {
        console.log(error);
    } finally{
        loading = false
    }
}

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
const renderImages = ()=>{
    gallery.innerHTML=''
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
    currentIndex = index;
    const lightbox = document.getElementById('lightbox')! 
    const lightboxImg = document.getElementById('lightbox-img')! as HTMLImageElement;
    const caption = document.getElementById('caption')!;
    caption.innerText =`By ${images[currentIndex].author}`;
    const imageUrl = `https://picsum.photos/id/${images[currentIndex].id}/5000/3333`
    lightboxImg.src = imageUrl
    lightbox.classList.remove('hidden');
    lightbox.classList.add('fade-in')
    updateNavigationButtons()
    console.log(currentIndex);
}

const updateNavigationButtons = ()=>{
    const prevBtn = document.getElementById('prevBtn')! as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn')! as HTMLButtonElement;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length -1;
}


const closeLightbox = ()=>{
    const lightbox = document.getElementById('lightbox')!;
    lightbox.classList.add('fade-out');

    setTimeout(()=>{
        lightbox.classList.add('hidden');
        lightbox.classList.remove('fade-out')
    },500)
    console.log('clicked');
}

document.getElementById('closeBtn')?.addEventListener('click',closeLightbox)

const showNext = ()=>{
    console.log('next clicked');
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
}
document.getElementById('nextBtn')?.addEventListener('click', showNext)

const showPrev = ()=>{
    console.log('previous clicked');
    currentIndex = (currentIndex -1 + images.length) % images.length;
    openLightbox(currentIndex);
}
document.getElementById('prevBtn')?.addEventListener('click',showPrev);
const handleKeydown = (e:KeyboardEvent) =>{
    if(e.key ==='ArrowRight'){
        showNext()
    }else if(e.key === 'ArrowLeft'){
        showPrev();
    }else if(e.key === 'Escape'){
        closeLightbox()
    }
};
document.addEventListener('keydown',handleKeydown)

fetchImages()