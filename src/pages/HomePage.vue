<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
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
    <el-button @click="goto('image')">检测照片</el-button>
    <el-button @click="goto('video')">检测视频</el-button>
  </el-main>
  <el-footer id = "footer-container">
    <Footer />
  </el-footer>
</el-container>
</template>