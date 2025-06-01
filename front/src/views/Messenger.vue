<template>
    <div class="messenger-container">
        <div class="sidebar">
            <Search @search="handleSearch" />
            <ContactList :contacts="filteredContacts" @select="selectContact" />
        </div>
        <div class="main-content">
            <ChatWindow :selectedContact="selectedContact" />
        </div>
    </div>
</template>
<script>
import Search from '../components/SearchByLogin.vue';
import ContactList from '../components/ContactList.vue';
import ChatWindow from '../components/ChatWindow.vue';
export default {
  components: {
    Search,
    ContactList,
    ChatWindow,
  },
  data() {
    return {
      contacts: [
        { id: 1, username: 'smadmin' },
        { id: 2, username: 'testuser' },
        // Добавьте дополнительные контакты по мере необходимости
      ],
      selectedContact: null,
      searchQuery: '',
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact =>
        contact.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query; // Обновляем состояние поиска
    },
    selectContact(contact) {
      this.selectedContact = contact; // Устанавливаем выбранный контакт
    },
  },
};
</script>
<style scoped>
.messenger-container {
  display: flex;
  height: 100vh;
  background: #23272a;
}
.sidebar {
  height: 100%;
  width: 500px;
  border-right: 1px solid rgba(23, 35, 51, 0.8);;
}
.main-content {
  flex: 1;
}
</style>