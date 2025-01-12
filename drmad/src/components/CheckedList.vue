<template>
  <div class="list-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-if="itemCheck">
            <input
              type="checkbox"
              @change="$emit('checked-all-changed')"
              class="checkbox"
            />
          </th>
          <th v-for="(field, field_id) in fields" :key="field_id">
            <span v-if="Array.isArray(field)">{{ field[0] }}</span>
            <span v-else>{{ field }}</span>
          </th>
          <th v-if="itemAmount">Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, item_id) in data" :key="item_id">
          <td v-if="itemCheck">
            <input
              type="checkbox"
              :checked="checked[item_id]"
              @change="$emit('checked-change', item_id)"
              class="checkbox"
            />
          </td>
          <td v-for="(field, field_id) in fields" :key="field_id">
            <span v-if="!Array.isArray(field)">{{ item[field] }}</span>
            <span v-else>
              <div v-for="(item_elt, item_elt_id) in item[field[0]]" :key="item_elt_id" class="table-item-detail">
                <span v-for="(field_elt, field_elt_id) in field[1]" :key="field_elt_id">
                  {{ field_elt }}: {{ item_elt[field_elt] }}
                </span>
              </div>
            </span>
          </td>
          <td v-if="itemAmount">
            <input
                type="number"
                v-model.number="amounts[item_id]"
                class="amount-input"
            />
          </td>
          <td>
            <button
              v-if="itemButton[item_id].show"
              @click="itemButtonClicked(item_id)"
              :style="'color:' + itemButton[item_id].color + ';'"
              class="action-button"
            >
              {{ itemButton[item_id].text }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      v-if="listButton.show"
      @click="listButtonClicked()"
      :style="'color:' + listButton.color + ';'"
      class="info-button"
    >
      {{ listButton.text }}
    </button>

  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: Array,
    itemButton: Array,
    listButton: Object,
    itemAmount: Boolean
  },
  data: () => {
    return {
      amounts: {},
    };
  },
  watch: {
    data: {
      immediate: true, // Appeler dès que `data` est initialisée
      handler(newData) {
        this.initializeAmounts(newData); // Initialiser les valeurs par défaut
      }
    }
  },
  methods: {
    initializeAmounts(data) {
      // Définir une valeur par défaut de 1 pour chaque élément dans `amounts`
      data.forEach((item, index) => {
        if (!Object.prototype.hasOwnProperty.call(this.amounts, index)) {
          this.$set(this.amounts, index, 1);
        }
      });
    },
    itemButtonClicked(item_id) {
      if (this.itemAmount) {
        const amount = this.amounts[item_id] || 0;
        this.$emit('item-button-clicked', { id: item_id, amount });
      } else {
        this.$emit('item-button-clicked', item_id);
      }
    },
    listButtonClicked() {
      if (this.itemAmount) {
        const values = this.data.map((_, i) => ({ id: i, amount: this.amounts[i] || 0 }));
        this.$emit('list-button-clicked', values);
      } else {
        this.$emit('list-button-clicked');
      }
    },

  },
  mounted() {
    this.initializeAmounts(this.data); // Initialiser `amounts` lorsque le composant est monté
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.list-wrapper {
  padding: 20px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.input {
  width: calc(100% - 10px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

.button {
  display: inline-block;
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
}
</style>
