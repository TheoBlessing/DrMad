<template>
  <div class="login-wrapper">
    <h1>Login</h1>
    <div class="form-group">
      <label for="login">Username</label>
      <input
        id="login"
        v-model="login"
        :placeholder="'Enter your username'"
        class="form-input"
        type="text"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        class="form-input"
        :placeholder="'Enter your password'"
        type="password"
      />
    </div>
    <button class="login-button" @click="handleLogin(login, password)">Login</button>
    <p v-if="shopUser" class="user-info">{{ shopUser }}</p>
    <div v-if="flashMessage" class="flash-message">
      {{ flashMessage }}
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import router from '../router';

export default {
  name: 'ShopLoginView',
  data: () => ({
    login: '',
    password:'',
    flashMessage: ''
  }),
  computed: {
    ...mapState('shop', ['shopUser'])
  },
  methods: {
    ...mapActions('shop', ['shopLogin']),
    async handleLogin(login, password) {
      let response = await this.shopLogin({login, password})
      console.log('Error check :')
      if (response.error) {
        this.flashMessage = response.data
      } else {
        this.flashMessage = "Login successful"
        console.log('Login successful:', response.data)
        router.push('/shop/buy')
      }
    }
  }
}
</script>
<style scoped>
/* Wrapper */
.login-wrapper {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
}

.login-wrapper:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Title */
h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
}

/* Login Button */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.login-button:active {
  background-color: #1c5981;
  transform: translateY(0);
}

/* User Info */
.user-info {
  margin-top: 20px;
  font-size: 16px;
  color: #2c3e50;
  text-align: center;
  font-weight: 500;
}

/* Flash Message */
.flash-message {
  margin-top: 15px;
  padding: 12px;
  background-color: #fef3c7;
  color: #d97706;
  border: 1px solid #fde68a;
  border-radius: 6px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-wrapper {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  .form-input,
  .login-button {
    font-size: 14px;
  }

  .user-info,
  .flash-message {
    font-size: 14px;
  }
}
</style>

