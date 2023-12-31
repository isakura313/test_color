<script lang="ts" setup>
import { computed } from "vue"
import CheckBox from "../components/UI/CheckBox.vue"
import ChevronDownIcon from "../components/icons/ChevronDownIcon.vue"
import TreeItem from "../components/TreeItem.vue"

import { useColors } from "../store/colors"

const colorsStore = useColors()

interface ITreeMainProps {
  list: string
}
const $emits = defineEmits(["showSubMenu"])
const props = defineProps<ITreeMainProps>()

const check = computed(() => {
  return colorsStore.lists[props.list].data.some((i) => i.checked === true)
    ? true
    : false
})

function updateListArray() {
  colorsStore.toggleCheckboxes(props.list, !check.value)
}
const typeOfChecked = computed(() => {
  return colorsStore.lists[props.list].data.every((i) => i.checked === true)
    ? "Check"
    : "Box"
})

const showSubMenu = () => {
  $emits("showSubMenu", props.list)
}
</script>

<template>
  <div class="tree-item-main">
    <div class="tree-item-main__wrapper">
      <ChevronDownIcon
        @click="showSubMenu"
        :class="{ rotateElement: colorsStore.lists[list].showSubTree }"
      />
      <CheckBox
        v-model:model="check"
        :type="typeOfChecked"
        @click="updateListArray"
      />
      <h4 class="tree-item-main__h4">{{ list }}</h4>
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
            :color="item.color"
            :count="item.count"
            :checked="item.checked"
            :name="'Item ' + (index + 1)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.tree-item-main {
  margin-bottom: 1em;
  width: 100%;
  &__wrapper {
    width: 80%;
  }
  &__h4 {
    margin-left: 0.5em;
    font-weight: 200;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
.rotateElement {
  transform: rotate(90deg);
}
.sub-tree {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 1em;
}
</style>
