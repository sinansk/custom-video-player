//DOM ELEMENTS//
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleBtn = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const sizeBtn = player.querySelector(".full__size");
const playerControls = player.querySelector(".player__controls");
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const fullSizeIcon = player.querySelector(".fa-maximize");
console.log(fullSizeIcon);

///FUNCTIONS////

function togglePlay() {
 if (video.paused) {
     video.play();
 } else {
     video.pause();
 }
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggleBtn.textContent = icon;
};

function skip() {
console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip)

};

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

function fullScreen() {
    if (!document.fullscreenElement) {
        fullSizeIcon.classList.toggle("fa-minimize");
        player.requestFullscreen();
      var x =  player.getComputedStyle(player, ':hover .player__controls').content
        console.log(x);
    } else {
      if (document.exitFullscreen) {
        
        document.exitFullscreen();
        fullSizeIcon.classList.remove("fa-minimize");
      }
    }
};

function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
};

function initializeVideo() {
    
    const videoDuration = Math.round(video.duration);
    const time = formatTime(videoDuration);
    console.log(duration.textContent)
    duration.textContent = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
};

function updateTimeElapsed() {
   
    const time = formatTime(Math.round(video.currentTime));
    console.log(timeElapsed.textContent);
    timeElapsed.textContent = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
};

///EVENT LISTENERS////

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);

toggleBtn.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

sizeBtn.addEventListener('click', fullScreen);

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlay()
    }
});
