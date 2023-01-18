var currentPlaying = document.querySelector('.current-song')
let trackIcon = document.querySelector('.track-icon')
let trackName = document.querySelector('.track-name')
let trackArtist = document.querySelector('.track-artist')
let trackAlbum = document.querySelector('.album')
let trackNumber = document.querySelector('.track-number')

let playPause = document.querySelector('#play-pause')
let nextButton = document.querySelector('#next-btn')
let prevButton = document.querySelector('#prev-btn')

let seekSlider = document.querySelector('.seek-slider')
let volumeController = document.querySelector('.volume')
let currentTimer = document.querySelector('.current-time')
let totalDuration = document.querySelector('.total-duration')
let isPlaying = false
let trackIndex = 0
let updateTimer;

let currentTrack = document.createElement('audio');

let trackList = [
  {
    name: 'Sleep At Night',
    artist: 'Chris Brown',
    image: 'https://kazimagazine.com/wp-content/uploads/2021/12/ChrisBrown.jpg',
    path: 'audio/Chris Brown - Sleep At Night (Audio).mp3',
    album: 'breezy',
    number: 'track 13'
  },
  {
    name: 'Good Years',
    artist: 'Zayn Malik',
    image: 'http://3.bp.blogspot.com/-QHIzyBO-U8A/UCkH2Fwyl6I/AAAAAAAAAEE/ANtp0P2KkrY/s1600/Zayn+Malik+1.jpg',
    path: 'audio/ZAYN - Good Years (Audio).mp3',
    album: 'Icarus Falls',
    number: 'track 3'
  },
  {
    name: 'Mina Ngithathiwe',
    artist: 'Scebi Dlamini',
    image: 'https://www.bomoza.com/wp-content/uploads/2022/12/Inkosi-Yamagcokama.jpg',
    path: 'audio/Mina Ngithathiwe.mp3',
    album: 'Home Alone',
    number: 'track 14'
  },
  {
    name: 'It\'s too late ',
    artist: 'Reynard Silva',
    image: 'https://i.scdn.co/image/ab67616d0000b2737f5fd7fc6de052064d79dc57',
    path: "audio/Reynard Silva - It's too late.mp3",
    album: 'Love and lies',
    number: 'track 6'
  },
  {
    name: 'Falling',
    artist: 'Harry_Styles',
    image: 'https://www.cheatsheet.com/wp-content/uploads/2022/08/harry-styles-dunkirk.jpg?w=1200',
    path: 'audio/Harry Styles - Falling (Official Video).mp3',
    album: 'Fine Line',
    number: 'track 3'
  }
]

const loadTrack = (trackIndex )=> {
  clearInterval(updateTimer);
  resetValues();

  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();

  trackIcon.style.backgroundImage = "url(" + trackList[trackIndex].image + ")";
  // track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";

  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  trackAlbum.textContent = trackList[trackIndex].album;
  trackNumber.textContent = trackList[trackIndex].number;
  currentPlaying.textContent = "Playing " + (trackIndex + 1) + "Of" + trackList.length;

  updateTimer = setInterval(seekUpdate, 1000);
  currentTrack.addEventListener("ended", nextTrack)
  randomBackGroundColor();

}

const randomBackGroundColor = () => {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  document.body.style.background = backgroundColor

}

const resetValues = () => {
  currentTimer.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

// loadTrack(trackIndex);

const playPauseSound = () => {
  if(!isPlaying)
    playTrack()
  else
    pauseTrack()
  

}


const playTrack = () => {
  currentTrack.play();
  isPlaying = true
  playPause.innerHTML = "<i class='fa fa-pause-circle fa-3x'></i>"
}

const pauseTrack = () => {
  currentTrack.pause()
  isPlaying = false;
  playPause.innerHTML = "<i class='fa fa-play-circle fa-3x'></i>"
}

const nextTrack = () => {
  if(trackIndex < trackList.length - 1){
    trackIndex += 1
  }else{
    trackIndex = 0
  }
  loadTrack(trackIndex);
  playTrack()
}

const prevTrack = () => {
  if(trackIndex > 0){
    trackIndex -= 1

  }else{
    trackIndex = trackList.length -1
  }
  loadTrack(trackIndex)
  playTrack()
}

const setSeek = () => {
  let seekHandleChange = currentTrack.duration * (seekSlider.value / 100);
  currentTrack.currentTimer = seekHandleChange

}



const setVolume = () => {
  currentTrack.volume = volumeController.value / 100
}

const seekUpdate = () => {

  let seekPosition = 0;

  if(!isNaN(currentTrack.duration)){
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration)
    seekSlider.value = seekPosition
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    currentTimer.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(trackIndex)