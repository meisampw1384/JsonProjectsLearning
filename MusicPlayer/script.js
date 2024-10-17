let musics = [
  {
    name: "Set Fire To the Rain",
    cover: "imgs/OIP.jpeg",
    audio: new Audio("./musics/adele-set-fire-to-the-rain-musicfeed.ir_.mp3"),
  },
  {
    name: "Lose yourself",
    cover: "imgs/download.jpeg",
    audio: new Audio("./musics/Eminem - Lose Yourself (2).mp3"),
  },
];

let range = document.querySelector("#music-time");
let playBtn = document.querySelector("#play-btn");
let nextBtn = document.querySelector("#next-btn");
let preBtn = document.querySelector("#pre-btn");
let musicCover = document.querySelector("#music-cover");
let musicName = document.querySelector("#music-name");

let currentMusic = 0;
let audio = musics[currentMusic].audio;
musicCover.src = musics[currentMusic].cover;
musicName.innerText = musics[currentMusic].name;

let isPlaying = false;
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    musicCover.style.animationPlayState = "paused";
  } else {
    audio.play();
    musicCover.style.animationPlayState = "running";
    playBtn.classList.replace("fa-play", "fa-pause");
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    range.value = (audio.currentTime / audio.duration) * 100;
  }
});

range.addEventListener("input", (event) => {
  let seekTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener("loadedmetadata", () => {
  range.max = 100;
  range.value = 0;
});

nextBtn.addEventListener("click", () => {
  changeMusic("next");
});
preBtn.addEventListener("click", () => {
  changeMusic("pre");
});

function changeMusic(state) {
  audio.pause();
  range.value = 0;
  playBtn.classList.replace("fa-pause", "fa-play");
  musicCover.style.animationPlayState = "paused";
  audio.currentTime =0;
  if (state === "next") {
    currentMusic = (currentMusic + 1) % musics.length;
  } else {
    currentMusic = (currentMusic + 1) % musics.length;
  }
  audio = musics[currentMusic].audio;
  musicCover.src = musics[currentMusic].cover;
  musicName.innerText = musics[currentMusic].name;

  if (isPlaying) {
    audio.play();
    musicCover.style.animationPlayState = "running";
    playBtn.classList.replace("fa-play", "fa-pause");
  }
}

