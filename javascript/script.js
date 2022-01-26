console.log("Welcome to Spotify");

//Variable Initialization
let songIndex = 0;
let audioElement=new Audio('../songs/1.mp3');
// audioElement.play();

let playerButton=document.getElementById('masterPlay');
let myProgressBar= document.getElementById('progressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('song'));
let particularSongName=document.getElementById('particular-song-name');
let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));
let songPoster=document.getElementById('song-poster');


let songs=[
    {songName:"I M An Albatraoz" , filePath:"../songs/1.mp3" , coverPath:"../covers/1.jpg"},
    {songName:"Desi Desi na bolya kar chori re" , filePath:"../songs/2.mp3" , coverPath:"../covers/2.jpg"},
    {songName:"Dulhe Ka Sehra - The Legend" , filePath:"../songs/3.mp3" , coverPath:"../covers/3.jpg"},
    {songName:"Eye Candy - Shivjot" , filePath:"../songs/4.mp3" , coverPath:"../covers/4.jpg"},
    {songName:"Golden Rang - Guri" , filePath:"../songs/5.mp3" , coverPath:"../covers/5.jpg"},
    {songName:"Gwandi Munda - Maahi " , filePath:"../songs/6.mp3" , coverPath:"../covers/6.jpg"},
    {songName:"Haan Na Kare - A Kay " , filePath:"../songs/7.mp3" , coverPath:"../covers/7.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText=songs[i].songName;
});


playerButton.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
         audioElement.play();
         gif.style.opacity=1;
         playerButton.classList.remove('fa-play-circle-o');
         playerButton.classList.add('fa-pause-circle-o');
    }
    else{
        audioElement.pause();
        gif.style.opacity=0;
        playerButton.classList.remove('fa-pause-circle-o');
        playerButton.classList.add('fa-play-circle-o');
    }
});

// Listen Events
audioElement.addEventListener('timeupdate',()=>{
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration)/100;
});

const makeAllPlays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle-o');
        element.classList.add('fa-play-circle-o');
    });
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle-o');
        e.target.classList.add('fa-pause-circle-o');
        audioElement.src=`../songs/${songIndex+1}.mp3`;
        particularSongName.innerText=songs[songIndex].songName;
        songPoster.src=songs[songIndex].coverPath;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        playerButton.classList.remove('fa-play-circle-o');
        playerButton.classList.add('fa-pause-circle-o');
        }
        else{
            audioElement.pause();
        gif.style.opacity=0;
        e.target.classList.remove('fa-pause-circle-o');
        e.target.classList.add('fa-play-circle-o');
        playerButton.classList.remove('fa-pause-circle-o');
        playerButton.classList.add('fa-play-circle-o');
        }
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`../songs/${songIndex+1}.mp3`;
    particularSongName.innerText=songs[songIndex].songName;
    songPoster.src=songs[songIndex].coverPath;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    playerButton.classList.remove('fa-play-circle-o');
    playerButton.classList.add('fa-pause-circle-o');

});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`../songs/${songIndex+1}.mp3`;
    particularSongName.innerText=songs[songIndex].songName;
    songPoster.src=songs[songIndex].coverPath;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    playerButton.classList.remove('fa-play-circle-o');
    playerButton.classList.add('fa-pause-circle-o');
});