import { defineStore } from "pinia";

interface IItem {
  id: number;
  count: number;
  color: string;
  checked: boolean;
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
      "List 1": {
        shuffle: false,
        showSubTree: false,
        data: [
          {
            id: 1,
            count: 4,
            color: "#00BCD4",
            checked: true,
          },
          {
            id: 2,
            count: 2,
            color: "#6A1B9A",
            checked: true,
          },
        ],
      },
      "List 2": {
        shuffle: false,
        showSubTree: false,
        data: [
          {
            id: 3,
            count: 5,
            color: "#f57c00",
            checked: false,
          },
          {
            id: 4,
            count: 12,
            color: "#D81B60",
            checked: false,
          },
          {
            id: 5,
            count: 3,
            color: "#536DFE",
            checked: false,
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
    updateChecked(id: number, name: string) {
      this.lists[name].data = this.lists[name].data.map((i: IItem): IItem => {
        if (i.id === id) {
          i.checked = !i.checked;
          return i;
        }
        return i;
      });
    },
    updateColor(name: string, id: number, color: string) {
      const updatedArr = this.lists[name].data.map((i: any) => {
        if (i.id === id) {
          i.color = color;
          return i;
        }
        return i;
      });
      this.lists[name].data = updatedArr;
    },
    updateCount(name: string, id: number, count: string) {
      const updatedArr = this.lists[name].data.map((i: any) => {
        if (i.id === id) {
          i.count = count;
          return i;
        }
        return i;
      });
      this.lists[name].data = updatedArr;
    },
    deleteItem(index: number, name: string) {
      const deleteArr = this.lists[name].data.map((i: any) => {
        if (i.id === index) {
          i.count = i.count - 1;
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
    toggleCheckboxes(name: string, flag: boolean) {
      console.log(name, flag);
      this.lists[name].data = this.lists[name].data.map((i: IItem): IItem => {
        i.checked = flag;
        return i;
      });
    },
  },
});
