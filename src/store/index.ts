import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export type Event = {};

export type AppState = {
  user: {
    id: string;
    name: string;
  };
  categories: string[];
  events: {
    id: number;
    title: string;
    organizer: string;
  }[];
};

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [
      { id: 1, title: "...", organizer: "..." },
      { id: 2, title: "...", organizer: "..." },
      { id: 3, title: "...", organizer: "..." },
      { id: 4, title: "...", organizer: "..." }
    ]
  } as AppState,
  mutations: {},
  actions: {},
  getters: {
    catLength: (state: AppState): number => state.categories.length,
    getEventById: (state: AppState) => (id: number) =>
      state.events.find(event => event.id === id)
  },
  modules: {}
});
