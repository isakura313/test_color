<template>
  <button class="ui-button" @click="$emit('clickOnButton')">
    {{ text }}
  </button>
  <div class="ui-button-group"></div>
</template>

<script setup lang="ts">
interface IButtonProps {
  text: string;
}
defineProps<IButtonProps>();
const props = defineEmits(["clickOnButton"]);
</script>

<style lang="scss">
.ui-button {
  cursor: pointer;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 1px;
  transition: 0.3s;
  background-color: #0d47a1;
  color: white;
  width: 140px;
}
</style>
