<template>
  <div class="bank-view">
    <!-- Barre de navigation -->
    <NavBar :links="links"/>

    <div class="main-layout">
      <!-- Menu vertical -->
      <VerticalMenu :items="items">
        <template v-slot:menu-title="slotProps">
          <span style="font-weight: bold; text-decoration: underline;">
            {{ slotProps.label }}
          </span>
        </template>
      </VerticalMenu>


      <!-- Zone centrale -->
      <div class="content">
        <router-view name="bankmain"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/VerticalMenu.vue";

export default {
  name: "BankView",
  components: {
    NavBar,
    VerticalMenu,
  },
  data() {
    return {
      links: [
        { label: "Mon compte", to: "/bank/account" },
      ],
      items: [
        { type: "title", label: "Opérations" },
        { type: "link", label: "Solde", to: "/bank/amount" },
        { type: "link", label: "Débit/Virement", to: "/bank/operation" },
        { type: "title", label: "États" },
        { type: "link", label: "Historique", to: "/bank/history" },
      ],
    };
  },
};
</script>

<style scoped>
.amount-input {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  border: none;
  background: none;
  outline: none;
}

.amount-input.negative {
  color: red;
}

.amount-input.positive {
  color: green;
}
</style>
