<script lang="ts" setup>
import ChevronDownIcon from "../components/icons/ChevronDownIcon.vue";
import CheckBox from "../components/UI/CheckBox.vue";

import TreeItem from "../components/TreeItem.vue";
import { useColors } from "../store/colors";

const colorsStore = useColors();

function showSubMenu(name: string) {
  colorsStore.showSubTree(name);
}
</script>

<template>
  <div class="tree-items">
    <div v-for="list in Object.keys(colorsStore.lists)" class="list-menu">
      <div class="tree-items-main">
        <div @click="showSubMenu(list)" class="tree-items-main_wrapper">
          <ChevronDownIcon
            :class="{ rotateElement: colorsStore.lists[list].showSubTree }"
          />
          <CheckBox /> {{ list }}
        </div>
        <div v-if="colorsStore.lists[list].showSubTree" class="sub-tree">
          <div
            v-for="(item, index) in colorsStore.lists[list].data"
            class="tree-items__wrapper"
          >
            <TreeItem
              v-model:color="item.color"
              v-model:count="item.count"
              :name="'item ' + (index + 1)"
            />
          </div>
        </div>
      </div>
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
.tree-items-main_wrapper {
  display: flex;
  align-items: center;
}
.list-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.rotateElement {
  transform: rotate(90deg);
}
.sub-tree {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.tree-items__wrapper {
  width: 50%;
}
</style>
