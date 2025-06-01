<template>
  <div class="list-container">
    <div v-if="contacts.length === 0">No contacts</div>
    <div
      v-for="contact in contacts"
      :key="contact.id"
      class="contact-item"
      @click="selectContact(contact)"
    >
      {{ contact.username }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectContact(contact) {
      this.$emit('select', contact);
    },
  },
};
</script>
<style scoped>
.list-container {
  padding: 5px;
  background: #0e1723;
  height: 100%;
  overflow-y: auto;
}
.contact-item {
  padding: 30px;
  color: white;
  cursor: pointer;
}
.contact-item:hover {
  background: #353a40;
}
</style>