<template>
  <div class="buy-wrapper">
    <NavBar :items="navItems" @menu-clicked="handleShopNavigation" @action-clicked="handleAction" />
    <h1>Buy</h1>
    <ItemsList />
    <BacketList />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BacketList from '../components/BacketList.vue';
import ItemsList from '../components/ItemsList.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'BuyView',
  components: {
    BacketList,
    ItemsList,
    NavBar,
  },
  computed: {
    ...mapState('shop', ['shopUser']),
    navItems() {
      return [
        { text: 'Produits', color: 'black', route: '/shop/items' },
        {
          text:'Buy', color: 'black',route: '/shop/buy'
        },
        {
          text:'Orders', color: 'black',route: '/shop/orders'
        },
        {
          text: this.shopUser ? 'Logout' : 'Login',
          color: this.shopUser ? 'red' : 'green',
          action: this.shopUser ? 'logout' : 'login',
        },
      ];
    },
  },
  methods: {
    ...mapActions('shop', ['shopLogout']),
    handleShopNavigation(index) {
      const route = this.navItems[index]?.route;
      if (route) {
        this.$router.push(route).catch(() => {});
      }
    },
    async handleAction(action) {
      if (action === 'logout') {
        await this.shopLogout(); // Déconnecter l'utilisateur
        this.$router.push('/shop'); // Rediriger vers /shop
      } else if (action === 'login') {
        this.$router.push('/shop/login'); // Rediriger vers la page de login
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.buy-wrapper {
  padding: 20px;
  margin: 20px auto;
  background-color: #fff;


  width: 100%;

}

.buy-wrapper h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}
</style>


