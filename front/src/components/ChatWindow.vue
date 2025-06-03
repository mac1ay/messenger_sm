<template>
  <div class="chat-window">
    <chat-header :username="selectedContact.username" :userAvatar="selectedContact.avatar" />
    <message-list :messages="messages" />
    <message-input @send="addMessage" />
  </div>
</template>
<script>
import ChatHeader from './ChatHeader.vue';
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

export default {
  components: {
    ChatHeader,
    MessageList,
    MessageInput,
  },
  props: {
    selectedContact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messages: [], // Список сообщений юзера
    };
  },
  methods: {
    addMessage(text) {
      const newMessage = {
        id: this.messages.length + 1,
        sender: 'you', // Время от времени будет обновляться для разных пользователей
        text: text,
      };
      this.messages.push(newMessage);
    },
  },
};
</script>
<style scoped>
.chat-window {
  background: #202633;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>