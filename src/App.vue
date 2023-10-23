<script setup lang="ts">
import TreeItems from './components/TreeItems.vue';
import DrawList from './components/DrawList.vue';
</script>

<template>
  <div class="wrapper">
    <TreeItems/>
    <DrawList/>
</div>  
</template>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  margin: 4vh 2vh;
}
</style>
