<template>
  <div class="chat-window">
    <div v-if="selectedContact">
      Чат с {{ selectedContact.username }}
    </div>
    <div v-else>
      It's empty here...
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedContact: {
      type: Object,
      default: null,
    },
  },
};
</script>
<style scoped>
.chat-window {
  padding: 20px;
  background: #202633;
  border: 1px solid rgba(23, 35, 51, 0.8);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>