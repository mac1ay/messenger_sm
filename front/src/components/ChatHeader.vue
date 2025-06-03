<template>
  <div class="chat-header">
    <img :src="userAvatar" alt="User Avatar" class="avatar" />
    <div class="user-info">
      <h2>{{ username }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: auto;
  margin-right: auto;
  width: 99%;
  background-color: #0e1723; 
  border-bottom: 1px solid rgba(23, 35, 51, 0.8);
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-info {
  color: white;
  font-size: 12px;
}
</style>