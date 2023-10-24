<script setup lang="ts">
import { defineEmits } from "vue"
import CheckIcon from "../icons/CheckIcon.vue"

interface ICheckBoxProps {
  model: boolean
  type: "Check" | "Box"
}
defineProps<ICheckBoxProps>()

const emits = defineEmits(["update:modelValue"])

function toggleCheck(e: Event) {
  emits("update:modelValue", (e.target as HTMLInputElement).value)
}
</script>

<template>
  <template v-if="type === 'Check'">
    <div class="check-box" @click="toggleCheck">
      <CheckIcon v-if="model" />
    </div>
  </template>
  <template v-else>
    <div class="check-box">
      <div class="black_box" v-if="model"></div>
    </div>
  </template>
</template>

<style lang="scss">
.check-box {
  border: 1px solid #263238;
  border-radius: 1px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.black_box {
  background-color: black;
  width: 8px;
  height: 8px;
}
</style>
