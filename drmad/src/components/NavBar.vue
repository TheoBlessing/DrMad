<template>
  <div class="navbar">
    <ul class="navbar-list">
      <li v-for="(item, index) in items" :key="index" class="navbar-item">
        <button
            class="navbar-button"
            @click="$emit('menu-clicked', index)"
            :style="{ color: item.color }"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.navbar:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.navbar-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.navbar-item {
  margin: 0;
}

.navbar-button {
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  color: inherit;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s, transform 0.2s ease;
}

.navbar-button:hover {
  background-color: #e7e7e7;
  border-color: #bbb;
  transform: translateY(-2px);
}

.navbar-button:focus {
  outline: 2px solid #007bff;
  border-color: #007bff;
  background-color: #f0f8ff;
}

@media (max-width: 768px) {
  .navbar-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .navbar-button {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style>
