const video_container = document.getElementById("js-video-player");
const video_player = document.querySelector("#js-video-player video");
const play_btn = document.getElementById("js-play-btn");
const volume_btn = document.getElementById("js-volume-btn");
const full_screen_btn = document.getElementById("js-full-screen");
const total_time = document.getElementById("total_time");
const current_time = document.getElementById("current_time");
const volume_range = document.getElementById("js-volume");

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
    volume_range.value = video_player.volume;
    volume_btn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video_player.muted = true;
    volume_range.value = 0;
    volume_btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function go_full_screen() {
  full_screen_btn.innerHTML = '<i class="fas fa-compress"></i>';
  full_screen_btn.removeEventListener("click", go_full_screen);
  full_screen_btn.addEventListener("click", exit_full_screen);
  if (video_container.requestFullscreen) {
    video_container.requestFullscreen();
  } else if (video_container.mozRequestFullscreen) {
    video_container.mozRequestFullscreen();
  } else if (video_container.webkitRequestFullscreen) {
    video_container.webkitRequestFullscreen();
  } else if (video_container.msRequestFullscreen) {
    video_container.msRequestFullscreen();
  }
}

function exit_full_screen() {
  full_screen_btn.innerHTML = `<i class="fas fa-expand"></i>`;
  full_screen_btn.removeEventListener("click", exit_full_screen);
  full_screen_btn.addEventListener("click", go_full_screen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

const format_date = (seconds) => {
  // parseInt => 문자열을 정수로 변환, 소수는 버림
  const seconds_number = parseInt(seconds, 10);
  let hours = Math.floor(seconds_number / 3600);
  let minutes = Math.floor((seconds_number - hours * 3600) / 60);
  let total_seconds = seconds_number - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (total_seconds < 10) {
    total_seconds = `0${total_seconds}`;
  }

  return `${hours}:${minutes}:${total_seconds}`;
};

function get_current_time() {
  current_time.innerHTML = format_date(video_player.currentTime);
}

function set_total_time() {
  const total_time_string = format_date(video_player.duration);
  total_time.innerHTML = total_time_string;
}

function handle_ended() {
  video_player.currentTime = 0;
  play_btn.innerHTML = '<i class="fas fa-play"></i>';
}

function handle_drag(event) {
  const {
    target: { value },
  } = event;
  video_player.volume = value;
  if (volume_range.value >= 0.6) {
    volume_btn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (volume_range.value >= 0.2) {
    volume_btn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volume_btn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  // 모바일용
  video_player.volume = 0.5;
  video_player.addEventListener("click", handle_play_click);
  video_player.addEventListener("ended", handle_ended);
  video_player.addEventListener("timeupdate", get_current_time);
  play_btn.addEventListener("click", handle_play_click);
  volume_btn.addEventListener("click", handle_volume_click);
  full_screen_btn.addEventListener("click", go_full_screen);
  video_player.addEventListener("loadedmetadata", set_total_time);
  volume_range.addEventListener("input", handle_drag);
}

if (video_container) {
  init();
}
