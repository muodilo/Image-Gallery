interface image {
    id:string;
    author:string;
    width:number;
    height:number;
    url:string;
    downlaod_url:string;
}

let images:image[] = []

const fetchImages = async()=>{
    try {
        const data = await fetch('https://picsum.photos/v2/list?page=1');
        images = await data.json();
        console.log(images);
    } catch (error) {
        console.log('failed to fetch images');
    }
}

fetchImages()