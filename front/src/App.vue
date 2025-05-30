<template>
  <div id="app">
    <router-view></router-view> <!-- Здесь будут отображаться ваши компоненты на основе маршрутов -->
  </div>
</template>
<script>
export default {
  name: 'App',
};
</script>
<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
nav {
  margin-bottom: 25px;
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  display: inline;
  margin: 0 10px;
}
</style>