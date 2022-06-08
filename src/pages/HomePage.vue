<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ExampleImg from '../assets/example.jpg';
import { useRouter } from 'vue-router';

const router = useRouter();

function goto(path) {
    router.push({ name: path });
}

</script>

<template>
<el-container>
  <el-header id="header-container">
    <Header />
  </el-header>
  <el-main id="main-container">
    <h1 style="font-size: 40px;">车 道 线 检 测</h1>
    <h2 style="font-size: 20px;">同济大学软件工程 专业方向综合项目</h2>
    <p>项目成员: 狄载源 刘兴 李林洲 刘心宇</p>
    <p>模型: 目标检测 -- Yolov5s &nbsp;车道线检测 -- Bezier LanNet</p>
    <p>项目地址:
      <a style="margin: 0px 5px;" href="https://github.com/LinzhouLi/lane-detection-frontend">浏览器(前端)</a>
      <a style="margin: 0px 5px;" href="https://github.com/LinzhouLi/lane-detection-backend">浏览器(后端)</a>
      <a style="margin: 0px 5px;" href="https://github.com/LinzhouLi/land-detection-android">Android APP</a>
      <a style="margin: 0px 5px;" href="https://github.com/LinzhouLi/yolov5-windows-ncnn">Windows</a>
    </p>
    <img id="image" :src="ExampleImg" />
    <div style="margin-top: 20px;">
      <el-button size="large" @click="goto('image')">检测照片</el-button>
      <el-button size="large" @click="goto('video')">检测视频</el-button>
    </div>
  </el-main>
  <el-footer id = "footer-container">
    <Footer />
  </el-footer>
</el-container>
</template>

<style scoped>
#image {

  height: calc(100vh - 500px);
}
</style>