<template>
  <div class="draw-list">
    <div v-for="list in Object.keys(colorsStore.lists)">
      <Lists :list="list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Lists from "./Lists.vue";

import { useColors } from "../store/colors";
const colorsStore = useColors();
</script>

<style lang="scss">
.draw-list {
  width: 45%;
  min-height: 80vh;
  border: 2px solid #263238;
  min-height: 80vh;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}

.list-item {
  border: 2px solid #263238;
  margin-top: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.box-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
</style>
