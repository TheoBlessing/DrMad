<template>
  <div class="data-table">
    <!-- Table -->
    <table>
      <!-- En-tête -->
      <thead>
      <tr>
        <!-- Colonne "select." si itemCheck est activé -->
        <th v-if="itemCheck">select.</th>
        <!-- Colonnes des headers -->
        <th v-for="header in headers" :key="header.name">
          {{ header.label }}
        </th>
        <!-- Colonne "actions" si itemButton est activé -->
        <th v-if="itemButton">actions</th>
      </tr>
      </thead>

      <!-- Corps de la table -->
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <!-- Colonne des cases à cocher -->
        <td v-if="itemCheck">
          <input
              type="checkbox"
              v-model="selectedItems"
              :value="item"
          />
        </td>

        <!-- Colonnes des données -->
        <td v-for="header in headers" :key="header.name">
          {{ item[header.name] }}
        </td>

        <!-- Colonne des boutons -->
        <td v-if="itemButton">
          <button @click="handleItemClick(item)">
            <slot name="item-button">Action</slot>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Bouton après la table -->
    <div v-if="tableButton" class="table-button">
      <button @click="handleTableClick">
        <slot name="table-button">Voir sélection</slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemCheck: {
      type: Boolean,
      default: false,
    },
    itemButton: {
      type: Boolean,
      default: false,
    },
    tableButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedItems: [],
    };
  },
  methods: {
    handleItemClick(item) {
      this.$emit("itemClicked", item);
    },
    handleTableClick() {
      this.$emit("tableClicked", this.selectedItems);
    },
  },
};
</script>

<style scoped>
.data-table {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.table-button {
  text-align: right;
}
</style>
