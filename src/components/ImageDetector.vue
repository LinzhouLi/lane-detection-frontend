<script setup>
import { onMounted } from 'vue';
import { LaneDetection } from './LaneDetection.js';

let laneDetection;
let image = new Image();
let objectURL = null;

onMounted(() => {
  let canvas = document.getElementById('canvas');
  laneDetection = new LaneDetection(canvas);
})

function beforeUpload(file) {
  if (objectURL) URL.revokeObjectURL(objectURL);
  objectURL = URL.createObjectURL(file);
  image.src = objectURL;
  return true;
}

function uploadSuccess(res) {
  console.log(res)
  if (res.yolo)
    laneDetection.drawYoloObjects(res.yolo);
  if (res.lane)
    laneDetection.drawLanes(...res.lane);
}

image.onload = () => {
  laneDetection.drawImage(image);
}

</script>

<template>
  <div class="row" style="width: 100%; height: 20%; padding-bottom: 20px;">
    <el-upload
      action="/api/image"
      name="image"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :show-file-list="false"
      accept="image"
    >
      <el-button type="primary">上传图片</el-button>
    </el-upload>
  </div>
  <div class="row" height="80%">
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>
.row {
  text-align: center;
}

#canvas {
  width: 100%;
  height: calc(100vh - 216px);
}
</style>