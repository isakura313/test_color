<script lang="ts" setup>
import { useColors } from "../store/colors";
import Button from "./UI/Button.vue";
import BoxItem from "./UI/BoxItem.vue";
import { computed, watch } from "vue";
import { shuffle as _shuffle } from "lodash-es";
import { ref } from "vue";

interface IListProps {
  list: string;
}

const index = ref(0);
const props = defineProps<IListProps>();

const colorsStore = useColors();

function toggleShuffleItems(name: string) {
  colorsStore.shuffleItems(name);
  getItems();
}

function deleteItem(id: number, list: string) {
  alert(id);
  colorsStore.deleteItem(id, list);
}

const boxD = ref([]);
getItems();

function getItems() {
  boxD.value = [];
  let counter = 0;
  colorsStore.lists[props.list].data.forEach((item) => {
    for (let i = 0; i < item.count; i++) {
      boxD.value.push({ id: counter, color: item.color, parentId: item.id });
      counter++;
    }
    if (!colorsStore.lists[props.list].shuffle) {
      boxD.value.push({ id: counter, break: true });
    }
  });
  if (colorsStore.lists[props.list].shuffle) {
    boxD.value = boxD.value
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  } else {
    return boxD.value;
  }
}
</script>

<template>
  <div class="list-item">
    <div style="align-self: flex-end">
      <Button @clickOnButton="toggleShuffleItems(list)" text="Перемешать" />
    </div>
    <p>{{ list }}</p>
    <div class="box-wrapper">
      <box-item
        :boxesData="boxD"
        @delete-item="deleteItem"
        :shuffle="colorsStore.lists[props.list].shuffle"
      />
    </div>
  </div>
</template>
