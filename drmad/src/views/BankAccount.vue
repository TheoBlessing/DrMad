<template>
  <div class="bank-account">
    <h2>Mon Compte</h2>

    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <label for="accountNumber">Numéro de compte bancaire :</label>
        <input
            v-model="accountNumber"
            id="accountNumber"
            type="text"
            placeholder="Entrez votre numéro de compte"
            required
        />
      </div>

      <button type="submit">Valider</button>
    </form>

    <div v-if="submitted" class="confirmation">
      <p>Le numéro de compte {{ accountNumber }} a été validé avec succès.</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'BankAccount',
  data() {
    return {
      accountNumber: '',
      submitted: false,
    };
  },
  methods: {
    ...mapActions('bank',['getAccount']),
    async handleSubmit() {
      const result = await this.getAccount(this.accountNumber);

      if (result.error === 0) {
        console.log("Connexion réussie :", result.data);
      } else {
        console.error("Erreur :", result.data);
      }
    },
  },
};
</script>

<style scoped>
.bank-account {
  text-align: center;
  padding: 2rem;
}

.input-container {
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 250px;
  margin-top: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

.confirmation {
  margin-top: 2rem;
  color: green;
}
</style>
