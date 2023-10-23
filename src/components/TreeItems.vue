<script lang="ts" setup>
import TreeItemMain from "./TreeItemMain.vue";
import { useColors } from "../store/colors";

const colorsStore = useColors();

function showSubMenu(name: string) {
  colorsStore.showSubTree(name);
}
</script>

<template>
  <div class="tree-items">
    <div v-for="list in Object.keys(colorsStore.lists)" class="list-menu">
      <TreeItemMain :list="list" @show-sub-menu="showSubMenu" />
    </div>
  </div>
</template>

<style lang="scss">
.tree-items {
  border: 2px solid #263238;
  width: 45%;
  min-height: 80vh;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}
.tree-items-main {
  width: 100%;
}

.list-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}
.rotateElement {
  transform: rotate(90deg);
}

.tree-items__wrapper {
  width: 80%;
}
.list-animation-enter-active {
  animation: list-animation-in 0.5s;
}
.list-animation-leave-active {
  animation: list-animation-out 0.5s;
}
@keyframes list-animation-in {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes list-animation-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
