import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ShopService from '../services/shop.service'

export default ({
    // state = les données centralisées
    state: () => ({
        viruses: [],
        shopUser: null,
    }),
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
        updateShopUser(state, user) {
            state.shopUser = user
        }
    },
    actions: {
        async shopLogin({ commit }, { login, password }) {
            const response = await ShopService.shopLogin({ login, password });

            if (response.error === 0) {
                // Si l'authentification est réussie, enregistrer l'utilisateur dans le store
                commit('SET_USER', response.data);
            }

            return response;
        },
        async getAllViruses({commit}) {
            console.log('récupération des viruses');
            let response = await ShopService.getAllViruses()
            if (response.error === 0) {
                commit('updateViruses', response.data)
            } else {
                console.log(response.data)
            }
        }
    }
})