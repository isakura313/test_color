<script lang="ts" setup>
import CheckBox from "../components/UI/CheckBox.vue";
interface ITreeItem {
  name: string;
  color: string;
  count: number;
}
defineEmits(["update:color", "update:count"]);

const props = defineProps<ITreeItem>();
</script>

<template>
  <div class="tree-item">
    <div class="tree-item__name">
      <CheckBox />
      <p>{{ name }}</p>
    </div>
    <div class="tree-item__edit">
      <input
        type="text"
        :value="count"
        class="tree-item__edit_text_input"
        @input="$emit('update:count', Number($event.target.value))"
      />
      <input
        type="color"
        :value="color"
        class="tree-item__edit_color_input"
        @input="$emit('update:color', $event.target.value)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.tree-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
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
    width: 40px;
    border: none;
    outline: none;
  }
}
</style>
