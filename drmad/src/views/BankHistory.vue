<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <label>
        <input type="checkbox" v-model="filterActive" /> Filtrer par période
      </label>
      <div v-if="filterActive">
        <input type="date" v-model="filterStartDate" /> Du
        <input type="date" v-model="filterEndDate" /> Au
      </div>
    </div>

    <!-- Affichage des transactions filtrées -->
    <DataTable :items="filteredTransactions" :headers="headers" itemCheck itemButton tableButton />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue'; // Assurez-vous d'importer DataTable

export default {
  name: 'BankHistory',
  components: {
    DataTable,
  },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterActive: false,
      filterStartDate: '',
      filterEndDate: '',
      filteredTransactions: [...this.transactions], // Copie initiale des transactions
      headers: [
        { label: "Montant", name: "amount" },
        { label: "Date", name: "date" },
        { label: "Type", name: "type" },
      ],
      title: "Opérations passées",
    };
  },
  watch: {
    // Surveiller les changements dans les props ou les filtres
    transactions(newTransactions) {
      this.filteredTransactions = [...newTransactions]; // Re-mise à jour des données filtrées si la prop change
    },
    filterActive: 'applyFilter',
    filterStartDate: 'applyFilter',
    filterEndDate: 'applyFilter',
  },
  methods: {
    applyFilter() {
      let transactions = [...this.transactions];

      if (this.filterStartDate) {
        transactions = transactions.filter(transaction => new Date(transaction.date) >= new Date(this.filterStartDate));
      }

      if (this.filterEndDate) {
        transactions = transactions.filter(transaction => new Date(transaction.date) <= new Date(this.filterEndDate));
      }

      this.filteredTransactions = transactions;
    },
  },
};
</script>

<style scoped>
/* Styles ici */
</style>
