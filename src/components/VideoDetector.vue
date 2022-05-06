<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { LaneDetection } from './LaneDetection.js';

let videoDet, drawDet;
let video, videoCanvas, drawCanvas;
let objectURL = null;
let videoPlaying = false;

let drawVideo = () => {
  if (videoPlaying) {
    videoDet.drawVideo(video);
    requestAnimationFrame(drawVideo);
  }
}

let detect = () => {
  if (videoPlaying) {

    videoCanvas.toBlob(blob => {
      let formdata = new FormData();
      formdata.append("image", blob);

      axios.post('/api/image', formdata).then(res => {
        console.log(res);
        if (res.data.yolo || res.data.lane) drawDet.clear();
        drawDet.drawYoloObjects(res.data.yolo);
        drawDet.drawLanes(...res.data.lane);

        detect();
      });

    });

  }
}

onMounted(() => {

  videoCanvas = document.getElementById('video-canvas');
  videoDet = new LaneDetection(videoCanvas);

  drawCanvas = document.getElementById('draw-canvas');
  drawDet = new LaneDetection(drawCanvas);

  video = document.getElementById('video');

  video.onloadedmetadata = () => {
    video.play();
    videoPlaying = true;
    videoDet.resizeToVideo(video);
    drawDet.resizeToVideo(video);
  }
  video.onplay = () => {
    videoPlaying = true;
    drawVideo();
    detect();
  }
  video.onended = () => {
    console.log("video end");
    videoPlaying = false;
  }

})

function addVideo(file) {
  console.log(file)
  if (objectURL) URL.revokeObjectURL(objectURL);
  objectURL = URL.createObjectURL(file.raw);
  video.src = objectURL;
}

</script>

<template>
  <div class="row" style="width: 100%; height: 20%; padding-bottom: 20px;">
    <el-upload
      :on-change="addVideo"
      :show-file-list="false"
      accept="image"
      :auto-upload="false"
    >
      <el-button type="primary">上传视频</el-button>
    </el-upload>
  </div>
  <div id="container">
    <video muted id="video" />
    <canvas id="video-canvas" />
    <canvas id="draw-canvas" />
  </div>
</template>

<style scoped>
.row {
  text-align: center;
}

#container1 {
  text-align: center;
  position: relative;
}

#draw-canvas {
  left: 50%;
  width: calc(100vw - 40px);
  height: calc(100vh - 216px);
  transform:translate(-50%, 0);
  position: absolute;
  z-index: 3;
}

#video-canvas {
  left: 50%;
  width: calc(100vw - 40px);
  height: calc(100vh - 216px);
  transform:translate(-50%, 0);
  position: absolute;
  z-index: 2;
}

#video {
  position: relative;
  z-index: 1;
}
</style>