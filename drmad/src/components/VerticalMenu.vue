<template>
  <div class="vertical-menu">
    <div
        v-for="(item, index) in items"
        :key="index"
        class="menu-item"
    >
      <!-- Slot pour les titres -->
      <template v-if="item.type === 'title'">
        <slot name="menu-title" :label="item.label">
          <!-- Comportement par défaut : affiche le titre -->
          <div class="menu-title">{{ item.label }}</div>
        </slot>
      </template>

      <!-- Slot pour les liens -->
      <template v-else-if="item.type === 'link'">
        <span @click="navigate(item.to)" class="menu-link">
          <slot name="menu-link" :label="item.label">
            <!-- Comportement par défaut : bouton simple -->
            <button>{{ item.label }}</button>
          </slot>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalMenu",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigate(to) {
      this.$router.push(to);
    },
  },
};
</script>

<style scoped>
.vertical-menu {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.menu-item {
  margin-bottom: 10px;
}

.menu-title {
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 5px;
}

.menu-link {
  cursor: pointer;
}

.menu-link button {
  font-size: 1em;
  padding: 5px 10px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.menu-link button:hover {
  background-color: #2980b9;
}
</style>
