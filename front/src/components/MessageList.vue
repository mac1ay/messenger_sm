<template>
  <div class="message-list">
    <div v-for="msg in messages" :key="msg.id" class="message">
      <strong>{{ msg.sender }}:</strong> {{ msg.text }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.message-list {
  padding: 10px;
  overflow-y: auto; /* Прокрутка если сообщений много */
  height: 80%; /* Задайте нужную высоту */
}
.message {
  margin-right: 100%;
  margin-bottom: 10px; /* Отступ между сообщениями */
  color: white; /* Цвет текста сообщений */
}
</style>