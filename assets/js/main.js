import "../scss/style.scss";

const video_container = document.getElementById("js-video-player");
const video_player = document.querySelector("#js-video-player video");
const play_btn = document.getElementById("js-play-btn");

function play_video() {
  if (video_player.paused) {
    video_player.play();
  } else {
    video_player.pause();
  }
}

function init() {
  play_btn.addEventListener("click", play_video);
}

if (video_container) {
  init();
}
