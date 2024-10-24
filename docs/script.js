document.addEventListener("DOMContentLoaded", () => {
  const playlists = document.querySelectorAll(".playlist_cards_left");
  const midSection = document.getElementById("mid-section");
  const backButton = document.querySelector(".fa-arrow-left");
  const playButton = document.querySelector(".fa-circle-play");
  const pauseButton = document.querySelector(".fa-circle-pause");
  const nextButton = document.querySelector(".fa-forward-fast");
  const prevButton = document.querySelector(".fa-backward-fast");
  const volumeRange = document.getElementById("volume_range");
  const fullscreenButton = document.querySelector(
    ".fa-up-right-and-down-left-from-center"
  );
  const mainBackground = document.getElementById("main_background");
  const songDetailContainer = document.getElementById("song_detail_container");
  const songRange = document.getElementById("song_range");
  const currentTimeElement = document.getElementById("current-time");
  const totalDurationElement = document.getElementById("total-duration");
  const queueContainer = document.querySelector(".queue .playlist_cards_mid");

  let currentSongIndex = 0;
  let isPlaying = false;
  let audio = new Audio();
  let songsQueue = [];

  const songs = [
    {
      title: "Humraah",
      artist: "Javed Mohsin, Dev Negi and Neha Kakkar",
      cover:
        "https://filmfare.wwmindia.com/content/2021/jun/new-bollywood-songs-humraah-91623939760.jpg",
      src: "./audio/Humraah-Song.mp3",
    },
    {
      title: "Check It Out",
      artist: "Laddi Chahal, Parmish Verma",
      cover: "https://i.scdn.co/image/ab67616d0000b273f3735ea343894170c59668ce",
      src: "./audio/Check-It-Out.mp3",
    },
    {
      title: "Car Culture",
      artist: "Laddi Chahal, Parmish Verma",
      cover: "https://i.scdn.co/image/ab67616d0000b2732f1335676c1bbf7962ca3ece",
      src: "./audio/Car-Culture.mp3",
    },
    // Add more songs here as needed
  ];

  function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.src;
    songDetailContainer.querySelector("img").src = song.cover;
    songDetailContainer.querySelector("h2").textContent = song.title;
    songDetailContainer.querySelector("h6").textContent = song.artist;

    // Update background image for main sections
    mainBackground.style.backgroundImage = `url(${song.cover})`;
    mainBackground.style.backgroundSize = "cover";
    mainBackground.style.backgroundPosition = "center";
    mainBackground.style.backgroundRepeat = "no-repeat";
  }

  function playSong() {
    audio.play();
    isPlaying = true;
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  }

  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      playSong();
    }
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      playSong();
    }
  }

  function setVolume(volume) {
    audio.volume = volume / 100;
  }

  function updateProgress() {
    const { duration, currentTime } = audio;
    songRange.max = duration;
    songRange.value = currentTime;
    currentTimeElement.textContent = formatTime(currentTime);
    totalDurationElement.textContent = formatTime(duration);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Initialize the first song and set background on page load
  loadSong(0);

  playButton.addEventListener("click", playSong);
  pauseButton.addEventListener("click", pauseSong);
  nextButton.addEventListener("click", nextSong);
  prevButton.addEventListener("click", prevSong);
  volumeRange.addEventListener("input", (e) => setVolume(e.target.value));

  audio.addEventListener("timeupdate", updateProgress);
  songRange.addEventListener("input", (e) => {
    audio.currentTime = e.target.value;
  });
});
