<template>
  <div class="auth-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPassword" placeholder="Repeat password" required />
      <button type="submit">Register</button>
      <p>Already have an account? <router-link to="/">Login!</router-link></p>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
        if (this.password !== this.confirmPassword) {
        alert('The passwords do not match.');
        return;
      }
      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          password: this.password,
        });
        alert('Регистрация успешна! Пожалуйста, войдите.');
        this.$router.push('/');
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        alert('Ошибка регистрации');
      }
    },
  },
};
</script>
<style scoped>
.auth-container {
  max-width: 350px;
  margin: auto;
  margin-top: 15%;
  padding: 25px;
  border: 2px solid rgba(23, 35, 51, 0.8);
  background-color: rgba(9, 19, 32, 0.8);
  border-radius: 10px;
  text-align: center;
}
input {
  width: 92%;
  padding: 10px;
  margin: 10px 0;
}
button {
  margin-top: 25px;
  width: 100%;
  padding: 10px;
}
</style>