<template>
  <div class="navbar">
    <button
        v-for="(link, index) in links"
        :key="index"
        @click="goTo(link.to)"
    >
      {{ link.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    // Prop 'links' : tableau contenant des objets avec label et to
    links: {
      type: Array,
    },
  },
  methods: {
    // Méthode pour naviguer vers la route spécifiée par 'to'
    goTo(dest) {
      this.$router.push(dest);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}
button:hover {
  background-color: #ddd;
}
</style>
