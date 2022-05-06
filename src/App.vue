<script setup>

</script>

<template>
  <router-view />
</template>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main-container {
  min-height: calc(100vh - 120px);
}

#header-container {
  background-color: #343a40;
}

#footer-container {
  border-top: 1px solid #ebeced;
}
</style>
