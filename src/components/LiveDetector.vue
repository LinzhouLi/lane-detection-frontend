<script setup>
import { onMounted } from 'vue';

let cam;
let videoDom

onMounted(() => {
  videoDom = document.getElementById('video');
  cam = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: videoDom.clientWidth, height: videoDom.clientHeight }
  }).then(stream => {
    videoDom.srcObject = stream;
    videoDom.onloadedmetadata = () => {
      videoDom.play();
    };
  })
})

</script>

<template>
  <video id="video" />
</template>

<style scoped>
#video {
  width: 100%;
  height: calc(100vh - 164px);
}
</style>