import Vue from 'vue';
import VueRouter from 'vue-router';

// Importations statiques
import VirusesView from '../views/VirusesView.vue';
import ShopView from '../views/ShopView.vue';
import shopLogin from '../views/ShopLoginView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop/items',
    name: 'shopitems',
    component: VirusesView,
  },
  {
    path: '/shop/login',
    name: 'shoplogin',
    component: shopLogin,
  },


  {
    path: '/bank/account',
    name: 'bankaccount',
    component: () => import('../views/BankAccountView.vue'),
  },
  {
    path: '/shop',
    component: ShopView,
    children: [
      {
        path: 'home',
        alias: '',
        name: 'shophome',
        components: {
          shopmain: () => import('../views/ShopHome.vue'),
        },
      },

      {
        path: 'buy',
        name: 'shopbuy',
        components: {
          shopmain: () => import('../views/ShopBuy.vue'),
        },
      },
      {
        path: 'pay/:orderId',
        name: 'shoppay',
        components: {
          shopmain: () => import('../views/ShopPay.vue'),
        },
        props: {
          shopmain: true,
        },
      },
      {
        path: 'orders',
        name: 'shoporders',
        components: {
          shopmain: () => import('../views/ShopOrders.vue'),
        },
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
