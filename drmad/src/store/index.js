import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Importation des modules
import shopModule from './shop';
import bankModule from './bank';

export default new Vuex.Store({
  modules: {
    shop: shopModule,
    bank: bankModule
  }
});