<script lang="ts" setup>
import { useColors } from "../store/colors";
import Button from "./UI/Button.vue";
import BoxItem from "./UI/BoxItem.vue";
import { computed } from "vue";

interface IListProps {
  list: string;
}

const props = defineProps<IListProps>();

const colorsStore = useColors();

function toggleShuffleItems(name: string) {
  colorsStore.shuffleItems(name);
}

const shuffleData = computed(() => {
  const allArray: Array<string> = [];
  colorsStore.lists[props.list].data.forEach((item) => {
    console.log(item);
    for (let i = 0; i < item.count; i++) {
      allArray.push(item.color);
    }
  });
  const shuffled = allArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
});

function deleteItem(id: number, list: string) {
  colorsStore.deleteItem(id, list);
}
</script>

<template>
  <div class="list-item">
    <div style="align-self: flex-end">
      <Button @clickOnButton="toggleShuffleItems(list)" text="Перемешать" />
    </div>
    {{ list }}
    <div class="box-wrapper" v-for="box in colorsStore.lists[list].data">
      <box-item
        :key="box.id"
        :shuffle="colorsStore.lists[list].shuffle"
        :backgroundColor="box.color"
        :shuffleData="shuffleData"
        style="margin-left: 5px"
        :count="box.count"
        @delete-item="deleteItem(box.id, list)"
      />
    </div>
  </div>
</template>
