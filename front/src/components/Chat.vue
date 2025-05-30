<template>
  <div class="chat-container">
    <h1>Чат</h1>
    <div class="messages" v-for="message in messages" :key="message.id">
      <p>{{ message.text }}</p>
    </div>
    <input v-model="newMessage" placeholder="Введите сообщение..." @keyup.enter="sendMessage" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      // Здесь вы можете добавлять логику отправки сообщения
      if (this.newMessage.trim()) {
        this.messages.push({ id: Date.now(), text: this.newMessage });
        this.newMessage = '';
      }
    },
  },
};
</script>
<style scoped>
.chat-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.messages {
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 10px;
}
</style>