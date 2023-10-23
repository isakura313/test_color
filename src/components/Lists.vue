<script lang="ts" setup>
import { useColors } from "../store/colors";
import Button from "./UI/Button.vue";
import BoxItem from "./UI/BoxItem.vue";
import { shuffle } from "lodash";
import { computed } from "vue";

interface IListProps {
  list: string;
  box: any;
}

const props = defineProps<IListProps>();

const colorsStore = useColors();

function toggleShuffleItems(name: string) {
  // imitate random
  colorsStore.shuffleItems(name);
}

const shuffleData = computed(() => {
  const allArray = [];
  colorsStore.lists[props.list].data.forEach((item) => {
    console.log(item);
    for (let i = 0; i < item.count; i++) {
      allArray.push(item.color);
    }
  });
  let shuffled = allArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffle(shuffled);
});

// function deleteItem(box.id, list){

// }
</script>

<template>
  <div class="list-item">
    {{ colorsStore.lists[list].shuffle }}
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
