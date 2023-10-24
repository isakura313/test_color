<script lang="ts" setup>
import { useColors } from "../store/colors"
import Button from "./UI/Button.vue"
import BoxItem from "./UI/BoxItem.vue"
import { ref, onMounted, watch } from "vue"
import type { Ref } from "vue"

interface IListProps {
  list: string
}

interface IListElement {
  id: number
  color?: string
  parentId?: number
  break?: boolean
}

const props = defineProps<IListProps>()

const colorsStore = useColors()

function toggleShuffleItems(name: string) {
  colorsStore.shuffleItems(name)
  getItems()
}

function deleteItem(id: number) {
  colorsStore.deleteItem(id, props.list)
}

const boxD: Ref<IListElement[]> = ref([])

onMounted(() => {
  getItems()
})

watch(
  colorsStore.lists,
  () => {
    getItems()
  },
  { deep: true },
)

function getItems() {
  boxD.value = []
  let counter = 0
  colorsStore.lists[props.list].data.forEach((item) => {
    for (let i = 0; i < item.count; i++) {
      boxD.value.push({ id: counter, color: item.color, parentId: item.id })
      counter = counter + 1
    }
    if (!colorsStore.lists[props.list].shuffle) {
      boxD.value.push({ id: counter, break: true })
    }
  })
  if (colorsStore.lists[props.list].shuffle) {
    boxD.value = boxD.value
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  } else {
    return boxD.value
  }
}
</script>

<template>
  <div class="list-item">
    <div style="display: flex; justify-content: space-between">
      <h3 style="font-weight: 100">{{ list }}</h3>
      <div>
        <Button
          @clickOnButton="toggleShuffleItems(list)"
          :text="
            colorsStore.lists[props.list].shuffle
              ? 'Упорядочнить'
              : 'Перемешать'
          "
        />
      </div>
    </div>

    <div class="box-wrapper">
      <Box-item
        :boxesData="boxD"
        @delete-item="deleteItem"
        :shuffle="colorsStore.lists[props.list].shuffle"
      />
    </div>
  </div>
</template>

<style lang="scss">
.list-item {
  border: 2px solid #263238;
  margin-top: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.box-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
</style>
