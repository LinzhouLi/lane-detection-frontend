<script setup>
import { onMounted } from 'vue';
import imgUrl from '../assets/73.jpg';
import { LaneDetection } from './LaneDetection.js';

let img = new Image();
img.src = imgUrl;
let laneDetection;

onMounted(() => {

  let canvas = document.getElementById("canvas");
  let video = document.getElementById("video");
  laneDetection = new LaneDetection(canvas);

  let loaded = false;

  let render = () => {
    if (loaded) {
      laneDetection.clear();
      let x = (200 + video.currentTime * 80) % 800;
      let y = (100 + video.currentTime * 40) % 500;
      laneDetection.drawObject({
        color: 'green',
        rect: [x, y, 300, 200],
        text: 'car'
      })
    }
    console.log(video.currentTime, video.duration)
    requestAnimationFrame(render);
  }
  render();
  
  video.onloadedmetadata = () => { 
    loaded = true;
    laneDetection.resizeToVideo(video);
  }

  // img.onload = () => {
  //   laneDetection.drawImage(img);

  //   laneDetection.drawObject({
  //     color: 'red',
  //     rect: [599, 145, 764-599, 345-145 ],
  //     text: 'trunk'
  //   })

  //   laneDetection.drawObject({
  //     color: 'green',
  //     rect: [959, 225, 1280-959, 481-225],
  //     text: 'car'
  //   })
  // }

})

</script>

<template>
  <div id="container">
    <video id="video"  muted autoplay controls src="../assets/test.mp4" />
    <canvas id="canvas" />
  </div>
</template>

<style scoped>
#container {
  width: 100%;
  position: relative;
}
#canvas {
  width: 100%;
  height: calc(100vh - 21.5px);
  margin: auto;
  border: 1px solid black;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
}
#video {
  width: 100%;
  position: relative;
  z-index: 1;
}
</style>
