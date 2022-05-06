<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goto(path) {
    router.push({ name: path });
}
</script>

<template>
<el-row>
  <el-col :span="4">
    <div id="header-font" @click="goto('home')">Lane Detection</div>
  </el-col>
</el-row>
</template>

<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
}

#header-font {
  cursor: pointer;
  padding: 16px 0px;
  font-size: 1.3rem;
  font-family: "Segoe UI";
  text-align: left;
  color: whitesmoke;
}
</style>