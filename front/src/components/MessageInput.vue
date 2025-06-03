<template>
  <div class="message-input">
    <input
      type="text"
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Напишите сообщение..."
    />
    <button @click="sendMessage">Send</button>
    <button @click="addEmoji">😊</button>
    <button @click="sendFiles">📁</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        this.$emit('send', this.message);
        this.message = ''; // Очистка поля ввода после отправки
      }
    },
    addEmoji() {
      // Логика для добавления эмодзи (можно открыть выбор эмодзи)
    },
    sendFiles() {
      // Логика для отправки файлов
    },
  },
};
</script>
<style scoped>
.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  background-color: #13171f;
  border-top: 1px solid rgba(23, 35, 51, 0.8);
}
input {
  flex: 1; 
  padding: 10px;
  height: 25px;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-right: 10px; 
  font-size: 17px;
  background-color: #13171f; 
  color: rgb(255, 255, 255); 
}
button {
  background-color: #262652; 
  color: white; 
  border: solid 5px;
  border-color: #13171f;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #1e2531;
}
</style>