<template>
  <div class="bank-amount">
    <!-- Slot scoped pour afficher le solde -->
    <slot name="account-amount" :amount="amount">
      <!-- Comportement par défaut : affichage simple du solde -->
      {{ amount }}
    </slot>
  </div>
</template>

<script>
export default {
  name: "BankAmount",
  props: {
    amount: {
      type: Number,
      required: true, // Le parent doit fournir le solde
    },
  },
};
</script>

<style scoped>
.bank-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 1.5em;
  font-weight: bold;
}
</style>
