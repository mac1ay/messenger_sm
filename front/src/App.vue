<template>
  <div :class = "backgroundClass">
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import Messenger from './views/Messenger.vue';

export default {
  name: 'App',
  components: {
    Messenger,
  },
  computed: {
    backgroundClass() {
      // Проверяем текущий маршрут
      const path = this.$route.path;
      return path === '/messenger' ? 'page-background' : '';
    },
  },
  watch: {
    backgroundClass: {
      immediate: true,
      handler(newClass) {
        document.body.classList.remove('page-background');
        if (newClass) {
          document.body.classList.add(newClass);
        }
      },
    },
  },
};
</script>
<style>
#app {
  margin-top: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #bbbbbb;
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