<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Поиск контактов..."
      @input="onSearch"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>
<style scoped>
input::placeholder {
    color: rgb(112, 112, 112); 
    font-size: 17px;
    font-family: 'Trebuchet MS';
}
.search-container {
  padding: 12px;
  background: #0e1723;
}
input {
  outline: none;
  width: 83%;
  padding: 15px;
  border: none;
  border-radius: 25px;
  margin-left: 50px;
  background-color: #1f2a3f;
  color: white;
  font-size: 17px;
  font-family: 'Trebuchet MS';
}
input:focus {
    box-shadow: 0px 0px 5px rgba(207, 201, 201, 0.5);
}
input:focus::placeholder {
    color: rgb(78, 78, 78);
}
</style>