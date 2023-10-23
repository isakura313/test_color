<script lang="ts" setup>
import { ref, computed } from "vue";
import ChevronDownIcon from "../components/icons/ChevronDownIcon.vue";
import CheckBox from "../components/UI/CheckBox.vue";

import TreeItem from "../components/TreeItem.vue";
import { useColors } from "../store/colors";

const colorsStore = useColors();

function showSubMenu(name: string) {
  colorsStore.showSubTree(name);
}
const check = ref(true);

const checkboxType = computed(() => {
  // const everyChecked = colorsStore.
  return check.value ? "Box" : "Check";
});

const updateListArray = (list: string) => {
  check.value = !check.value;
  colorsStore.toggleCheckboxes(list, check.value);
};
</script>

<template>
  <div class="tree-items">
    <div v-for="list in Object.keys(colorsStore.lists)" class="list-menu">
      <div class="tree-items-main">
        <div class="tree-items-main_wrapper">
          <ChevronDownIcon
            @click="showSubMenu(list)"
            :class="{ rotateElement: colorsStore.lists[list].showSubTree }"
          />
          <CheckBox
            v-model:model="check"
            :type="checkboxType"
            @click="updateListArray(list)"
          />
          {{ list }}
        </div>
        <Transition name="list-animation">
          <div v-if="colorsStore.lists[list].showSubTree" class="sub-tree">
            <div
              v-for="(item, index) in colorsStore.lists[list].data"
              class="tree-items__wrapper"
            >
              <TreeItem
                :id="item.id"
                :parent-name="list"
                v-model:color="item.color"
                v-model:count="item.count"
                :checked="item.checked"
                :name="'item ' + (index + 1)"
              />
            </div>
          </div>
        </Transition>
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
