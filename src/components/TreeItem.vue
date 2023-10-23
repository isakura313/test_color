<script lang="ts" setup>
import CheckBox from "../components/UI/CheckBox.vue";
import { useColors } from "../store/colors";

interface ITreeItem {
  id: number;
  parentName: string;
  name: string;
  readonly color: string;
  readonly count: number;
  checked: boolean;
}

const colorsStore = useColors();
const props = defineProps<ITreeItem>();
const emits = defineEmits(["update:color", "update:count"]);

const updateColor = (e: Event) => {
  emits("update:color", (e.target as HTMLInputElement).value);
};
const updateCount = (e: Event) => {
  emits("update:count", (e.target as HTMLInputElement).value);
};

const updateChecked = () => {
  colorsStore.updateChecked(props.id, props.parentName);
};
</script>

<template>
  <div class="tree-item">
    <div class="tree-item__name">
      <CheckBox
        type="Check"
        :model="checked"
        @update:modelValue="updateChecked"
      />
      <p>{{ name }}</p>
    </div>
    <div class="tree-item__edit">
      <input
        type="text"
        :value="count"
        class="tree-item__edit_text_input"
        @input="updateCount"
      />
      <input
        type="color"
        :value="color"
        class="tree-item__edit_color_input"
        @input="updateColor"
      />
    </div>
  </div>
</template>

<style lang="scss">
.tree-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 20%;

  &__name {
    display: flex;
  }
  &__edit {
    display: flex;
    align-items: center;
  }
  &__edit_text_input {
    width: 40px;
  }
  &__edit_color_input {
    width: 20px;
    border: none;
    outline: none;
  }
}
</style>
