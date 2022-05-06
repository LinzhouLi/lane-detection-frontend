<script setup>
import VideoDetector from '../components/VideoDetector.vue';

</script>

<template>
  <el-container>
    <el-header id="header-container">
      <Header />
    </el-header>
    <el-main id="main-container">
      <VideoDetector />
    </el-main>
    <el-footer id = "footer-container">
      <Footer />
    </el-footer>
  </el-container>
</template>

<style scoped>

</style>