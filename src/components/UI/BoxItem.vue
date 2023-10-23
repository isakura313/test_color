<template>
  <TransitionGroup name="fade" tag="div">
    <template v-for="item in boxesData" :key="item.id">
      <div
        class="box-item"
        v-if="!item.break"
        :style="{ backgroundColor: item.color }"
        @click="$emit('deleteItem')"
      ></div>
      <div v-if="item.break"><br /></div>
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
interface IColor {
  boxesData: Array<any>;
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
  display: inline-block;
  &:before {
    content: "\a";
    white-space: pre;
  }
  &:hover {
    cursor: pointer;
  }
}
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
