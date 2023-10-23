import { defineStore } from "pinia";

interface IItem {
  id: number;
  count: number;
  color: string;
}

interface IColorState {
  lists: {
    [key: string]: {
      shuffle: boolean;
      showSubTree: boolean;
      data: IItem[];
    };
  };
}

export const useColors = defineStore("colors", {
  state: (): IColorState => ({
    lists: {
      "list 1": {
        shuffle: false,
        showSubTree: false,
        data: [
          {
            id: 1,
            count: 4,
            color: "#00ff00",
          },
          {
            id: 2,
            count: 2,
            color: "#00ff00",
          },
        ],
      },
      "list 2": {
        shuffle: false,
        showSubTree: false,
        data: [
          {
            id: 3,
            count: 5,
            color: "#f57c00",
          },
          {
            id: 4,
            count: 12,
            color: "green",
          },
          {
            id: 5,
            count: 3,
            color: "#00ff00",
          },
        ],
      },
    },
  }),
  getters: {
    getLists(): any {
      return this.lists;
    },
  },
  actions: {
    updateColorNumber(index: number, name: string, count: number) {
      const updateArr: any = this.lists[name].data.map((i: IItem): IItem => {
        if (i.id === index) {
          i.count = count;
          return i;
        }
        return i;
      });
      this.lists[name].data = updateArr;
    },
    deleteItem(index: number, name: string) {
      const deleteArr = this.lists[name].data.map((i: any) => {
        if (i.id === index) {
          i.count--;
          console.log(i);
          return i;
        }
        return i;
      });
      console.log(deleteArr);
      this.lists[name].data = deleteArr;
    },
    shuffleItems(name: string) {
      this.lists[name].shuffle = !this.lists[name].shuffle;
    },
    showSubTree(name: string) {
      this.lists[name].showSubTree = !this.lists[name].showSubTree;
    },
  },
});
