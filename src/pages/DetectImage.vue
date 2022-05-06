<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ImageDetector from '../components/ImageDetector.vue';

</script>

<template>
<el-container>
  <el-header id="header-container">
    <Header />
  </el-header>
  <el-main id="main-container">
    <ImageDetector />
  </el-main>
  <el-footer id = "footer-container">
    <Footer />
  </el-footer>
</el-container>
</template>

<style scoped>

</style>