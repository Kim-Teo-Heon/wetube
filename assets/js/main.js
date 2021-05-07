import "../scss/style.scss";

const video_container = document.getElementById("js-video-player");
const video_player = document.querySelector("#js-video-player video");
const play_btn = document.getElementById("js-play-btn");
const volume_btn = document.getElementById("js-volume-btn");

function handle_play_click() {
  if (video_player.paused) {
    video_player.play();
    play_btn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video_player.pause();
    play_btn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handle_volume_click() {
  if (video_player.muted) {
    video_player.muted = false;
    volume_btn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video_player.muted = true;
    volume_btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function init() {
  play_btn.addEventListener("click", handle_play_click);
  volume_btn.addEventListener("click", handle_volume_click);
}

if (video_container) {
  init();
}
