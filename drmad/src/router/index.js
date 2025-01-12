import Vue from 'vue'
import VueRouter from 'vue-router'
import VirusesView from '../views/VirusesView.vue'
import shopView from '../views/ShopView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'shopMain',
    component: shopView
  },
  {
    path: '/shop/items',
    name: 'shopItems',
    component: VirusesView
  },
  {
    path: '/shop/login',
    name: 'shopLogin',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopLogin.vue')
  },
  {
    path: '/shop/home',
    name: 'shopHome',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopHome.vue'),
    alias: '/shop'
  },
  {
    path: '/shop/buy',
    name: 'shopBuy',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopBuy.vue')
  },
  {
    path: '/shop/pay/:orderId',
    name: 'shopPay',
    props: true,
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopPay.vue')
  },
  {
    path: '/shop/orders',
    name: 'shopOrders',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopOrders.vue')
  },/*
  {
    path: '/bank/account',
    name: 'bankAccount',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/BankAccountView.vue')
  },*/
  {
  path: "/bank",
    component: ()=> import('../views/BankView.vue'),
    children: [
  {
    path: "",
    alias: "/bank",
    name: "bank-home",
    components: {
      bankmain:()=>import('../views/BankHome.vue')
    },
  },
  {
    path: "account",
    name: "bank-account",
    components: {
      bankmain:()=>import('../views/BankAccount.vue')
    },
  },
  {
    path: "amount",
    name: "bank-amount",
    components: {
      bankmain:()=>import('../views/BankAmount.vue')
    },
  },
  {
    path: "operation",
    name: "bank-operation",
    components: {
      bankmain:()=>import('../views/BankOperation.vue')
    },
  },
  {
    path: "history",
    name: "bank-history",
    components: {
      bankmain:()=>import('../views/BankHistory.vue')
    },
  },/*
  {
    path: "logout",
    name: "bank-logout",
    component: BankLogout,
  },*/
],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
