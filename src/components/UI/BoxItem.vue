<template>
  <template v-if="!shuffle">
    <div
      v-for="i in [...Array(count).keys()]"
      class="box-item"
      :style="{ backgroundColor: backgroundColor }"
      @click="$emit('deleteItem')"
    ></div>
  </template>
  <template v-else>
    <div
      v-for="i in shuffleData"
      class="box-item"
      :style="{ backgroundColor: i }"
      @click="$emit('deleteItem')"
    />
  </template>
</template>

<script lang="ts" setup>

interface IColor {
  backgroundColor: string;
  count: number;
  shuffleData?: Array<string>;
  shuffle: boolean;
}
defineProps<IColor>();
defineEmits(["deleteItem"]);
</script>

<style lang="scss">
.box-item {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
</style>
