<template>
  <div class="chat-container">
    <chat-header :username="selectedContact.username" :userAvatar="selectedContact.avatar" />
    <message-list :messages="messages" />
    <message-input @send="addMessage" />
  </div>
</template>
<script>
import ChatHeader from '../components/ChatHeader.vue';
import MessageList from '../components/MessageList.vue';
import MessageInput from '../components/MessageInput.vue';
export default {
  components: {
    ChatHeader,
    MessageList,
    MessageInput,
  },
  data() {
    return {
      selectedContact: {
        username: 'testuser', // Замените на динамическое значение
        avatar: 'path/to/avatar.png', // Замените на путь к аватару
      },
      messages: [
        { id: 1, sender: 'testuser', text: 'Привет!' },
        { id: 2, sender: 'you', text: 'Здравствуй!' },
      ],
    };
  },
  methods: {
    addMessage(text) {
      const newMessage = {
        id: this.messages.length + 1,
        sender: 'you',
        text: text,
      };
      this.messages.push(newMessage);
    },
  },
};
</script>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Для полной высоты чата */
  background-color: #202633; /* Общий фон для области чата */
}
</style>