<template>
  <div>
    <h1>Login</h1>

    <span>login</span><input v-model="login">
    <span>password</span><input type="password" v-model="password">
    <button @click="handleLogin">Login</button>

    <!-- Affichage du message d'erreur -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Affichage de l'utilisateur connecté -->
    <p v-if="shopUser">Bienvenue, {{ shopUser.name }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ShopLoginView',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '', // Variable pour stocker les erreurs
    };
  },
  computed: {
    ...mapState(['shopUser']), // Accéder au state shopUser
  },
  methods: {
    ...mapActions(['shopLogin']), // Utiliser l'action shopLogin

    async handleLogin() {
      // Appel de l'action shopLogin de Vuex
      const response = await this.shopLogin({ login: this.login, password: this.password });

      // Si l'authentification échoue, afficher un message d'erreur
      if (response.error === 1) {
        this.errorMessage = response.data;
      } else {
        // Redirection vers /shop/buy en cas de succès
        this.$router.push('/shop/buy');
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
