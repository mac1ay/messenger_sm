<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">LOGIN</button>
      <p>No account? <router-link to="/register">Register!</router-link></p>
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
    async login() {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username: this.username,
                password: this.password,
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.$router.push('/messenger'); 
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Invalid account details');
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