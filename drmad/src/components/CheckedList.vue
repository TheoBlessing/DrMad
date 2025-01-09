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
  methods: {
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
    }
  }
};
</script>

<style scoped>
/* Wrapper Styles */
.list-wrapper {
  max-width: 1000px;
  padding: 20px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.list-wrapper:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f1f1f1;
  font-weight: bold;
  text-transform: uppercase;
}

.table td {
  vertical-align: top;
}

.table-item-detail {
  margin: 5px 0;
  font-size: 12px;
  color: #555;
}

/* Checkbox Styles */
.checkbox {
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

/* Input Styles */
.amount-input {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.amount-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Button Styles */
button {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.action-button {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
}

.action-button:hover {
  background-color: #333;
  color: #fff;
  transform: scale(1.05);
}

.info-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
}

.info-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .list-wrapper {
    padding: 15px;
  }

  .table {
    font-size: 12px;
  }

  button {
    padding: 6px 10px;
    font-size: 12px;
  }

  .info-button {
    font-size: 14px;
    width: 100%;
  }
}
</style>

