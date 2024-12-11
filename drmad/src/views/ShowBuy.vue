<template>
  <div class="shop-buy-container">
    <div class="items-list-container">
      <ItemsList />
    </div>

    <div class="basket-list-container">
      <BasketList />
    </div>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList";
import BasketList from "@/components/BasketList";


</script>
<style scoped>
.shop-buy-container {
  display: flex;
  justify-content: space-between;
}

.items-list-container {
  flex: 0 1 48%;
}

.basket-list-container {
  flex: 0 1 48%;
}

</style>