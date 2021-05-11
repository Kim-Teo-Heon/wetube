const record_container = document.getElementById("js-record-container");
const record_btn = document.getElementById("js-record-btn");
const video_preview = document.getElementById("js-video-preview");

let stream_object;
let video_recorder;

const handle_video_data = (event) => {
  const { data: video_file } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(video_file);
  link.download = "recorded.webm";
  document.body.append(link);
  link.click();
};

const stop_recording = () => {
  video_recorder.stop();
  record_btn.removeEventListener("click", stop_recording);
  record_btn.addEventListener("click", get_video);
  record_btn.innerHTML = "Start Recording";
};

const start_recording = () => {
  video_recorder = new MediaRecorder(stream_object);
  video_recorder.start();
  video_recorder.addEventListener("dataavailable", handle_video_data);
  record_btn.addEventListener("click", stop_recording);
};

const get_video = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    video_preview.srcObject = stream;
    video_preview.play();
    video_preview.muted = true;
    record_btn.innerHTML = "Stop Recording";
    stream_object = stream;
    start_recording();
  } catch (error) {
    console.log(error);
    record_btn.innerHTML = "Cant Record";
  } finally {
    //   finally => 에러가 발생하거나 안하거나 반드시 실행
    record_btn.removeEventListener("click", get_video);
  }
};

const init = () => {
  record_btn.addEventListener("click", get_video);
};

if (record_container) {
  init();
}
