<template>
    <div>
        <h1>Account</h1>

        <span>Account number : </span><input @input="reset()" v-model="number"> <br>
        <button @click="getAccountAmount(number)">Get amount</button>

        <button @click="getAccountTransactions(number)">Get transactions</button>

        <p v-if="accountNumberError == 1">
            <span v-if="accountAmount">{{ accountAmount }}</span>
        <ul v-if="accountTransactions">
            <li v-for="(accountTransaction, index) in accountTransactions" :key="index">{{ accountTransaction.amount }}
                on the {{ accountTransaction.date.$date }}</li>
        </ul>
        </p>
        <p v-if="accountNumberError == 0">

        </p>
        <p v-if="accountNumberError == -1">
            Invalid account number
        </p>

        <button @click="reset()">Reset</button>

    </div>

</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'BankAccountView',
    data: () => ({
        number: '',
    }),
    computed: {
        ...mapState('bank', ['accountAmount', 'accountTransactions', 'accountNumberError']),
    },
    methods: {
        ...mapMutations('bank', ['updateAccountNumberError', 'reset']),
        ...mapActions('bank', ['getAccountAmount', 'getAccountTransactions']),
    }
}
</script>

<style scoped>
/* Container */
div {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Title */
h1 {
  text-align: center;
  color: #4CAF50;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Form Input */
input {
  padding: 12px;
  width: calc(100% - 24px); /* Full width with padding */
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
  outline: none;
}

/* Buttons */
button {
  padding: 12px 18px;
  margin: 10px 5px 10px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

button:active {
  background-color: #3e8e41;
  transform: translateY(0);
}

/* Error Messages */
p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

p span {
  font-weight: bold;
  color: #333;
}

/* Invalid Account Error */
p[v-if="accountNumberError == -1"] {
  color: #e53935;
  font-weight: bold;
}

/* Transaction List */
ul {
  padding-left: 20px;
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

li {
  list-style-type: none;
  font-size: 14px;
  margin-bottom: 5px;
  line-height: 1.5;
}

li::before {
  content: "• ";
  color: #4CAF50;
  font-size: 18px;
}

/* Responsive Design */
@media (max-width: 480px) {
  div {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    padding: 10px 14px;
    font-size: 14px;
  }

  input {
    font-size: 14px;
    padding: 10px;
  }

  li {
    font-size: 13px;
  }
}
</style>
