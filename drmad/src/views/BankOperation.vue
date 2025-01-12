<template>
  <div class="bank-operation">
    <!-- Titre avec slot -->
    <slot name="title">
      <h1>Débit / Virement</h1>
    </slot>

    <!-- Champ de saisie pour le montant -->
    <div class="form-group">
      <label for="amount">Montant :</label>
      <input
          type="number"
          id="amount"
          v-model="amount"
          placeholder="Entrez un montant"
      />
    </div>

    <!-- Case à cocher pour le destinataire -->
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="isRecipientChecked" />
        Destinataire
      </label>
    </div>

    <!-- Champ pour le numéro de compte destinataire -->
    <div v-if="isRecipientChecked" class="form-group">
      <label for="recipient">N° de compte destinataire :</label>
      <input
          type="text"
          id="recipient"
          v-model="recipientAccount"
          placeholder="Entrez le n° du compte destinataire"
      />
    </div>

    <!-- Bouton Valider -->
    <button @click="validateOperation" :disabled="isProcessing">
      Valider
    </button>

    <!-- Message de validation -->
    <p v-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "BankOperation",
  data() {
    return {
      amount: null,
      isRecipientChecked: false,
      recipientAccount: "",
      successMessage: "",
      isProcessing: false,
    };
  },
  methods: {
    async validateOperation() {
      // Vérifications de validité
      if (!this.amount || this.amount <= 0) {
        return alert("Veuillez entrer un montant valide.");
      }
      if (this.isRecipientChecked && !this.recipientAccount) {
        return alert("Veuillez entrer un numéro de compte destinataire.");
      }

      try {
        this.isProcessing = true;

        // Simuler une opération de service
        const uuid = uuidv4();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation de délai
        this.successMessage = `L'opération est validée avec le n° : ${uuid}. Vous pouvez la retrouver dans l'historique.`;

        // Effacer le message après 5 secondes
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);

        // Réinitialiser le formulaire
        this.resetForm();
      } catch (error) {
        alert("Une erreur s'est produite lors de l'opération.");
      } finally {
        this.isProcessing = false;
      }
    },
    resetForm() {
      this.amount = null;
      this.isRecipientChecked = false;
      this.recipientAccount = "";
    },
  },
};
</script>

<style scoped>
.bank-operation {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="number"],
input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
</style>
