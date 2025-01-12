<template>
  <div>
    <NavBar :items="navItems" @menu-clicked="handleShopNavigation" @action-clicked="handleAction" />
    <div>
      <h1>Boutique</h1>
      <router-view name="shopMain"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'ShopView',
  components: { NavBar },
  computed: {
    ...mapState('shop', ['shopUser']),
    navItems() {
      return [
        { text: 'Produits', color: 'purple', route: '/shop/items' },
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
    handleAction(action) {
      if (action === 'logout') {
        this.shopLogout();
      } else if (action === 'login') {
        this.$router.push('/shop/login');
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
