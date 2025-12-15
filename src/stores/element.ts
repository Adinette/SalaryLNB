import { defineStore } from "pinia";

export const useElementStore = defineStore("element", {
  state: () => ({
    elements: [] as any[],
  }),

  getters: {
    getElements: (state) => state.elements,
  },

  actions: {
    setElements(elements: any[]) {
      this.elements = elements;
    },
    addElement(element: any) {
      this.elements.push(element);
    },
  },

  persist: {
    key: "element-store",
    storage: localStorage,
  },
});
