import BankService from '../services/bankaccount.service';

export default {
  namespaced : true,
  state: () => ({
    accountAmount: 0,
    accountTransactions: [],
    accountNumberError: 0,

    currentAccount: null, // Les informations du compte courant
    transactions: [], // Tableau des transactions liées au compte
  }),
  mutations: {
    updateAccountAmount(state, amount) {
      state.accountAmount = amount;
    },
    updateAccountTransactions(state, transactions) {
      state.accountTransactions = transactions;
    },
    updateAccountNumberError(state, status) {
      state.accountNumberError = status;
    },
    reset(state) {
      state.accountAmount = 0;
      state.accountTransactions = [];
      state.accountNumberError = 0;
    },

    setCurrentAccount(state, account) {
      state.currentAccount = account;
    },
    setTransaction(state, transactions) {
      state.transactions = transactions;
    },
    updateAccountBalance(state, newBalance) {
      if (state.currentAccount) {
        state.currentAccount.balance = newBalance;
      }
    },
  },
  actions: {
    async getAccountAmount({ commit }, number) {
      const response = await BankService.getAccountAmount(number);
      if (response.error === 0) {
        commit('updateAccountNumberError', 1);
        commit('updateAccountAmount', response.data);
      } else {
        commit('updateAccountNumberError', -1);
        console.error(response.data);
      }
    },
    async getAccountTransactions({ commit }, number) {
      const response = await BankService.getAccountTransactions(number);
      if (response.error === 0) {
        commit('updateAccountNumberError', 1);
        commit('updateAccountTransactions', response.data);
      } else {
        commit('updateAccountNumberError', -1);
        console.error(response.data);
      }
    },

    async getAccount({ commit }, accountNumber) {
      const response = await BankService.getAccount(accountNumber);
      if (response.error === 0)
        commit('setCurrentAccount', response.data);
      else
        console.error(response.data);
    },
    async getTransactions({ commit }, accountId) {
      const response = await BankService.getTransactions(accountId);
      if (response.error === 0)
        commit('setTransaction', response.data);
      else
        console.error(response.data);
    },
    async createWithdraw({ commit,state }, amount) {
      if (!state.currentAccount) {
        console.error('Aucun compte sélectionné.');
        return;
      }
      const response = await BankService.createWithdraw(amount);
      if (response.error === 0)
        commit('updateAccountBalance', response.data);
      else
        console.error(response.data);
    },
    async createPayment({ commit,state }, { destNumber, amount }) {
      if (!state.currentAccount) {
        console.error('Aucun compte sélectionné.');
        return;
      }
      const response = await BankService.createPayment(state.currentAccount._id, destNumber, amount);
      if (response.error === 0)
        commit('updateAccountBalance', response.data.withdraw.amount);
      else
        console.error(response.data);
    },
  },
}
